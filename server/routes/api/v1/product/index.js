const path = require('path');
const fs = require('fs');
const uuid4 = require('uuid4');
const Product = require('../../../../models/Products');
const Category = require('../../../../models/Categories'); // модель категорий

module.exports = async function (fastify) {

  function saveBase64Image(base64, uploadDir) {
    if (!base64) return null;
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, `${uuid4()}.jpg`);
    const data = base64.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
    return filePath;
  }

  fastify.get('/', async (req, rep) => {
  try {
    const { category, categoryId, q = '', page = 1, limit = 20 } = req.query;

    const filter = {};
    // категории (как было)
    if (categoryId) {
      filter.categories = categoryId;
    } else if (category) {
      const cat = await Category.findOne({ slug: category }, { _id: 1 });
      if (!cat) return rep.send({ items: [], total: 0, page: 1, pages: 0 });
      filter.categories = cat._id;
    }

    // поиск по названию (поле named)
    if (q) {
      const escapeRegExp = (s = '') => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.named = { $regex: escapeRegExp(q), $options: 'i' };
    }

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(100, Math.max(1, Number(limit) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      Product.find(filter)
        .populate('categories', 'name slug')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Product.countDocuments(filter),
    ]);

    rep.send({ items, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (error) {
    rep.code(500).send({ message: 'Ошибка при получении продуктов', error });
  }
});


  // fastify.get('/', async (req, rep) => {
  //   try {
  //     const { category, categoryId } = req.query;
  //     const filter = {};

  //     if (categoryId) {
  //       filter.categories = categoryId;
  //     } else if (category) {
  //       const cat = await Category.findOne({ slug: category }, { _id: 1 });
  //       if (!cat) return rep.send([]);
  //       filter.categories = cat._id;
  //     }

  //     const products = await Product.find(filter)
  //       .populate('categories', 'name slug');

  //     rep.send(products);
  //   } catch (error) {
  //     rep.code(500).send({ message: "Ошибка при получении продуктов", error });
  //   }
  // });

  fastify.get('/:id', async (req, rep) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id)
        .populate('categories', 'name slug');

      if (!product) {
        return rep.code(404).send({ message: "Продукт не найден" });
      }

      rep.send(product);
    } catch (error) {
      rep.code(500).send({ message: "Ошибка при получении продукта", error });
    }
  });

  fastify.post('/', async (req, rep) => {
    try {
      const {
        named,
        description,
        image = null,
        price,
        sale = 0,
        profit,
        previewImages = [],
        status = true,
        numberOfCopies = 100,
        categories = [],
      } = req.body || {};

      if (!named || !description || price == null || profit == null) {
        return rep.code(400).send({ message: "named, description, price, profit — обязательны" });
      }

      const uploadDir = './uploads';
      const imagePath = saveBase64Image(image, uploadDir);

      const previewPaths = Array.isArray(previewImages)
        ? previewImages.map((b64) => saveBase64Image(b64, uploadDir)).filter(Boolean)
        : [];

      const product = await Product.create({
        named,
        description,
        image: imagePath,
        price,
        sale,
        profit,
        previewImages: previewPaths,
        status,
        numberOfCopies,
        categories,
      });

      rep.code(201).send({ message: "Продукт создан", product });
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      rep.code(500).send({ message: "Ошибка сервера", error: error.message });
    }
  });
};
