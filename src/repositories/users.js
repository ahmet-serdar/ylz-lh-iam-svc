const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  profile: {
    _id : false,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
  },
  credentials: {
    _id : false,
    password : { 
      _id : false,
      value: {
      type: String,
      required: true
    } }
  },
  groupIds: {
    type: Array,
    required: true,
    default: []
  },
  deletedAt: {
    type: Date || null,
    default: null,
  },
  deletedBy: {
    type: String,
    default: null,
  },
});

userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
