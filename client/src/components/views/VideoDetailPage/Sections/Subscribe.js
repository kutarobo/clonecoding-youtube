import React, { useEffect, useState } from "react";
import Axios from "axios";

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    let variable = { userTo: props.userTo };
    Axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (!response.data.success) {
        alert("구독자 정보수를 받아오지 못했습니다");
        return;
      }
      setSubscribeNumber(response.data.subscribeNumber);
    });

    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };
    Axios.post("/api/subscribe/subscribed", subscribedVariable).then(
      (response) => {
        if (!response.data.success) {
          alert("정보를 받아오지 못했습니다.");
          return;
        }
        setSubscribed(response.data.subscribed);
      }
    );
  }, []);

  const onSubscribe = () => {
    let subscribeVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };

    let condition = {
      apiMethod: "subscribe",
      errorText: "구독 시도에 실패했습니다.",
    };

    if (Subscribed) {
      condition.apiMethod = "unSubscribe";
      condition.errorText = "구독 취소에 실패했습니다.";
    }

    Axios.post(`/api/subscribe/${condition.apiMethod}`, subscribeVariable).then(
      (response) => {
        if (!response.data.success) {
          alert(condition.errorText);
          return;
        }
        setSubscribeNumber((prevNumber) =>
          Subscribed ? prevNumber - 1 : prevNumber + 1
        );
        setSubscribed(!Subscribe);
      }
    );
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribed ? "#aaaaaa" : "#cc0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWaight: "500",
          fontSize: "1rem",
          textTransForm: "uppercase",
        }}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
