const Category = require('../../../../models/Categories');

module.exports = async function(fastify) {
  //Create category
  fastify.post('/', async (req, reply) => {
    const {name, slug, description, image, parent, isActive, order} = req.body;
    const item = await Category.create({ name, slug, description, image, parent, isActive, order });
    reply.code(201).send(item);
  });

  //Get category
  fastify.get('/', async (req, reply) => {
    const items = await Category.find({}).sort({ order: 1, name: 1});
    reply.send(items);
  })

  // Get category id or slug
  fastify.get('/:idOrSlug', async (req, reply) => {
    const { idOrSlug } = req.params;
    const byId = idOrSlug.match(/^[0-9a-fA-F]{24}$/);
    const item = byId
    ? await Category.findById(idOrSlug)
    : await Category.findOne({slug: idOrSlug});
    if (!item) return reply.code(401).send({message: 'Category not found'});
    reply.send(item);
  })

  //Upadate category
  fastify.patch('/:id', async (req, reply) => {
    const item = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!item) return reply.code(404).send({ message: 'Category not found'});
    reply.send(item);
  });

  //Delete category
  fastify.delete('/:id', async(req, reply) => {
    const item = await Category.findByIdAndUpdate(req.params.id, {isAcctive: false}, {new: true});
    if(!item) return reply.code(404).send({message: 'Category not found'})
  })
}