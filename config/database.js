const mongoose = require("mongoose");

mongoose.connect('mongodb://mobilecare:mobilecare@ac-9vtryxb-shard-00-00.md5udg0.mongodb.net:27017,ac-9vtryxb-shard-00-01.md5udg0.mongodb.net:27017,ac-9vtryxb-shard-00-02.md5udg0.mongodb.net:27017/?ssl=true&replicaSet=atlas-11yxyh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;