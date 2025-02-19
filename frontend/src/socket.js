import io from "socket.io-client";

const socketConnect = ({ user_id, Token }) => {
  console.log(user_id, Token);

  return io("http://localhost:8080", {
    extraHeaders: {
      user_id,
      Token,
    },
    // autoConnect: false,
  });
};
export default socketConnect;
