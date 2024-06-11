const mongoose = require("mongoose");

const noticeboardSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const NoticeBoard = mongoose.model("noticeboard", noticeboardSchema);

module.exports = NoticeBoard;
