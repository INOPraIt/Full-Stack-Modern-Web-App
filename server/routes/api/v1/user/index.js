const fastifyPassport = require("@fastify/passport");
const User = require("../../../../models/Users");

module.exports = async function (fastify) {
  console.log("Auth routes loaded");

  fastify.post("/register", async (request, reply) => {
    const { username, password } = request.body;
    if (!username || !password) return reply.code(400).send({ error: "Missing fields" });

    try {
      const userExists = await User.findOne({ username });
      if (userExists) return reply.code(400).send({ error: "User already exists" });

      const newUser = new User({ username, password });
      await newUser.save();

      reply.send({ success: 'Пользователь зарегистрирован' });
    } catch (err) {
      reply.code(500).send({ error: "Server error" });
    }
  });

  fastify.post(
    "/login",
    { preValidation: fastifyPassport.authenticate("local", { session: true }) },
    async (request, reply) => {
      console.log('RequestUser:', request.user);
      request.log.info("User authenticated:", request.user);
      reply.send({ message: "Login successful", user: request.user });
    }
  );

  fastify.get("/logout", async (request, reply) => {
    request.logout();
    reply.send({ message: "Logged out" });
  });

  fastify.get("/profile", async (request, reply) => {
    if (!request.user) {
      return reply.code(401).send({ message: "Not authenticated" });
    }
    return reply.send({ user: request.user });
  });
};