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

  const onLike = () => {
    if (LikeAction === null) {
      Axios.post("/api/like/upLike", variables).then((response) => {
        if (!response.data.success) {
          alert("좋아요에 실패했슴다");
          return;
        }
        setLikes(Likes + 1);
        setLikeAction("liked");

        if (DislikeAction !== null) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        }
      });
      return;
    }
    Axios.post("/api/like/unLike", variables).then((response) => {
      if (!response.data.success) {
        alert("좋아요 취소에 실패했슴다");
        return;
      }
      setLikes(Likes - 1);
      setLikeAction(null);
    });
  };

  const onDislike = () => {
    if (DislikeAction !== null) {
      Axios.post("/api/like/unDislike", variables).then((response) => {
        if (!response.data.success) {
          alert("싫어요 취소에 실패했습니다");
          return;
        }
        setDislikes(Dislikes - 1);
        setDislikeAction("disliked");
      });
      return;
    }
    Axios.post("/api/like/upDislike", variables).then((response) => {
      if (!response.data.success) {
        alert("싫어요에 실패했습니다");
        return;
      }
      setDislikes(Dislikes + 1);
      setDislikeAction(null);

      if (LikeAction !== null) {
        setLikeAction(null);
        setLikes(Likes - 1);
      }
    });
  };
  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="like">
          <LikeOutlined
            type="like"
            theme={LikeAction === "liked" ? "filed" : "outlined"}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
      </span>
      <span key="comment-basic-dislike">
        <Tooltip title="dislike">
          <DislikeOutlined
            type="dislike"
            theme={DislikeAction === "disliked" ? "filed" : "outlined"}
            onClick={onDislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislikes;
