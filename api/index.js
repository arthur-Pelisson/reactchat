const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const uuidv4 = require('uuid').v4;
require('./config/mongodb');
const ChatSchema = require('./chat/shema.js');


const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  },
});

const getHisto = async () => {
  let messages = [];

  const message = {message: ""};
  try {
    getMessage = await ChatSchema.find({});
    for (let i = 0; i < getMessage.length; i++) {
      messages.push(message.message = getMessage[i].message);
    }
    return messages;
  } catch(e) {
    console.log("error network");
  }
}

const saveMongo = async (data) => {
  const messageData = {
    message: data
  };
  const chatMessage = new ChatSchema(messageData);
  await chatMessage.save();
}
//async io.in
io.on('connection', async (socket) => {
  const userId = uuidv4(); // generate a unique user ID

  io.emit('id', userId); // send the user ID to the client side
  io.emit('histo', await getHisto());

  console.log(`user ${userId} connected`);

  socket.on('message', (message) => {
    console.log(message.value, message.id);
    saveMongo(message.value);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`user ${userId} disconnected`);
  });
});

http.listen(3000, () => {
  console.log('listening on localhost:3000');
});
