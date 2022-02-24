const mongoose = require("mongoose");
const validator = require("validator");

const cardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    desc: {
      type: String,
    },
    label: {
      type: String,
    },
    members: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    checklist: [
      {
        text: {
          type: String,
        },
        complete: {
          type: Boolean,
        },
      },
    ],
    idList: {
      type: mongoose.Types.ObjectId,
      ref: "list",
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("card", cardSchema);

module.exports = Card;
