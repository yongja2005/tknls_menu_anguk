import mongoose from "mongoose";
import moment from "moment";

const AngukSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  contents: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Anguk = mongoose.model("anguk", AngukSchema);

export default Anguk;