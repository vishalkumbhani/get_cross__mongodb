const express = require("express");
const noticeboardroutes = express.Router();
const {
  InsertNoticeBoard,
  UpdateNoticeBoard,
  GetAllNoticeBoard,
  GetSingleNoticeBoard,
  DeleteNoticeBoard } = require("../controllar/noticeboard");

noticeboardroutes.post("/", InsertNoticeBoard);
noticeboardroutes.patch("/:id", UpdateNoticeBoard);
noticeboardroutes.get("/", GetAllNoticeBoard);
noticeboardroutes.get("/:id", GetSingleNoticeBoard);
noticeboardroutes.delete("/:id", DeleteNoticeBoard);

module.exports = noticeboardroutes;
