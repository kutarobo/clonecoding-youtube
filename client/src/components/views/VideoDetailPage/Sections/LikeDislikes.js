import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import Axios from "axios";

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);

  const [Dislikes, setDislikes] = useState(0);
  const [DislikeAction, setDislikeAction] = useState(null);

  let variables = {};

  if (props.video) {
    variables = { videoId: props.videoId, userId: props.userId };
  } else {
    variables = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    Axios.post("/api/like/getLikes", variables).then((response) => {
      if (!response.data.success) {
        alert("좋아요 정보를 가져오지 못했습니다.");
        return;
      }
      // 얼마나 좋아요를 받았는지
      setLikes(response.data.likes.length);
      // 내가 이미 그좋아요를 눌렀는지
      response.data.likes.map((like) => {
        if (like.userId === props.userId) {
          setLikeAction("liked");
        }
      });
    });

    Axios.post("/api/like/getDislikes", variables).then((response) => {
      if (!response.data.success) {
        alert("좋아요 정보를 가져오지 못했습니다.");
        return;
      }

      setDislikes(response.data.dislikes.length);

      response.data.dislikes.map((dislike) => {
        if (dislike.userId === props.userId) {
          setDislikeAction("disliked");
        }
      });
    });
  }, []);
  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="like">
          <LikeOutlined
            type="like"
            theme={LikeAction === "liked" ? "filed" : "outlined"}
            onClick={null}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
      </span>
      <span key="comment-basic-dislike">
        <Tooltip title="dislike">
          <DislikeOutlined
            type="dislike"
            theme={DislikeAction === "disliked" ? "filed" : "outlined"}
            onClick={null}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislikes;
