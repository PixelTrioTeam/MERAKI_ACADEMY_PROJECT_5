const { Server } = require("socket.io");
const authSocket = require("../middlewares/authSocket");
const messageHandler = require("../controllers/message");
const example = require("../middlewares/exampleMW");

const io = new Server(8080, { cors: { origin: "*" } });
//   MiddleWhere to access to check send the token or not
io.use(authSocket); // connect_error
// declare variable clients to save the date
const clients = {};

// connect
io.on("connection", (socket) => {
  socket.use(example);
  // access the user_id handshake to access the information on headers
  const user_id = socket.handshake.headers.user_id;

  // create key user_id unique and save the date
  clients[user_id] = { user_id: user_id, socket_id: socket.id };
  console.log(clients);

  // any event inside the connection server
  // event to send and recive messagess;

  //   invoke function messageHandler
  messageHandler(socket, io);

  //   error to event
  socket.on("error", (error) => {
    socket.emit("error", { error: error.message });
  });
  //   invalid connection with client this function run
  socket.on("disconnect", () => {
    console.log("disconnect user_id => ", socket.id);

    // delete the user to disConnect // use the for in to each user and found this user
    for (const key in clients) {
      if (clients[key].socket_id === socket.id) {
        delete clients[key];
      }
    }
    console.log(clients);
  });
});

module.exports = io;
