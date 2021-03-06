const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

const { Comment } = require("../models/Comment");

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) {
      return res.json({ success: false, err });
    }
    // popuplater <- save 에서는 사용할 수 없다.
    Comment.find({ _id: comment })
      .populate("writer")
      .exec((err, result) => {
        if (err) {
          return res.json({ success: false, err });
        }
        return res.status(200).json({ success: true, result });
      });
  });
});

router.post("/getComments", (req, res) => {
  Comment.find({
    postId: req.body.videoId,
  })
    .populate("writer")
    .exec((err, comments) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({ success: true, comments });
    });
});

module.exports = router;
