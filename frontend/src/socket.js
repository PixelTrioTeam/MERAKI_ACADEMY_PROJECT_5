import io from "socket.io-client";

const socketConnect = ({ user_id, token }) => {
  return io("http://localhost:8080", {
    extraHeaders: {
      user_id,
      token,
    },
  });
};
export default socketConnect;
