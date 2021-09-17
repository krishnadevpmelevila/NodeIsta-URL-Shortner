const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/urlshortner' ;
mongoose.connect(DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}) ;
const connection = mongoose.connection;
module.exports = connection;