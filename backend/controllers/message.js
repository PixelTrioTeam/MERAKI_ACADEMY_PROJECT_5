const messageHandler = (socket, io) => {
  socket.on("message", (data) => {
    console.log(data);
    // success message
    data.success = true;

    // invoke join from auth to send message and send this meesage
    //                           send to client 2 and recive from 1
    socket.to("room-" + data.to).emit("message", [data]);

    // response the message use emit() & event postMan listen;
    //          event   date
    socket.emit("message", data);
  });
};

module.exports = messageHandler;
