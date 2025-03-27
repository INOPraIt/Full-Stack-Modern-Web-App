const path = require('path');
const fs = require('fs');
const Product = require('../../../../models/Products');
const uuid4 = require('uuid4');

module.exports = async function (fastify) {

  fastify.get('/', async (req, rep) => {
    try {
      const filter = {}; // Если фильтр не нужен, оставить пустым
      const products = await Product.find(filter);
      rep.send(products);
    } catch (error) {
      rep.code(500).send({ message: "Ошибка при получении продуктов", error });
    }
  });

  fastify.get('/:id', async (req, rep) => {
    try {
      const { id } = req.params; // Получаем id из параметров маршрута
      const product = await Product.findById(id); // Ищем продукт по id

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
      console.log(req.body);
      const named = req.body.named || null;
      const description = req.body.description || null;
      const image = req.body.image || null;
      const price = req.body.price || null;
      const sale = req.body.sale || null;
      const profit = req.body.profit || null;
      const previewImages = req.body.previewImages || [];
      const status = req.body.status || null;
      const numberOfCopies = req.body.numberOfCopies || null;
      
      if (!named) {
        return rep.code(400).send({ message: "Имя и цвет продукта обязательны" });
      }
      let imagePath = null;
      if (image) {
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        imagePath = `${uploadDir}/${uuid4()}.jpg`;
        fs.writeFileSync(imagePath, image);
      }

      let previewImagePath = null;

      if (previewImages) {
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        previewImagePath = `${uploadDir}/${uuid4()}.jpg`;
        fs.writeFileSync(previewImagePath, previewImages);
      }

      const product = new Product({ 
        named,
        description,
        image: imagePath,
        price,
        sale,
        profit,
        previewImages: previewImagePath,
        status,
        numberOfCopies
      });
      await product.save();
      rep.send({ message: "Продукт создан", product });
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      rep.code(500).send({ message: "Ошибка сервера", error: error.message });
    }
  })
}

