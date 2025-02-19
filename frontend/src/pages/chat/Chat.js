import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socketConnect from "../../socket";
import "./chat.css";
import Message from "../message/Message";

const Chat = () => {
  const state = useSelector((reducer) => ({
    authReducer: reducer.authReducer,
  }));

  // Access token and userId
  const Token = state.authReducer.token;
  const user_id = state.authReducer.userId;

  // State to store socket instance
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Function to connect socket on button click
  // const handleConnect = () => {
  //   if (!socket) {
  //     const newSocket = socketConnect({ user_id, Token });
  //     setSocket(newSocket);

  //     newSocket.on("connect", () => {
  //       console.log("Connected to server");
  //       setIsConnected(true);
  //       newSocket.emit("register", user_id);
  //     });

  //     newSocket.on("connect_error", (error) => {
  //       console.error("Socket connection error:", error.message);
  //       setIsConnected(false);
  //     });

  //     // Cleanup on unmount
  //     return () => {
  //       newSocket.close();
  //       newSocket.removeAllListeners();
  //       setIsConnected(false);
  //     };
  //   }
  // };
  useEffect(() => {
    if (!socket) {
      const newSocket = socketConnect({ user_id, Token });
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Connected:", newSocket.id);
        setIsConnected(true);
        newSocket.emit("register", user_id); // ✅ Register user on server
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
        setIsConnected(false);
      });

      return () => {
        newSocket.disconnect();
        setIsConnected(false);
      };
    }
  }, [socket, user_id, Token]);
  return (
    <>
      <div>
        <button
          className="contuct_us"
          onClick={() => setSocket(socketConnect({ user_id, Token }))}
          disabled={isConnected}
        >
          {isConnected
            ? "Click here to contact us"
            : "Click here to contact us"}
        </button>
      </div>
      {socket && <Message socket={socket} user_id={user_id} />}
    </>
  );
};

export default Chat;
