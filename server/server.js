const fastify = require("fastify");
const multipart = require("@fastify/multipart");
const path = require("path");
const dotenv = require("dotenv");
const autoload = require("@fastify/autoload");
const fastifySecureSession = require("@fastify/secure-session");
const fastifyPassport = require("@fastify/passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("./models/Users");
const fastifyCors = require("@fastify/cors");
const fastifyStatic = require("@fastify/static");

dotenv.config();

(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/nexttest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const fastifyApp = fastify({ trustProxy: true });

  await fastifyApp.register(fastifyCors, {
    origin: "http://localhost:3000",
    credentials: true,
  });
  // await fastifyApp.register(fastifyCors, {
  //   origin: true,
  //   credentials: true,
  // });

  await fastifyApp.register(fastifySecureSession, {
    secret:
      process.env.SESSION_SECRET ||
      "a_very_long_secret_key_that_is_at_least_32_bytes",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 12 * 30 * 24 * 60 * 60,
      // domain: '127.0.0.1'
    },
  });

  await fastifyApp.register(fastifyPassport.secureSession());
  await fastifyApp.register(fastifyPassport.initialize());

  await fastifyApp.register(multipart, {
    attachFieldsToBody: "keyValues",
    limits: {
      fileSize: 10 * 1024 * 1024, // Ограничение на размер файла, например 10 MB
    },
  });

  await fastifyApp.register(fastifyStatic, {
    root: path.join(__dirname, "uploads"),
    prefix: "/uploads/",
  });

  await fastifyApp.register(autoload, {
    dir: path.join(__dirname, "routes/api/v1"),
    options: { prefix: "/api/v1" },
  });

  fastifyApp.ready(() => {
    console.log(fastifyApp.printRoutes());
  });

  fastifyPassport.use(
    "local",
    new LocalStrategy(async (username, password, done) => {
      console.log("Started func");

      try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
          return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  fastifyPassport.registerUserSerializer((user) => user);
  fastifyPassport.registerUserDeserializer((user) => user);

  fastifyApp.listen(
    { port: process.env.PORT || 8080, host: "0.0.0.0" },
    (error, address) => {
      if (error) throw error;
      console.log(`Server running on ${address}`);
    }
  );
})();
