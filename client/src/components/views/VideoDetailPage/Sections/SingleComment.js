import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import { useSelector } from "react-redux";

const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [CommnentValue, setCommentValue] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: CommnentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id, // parent에 해당하는 것
    };

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (!response.data.success) {
        alert("커멘트를 저장하지 못했습니다.");
        return;
      }
      console.log(response.data.result);
      setCommentValue("");
      setOpenReply(false);
      props.refreshFunction(response.data.result);
    });
  };

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} />}
        content={<p> {props.comment.content}</p>}
      />

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={CommnentValue}
            placeholder="코멘트를 작성해 주세요"
          />
          <br />
          <button
            type="submit"
            style={{ widht: "20%", height: "52px" }}
            onClick={onSubmit}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
