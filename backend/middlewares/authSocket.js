const authSocket = (socket, next) => {
  const headers = socket.handshake.headers;
  console.log("from auth"); // run one incase handShake

  if (!headers.token) {
    next(new Error("Invalid Token"));
  } else {
    // use room private on user_id
    socket.join("room-" + headers.user_id);
    socket.user = { token: headers.token, user_id: headers.user_id };
    next();
  }
};

module.exports = authSocket;
