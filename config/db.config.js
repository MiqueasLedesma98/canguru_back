require("colors");
const { connect } = require("mongoose");

const conn = async () => {
  try {
    await connect(process.env.MONGO_CNN);

    console.log("DB-CONNECTED".bgGreen);
  } catch (error) {
    console.log(`Error db-conn: ${error.message}`.bgRed);
    process.exit(1);
  }
};

module.exports = { conn };
