const Chat = require("../chat/shema");
require('dotenv').config()

const mongoose  = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
// async function test() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');

//     const messageData = {
//       message: "coucou"
//     };

//     const chatMessage = new Chat(messageData);
//     await chatMessage.save({ timeout: 30000 });
//     console.log('Message saved to MongoDB');
//   } catch (error) {
//     console.error('Error saving message to MongoDB:', error);
//   } finally {
//     await client.close();
//     console.log('Disconnected from MongoDB');
//   }
// }

// test();

