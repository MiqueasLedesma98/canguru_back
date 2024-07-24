const { conn } = require("./config/db.config");
const { join } = require("path");
const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const routes = require("./routes");

const { httpErrors } = require("./middlewares");
const { transporter } = require("./config/nodemailer.config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // DB connection
    this.conn = conn();

    // Emails
    this.emailReady();

    // Middlewares
    this.middlewares();

    // Routes;
    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(
      fileUpload({
        createParentPath: true,
        limits: { fileSize: 50 * 1024 * 1024 }, // 50mb
      })
    );

    this.app.use(express.static(join(__dirname, "public")));

    this.app.use(morgan("tiny"));
  }

  routes() {
    Object.entries(routes).forEach(([key, value]) => {
      this.app.use(`/api/${key}`, value);
    });

    this.app.use(httpErrors);
  }

  emailReady() {
    transporter.verify((err) => {
      if (!err) {
        console.log("La aplicación esta lista para enviar emails".bgGreen);
      } else {
        console.log("Node-mailer - error de configuración".bgRed);
      }
    });
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Your server is running on ${this.port}`.rainbow)
    );
  }
}

module.exports = Server;
