const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const corsOptions = {
  // origin:'https://abc.onrender.com',
  AccessControlAllowOrigin: "*",
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A User Connected");

  socket.on('message', (data) => {
      io.emit('message', data)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = 4001;
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
