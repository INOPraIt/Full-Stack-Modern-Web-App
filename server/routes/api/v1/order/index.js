const Orders = require('../../../../models/Orders');
const Products = require('../../../../models/Products');
const fastifyPassport = require('@fastify/passport');
const mongoose = require('mongoose');

module.exports = async function (fastify) {
  fastify.get("/", async (request, reply) => {
    if (!request.user) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    const userId = request.user._id;
    console.log('UserIdInOrders', userId)
    const orders = await Orders.find({ user: userId });
    reply.send(orders);
  });

  fastify.put("/:orderId/add-product", async (request, reply) => {
    if (!request.user) {
      return reply.code(401).send({ message: "Unauthorized" });
    }
  
    const { orderId } = request.params;
    const { productId } = request.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return reply.code(400).send({ message: "Некорректный ID заказа" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return reply.code(400).send({ message: "Некорректный ID продукта" });
    }
  
    const order = await Orders.findOne({ _id: new mongoose.Types.ObjectId(orderId) });
    console.log("Найденный заказ:", order);

    if (!order) {
      return reply.code(404).send({ message: "Заказ не найден" });
    }
  
    const product = await Products.findById(productId);
    if (!product) {
      return reply.code(404).send({ message: "Продукт не найден" });
    }
  
    order.products.push(productId);
    await order.save();
  
    reply.send({ message: "Продукт добавлен в заказ", order });
  });

  fastify.post("/", async (request, reply) => {
    if (!request.user) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    const { name, description, products } = request.body; // Теперь принимаем products
    const userId = request.user._id;

    // Проверяем, передан ли массив продуктов
    if (!Array.isArray(products)) {
      return reply.code(400).send({ message: "products должен быть массивом" });
    }

    // Проверяем, что все переданные продукты существуют
    const existingProducts = await Products.find({ _id: { $in: products } });
    if (existingProducts.length !== products.length) {
      return reply.code(400).send({ message: "Некоторые продукты не найдены" });
    }

    // Создаём заказ с продуктами
    const order = new Orders({ name, description, user: userId, products });
    await order.save();

    reply.send(order);
  });
}

