import Axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./Comment";

function Comment(props) {
  const videoId = props.postId;

  const user = useSelector((state) => state.user);

  const [CommentValue, setCommentValue] = useState("");

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault(); // submit시 페이지 새로고침을 방지한다

    const variables = {
      content: CommentValue,
      writer: user.userData._id, // redux 에서 가져온데이타 todo 어떻게 입력하나?
      postId: videoId,
    };
    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (!response.data.success) {
        alert("커멘트를 저장하지 못했습니다");
        return;
      }
      // todo success
      console.log(response.data.result);
      setCommentValue("");
      props.refreshFunction(response.data.result);
    });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />
      {/* Comment List */}
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  postId={videoId}
                />
                {/* todo 댓글을 어떻게 할까. */}
                {/* <ReplyComment
                  refreshFunction={props.refreshFunction}
                  parentCommentId={comment._id}
                  commentLists={props.commentLists}
                  postId={videoId}
                /> */}
              </React.Fragment>
            )
        )}

      {/* Root Comment Form */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={CommentValue}
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
    </div>
  );
}

export default Comment;
