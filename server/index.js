const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 提供静态前端页面
app.use(express.static(path.join(__dirname, '../client')));

io.on('connection', (socket) => {
  console.log('A user connected');

  // 处理用户加入聊天
  socket.on('join', (nickname) => {
    socket.nickname = nickname;
    io.emit('system', `${nickname} 加入聊天`);
  });

  // 处理消息发送
  socket.on('message', (msg) => {
    io.emit('message', { user: socket.nickname, text: msg });
  });

  // 处理用户断开连接
  socket.on('disconnect', () => {
    if (socket.nickname) {
      io.emit('system', `${socket.nickname} 离开聊天`);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});