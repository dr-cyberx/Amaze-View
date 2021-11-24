import { model, Schema } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    age: {
      type: Number,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  // console.log("This => ", this);
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  genSalt(10, function (err: any, salt: any) {
    if (err) {
      return next(err);
    }
    hash(user.password, salt, function (err: any, hash: any) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (CandidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    compare(CandidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

const User = model("user", UserSchema);

export default User;
