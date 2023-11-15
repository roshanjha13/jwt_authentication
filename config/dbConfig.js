const mongoose = require("mongoose");

const mongo = process.env.MONGO_URL;

const connectDB = async () => {
  const conn = await mongoose
    .connect(mongo)
    .then((res) => console.log(`mongodb is  connected`))
    .catch((err) => console.log(`mongo is not connected:${err.message}`));
};

module.exports = connectDB;
