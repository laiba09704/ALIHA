const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    product: {
      name: String,
      price: Number,
      img: String,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    totalPrice: Number,

    shippingDetails: {
      contact: String,
      country: String,
      firstName: String,
      lastName: String,
      address: String,
      apartment: String,
      city: String,
      phone: String,
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);