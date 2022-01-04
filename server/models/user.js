import mongoose from "mongoose";
import moment from "moment";

// Create Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["MainAdmin", "SubAdmin", "User"],
    default: "User",
  },
  register_date: {
    type: Date,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  comments: [
    {
			// mongoDB에서는 _id 로 id 생성시킴
			// post_id를 만든 이유는 post에 해당하는 모든 comment들이 지워져야해서 그럼
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
      comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  anguks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "anguk",
    },
  ],
});

const User = mongoose.model("user", UserSchema);

export default User;