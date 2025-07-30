const socket = io();
let nickname = prompt("Enter your nickname:");

socket.emit('join', nickname);

socket.on('message', ({ user, text }) => {
  addMessage(`${user}: ${text}`);
});

socket.on('system', (msg) => {
  addMessage(`[SYSTEM] ${msg}`);
});

function send() {
  const input = document.getElementById('msgInput');
  const msg = input.value.trim();
  if (msg) {
    socket.emit('message', msg);
    input.value = '';
  }
}

function addMessage(msg) {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.innerText = msg;
  chat.appendChild(div);
}
