const { Server } = require("socket.io");
const authSocket = require("../middlewares/authSocket");
const messageHandler = require("../controllers/message");
const example = require("../middlewares/exampleMW");
const { pool } = require("pg");
const io = new Server(8080, { cors: { origin: "*" } });
//   MiddleWhere to access to check send the token or not
io.use(authSocket); // connect_error
// declare variable clients to save the date
const clients = {};
const users = {};
// connect
// io.on("connection", (socket) => {
//   socket.use(example);
//   // access the user_id handshake to access the information on headers
//   const user_id = socket.handshake.headers.user_id;

//   // create key user_id unique and save the date
//   clients[user_id] = { user_id: user_id, socket_id: socket.id };
//   console.log(clients);

//   // any event inside the connection server
//   // event to send and recive messagess;

//   //   invoke function messageHandler
//   messageHandler(socket, io);
//   ////////////////////////////////////////////////////
//   ////////////////////////////////////////////////////
//   ////////////////////////////////////////////////////

//   socket.on("register", (user_id) => {
//     users[user_id] = socket.id; // Save user_id with socket ID
//     console.log("User registered:", clients);
//   });

//   socket.on("send_message", (data) => {
//     console.log("Received message:", data);

//     const recipientSocket = users[data.recipient]; // Find recipient socket
//     if (recipientSocket) {
//       io.to(recipientSocket).emit("receive_message", data); // Send message
//     } else {
//       console.log("Recipient not online");
//     }
//   });

//   ////////////////////////////////////////////////////
//   ////////////////////////////////////////////////////
//   ////////////////////////////////////////////////////

//   //   error to event
//   socket.on("error", (error) => {
//     socket.emit("error", { error: error.message });
//   });
//   //   invalid connection with client this function run
//   socket.on("disconnect", () => {
//     console.log("disconnect user_id => ", socket.id);

//     // delete the user to disConnect // use the for in to each user and found this user
//     for (const key in clients) {
//       if (clients[key].socket_id === socket.id) {
//         delete clients[key];
//       }
//     }
//     console.log(clients);
//   });
// });
io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("register", (user_id) => {
    users[user_id] = socket.id; // Save user_id with socket ID
    console.log("User registered:", users);
  });

  socket.on("send_message", (data) => {
    console.log("Received message:", data);

    const recipientSocket = users[data.recipient]; // Find recipient socket
    if (recipientSocket) {
      io.to(recipientSocket).emit("receive_message", data); // Send message
    } else {
      console.log("Recipient not online");
    }
  });

  socket.on("disconnect", () => {
    const user_id = Object.keys(users).find((key) => users[key] === socket.id);
    if (user_id) {
      delete users[user_id];
      console.log("User disconnected:", user_id);
    }
  });
});
module.exports = io;
