const NoticeBoard = require("../models/noticeboard");
const ObjectId = require("mongoose").Types.ObjectId;

const InsertNoticeBoard = async (req, res) => {
  try {
    const data = req.body;
    // res.json(data);
    if (!data.title || !data.description) {
      return res.status(400).json({
        status: false,
        message: "Please add all data"
      });
    }

    const result = await NoticeBoard.create(data);
    res.status(201).json({
      status: true,
      message: "Notice created successfully",
      data: result
    });
  }

  catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
}

const UpdateNoticeBoard = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    // res.send(id);
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
        message: "Id is not valid"
      });
    }

    const notice = await NoticeBoard.findById(id);
    // res.json(Notice);
    if (!notice) {
      return res.status(404).json({
        status: false,
        message: "Notice not found"
      });
    }

    const result = await NoticeBoard.updateOne({ _id: id }, { $set: data });
    res.status(200).json({
      status: true,
      message: "Data upadated successfully",
      data: result
    });
  }

  catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
}

const GetAllNoticeBoard = async (req, res) => {
  try {
    const result = await NoticeBoard.find({});
    res.status(200).json({
      status: true,
      data: result
    });
  }

  catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
}

const GetSingleNoticeBoard = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
        message: "ID is not valid"
      });
    }

    const notice = await NoticeBoard.findById(id);
    // res.json(Notice);
    if (!notice) {
      return res.status(404).json({
        status: false,
        message: "Notice not found"
      })
    }

    const result = await NoticeBoard.findById(id);
    res.status(200).json({
      status: true,
      data: result
    });
  }

  catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
}

const DeleteNoticeBoard = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
        message: "Id is not valid"
      });
    }

    const Notice = await NoticeBoard.findById(id);
    if (!Notice) {
      return res.status(404).json({
        status: false,
        message: "Notice not found"
      });
    }

    const result = await NoticeBoard.deleteOne(Notice);
    res.status(200).json({
      status: true,
      message: "Notice deleted successfully",
      data: result
    })
  }

  catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
}

module.exports = {
  InsertNoticeBoard,
  UpdateNoticeBoard,
  GetAllNoticeBoard,
  GetSingleNoticeBoard,
  DeleteNoticeBoard
};
