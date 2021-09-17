const express = require('express');
const app = express();
const cors = require('cors');

const connection = require('./config/db.config');
connection.once('open',()=>console.log('DATABASE CONNECTED'));
connection.on('error',()=>console.log('DB ERROR'));
app.use(cors());
app.use(express.json({
    extended:false
}))
app.use('/',require('./routes/redirect'))
app.use('/api/url',require('./routes/url'))

const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`SERVER STARTED WORKING ON PORT ${PORT}`));