import { model, Schema } from "mongoose";

const User = new Schema({
  id: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  secondName: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  followers: [
     {
        type: String,
     }
  ],
  following: [
     {
        type: String,
     }
  ],
  places: [
    {
      type: String,
    },
  ],
  comments: [
    {
      type: String,
    },
  ],
});

const Cat = model("user", User);
