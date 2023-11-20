const express = require('express');
const app = express();
const userRoutes = require('../server/routes/userRoute');
const listRoutes = require('../server/routes/taskRoute');
const PORT = 8000 || process.env.PORT;
const sequelize = require('./dbConnection/dbConnection');
const User = require('./models/userModel');
const cors = require('cors');
const validateToken = require('./middleware/tokenChecker');
require('dotenv').config();


sequelize.sync({ force: false }) // Use { force: true } to drop tables and re-create them
.then(() => {
    console.log('Database and tables synced!');
})
.catch(err => {
    console.error('Error syncing database:', err);
});

app.use(cors({origin:"*"}));

app.use(express.json());
app.use('/user',userRoutes);
app.use('/list',validateToken,listRoutes);


app.listen(PORT,(req,res)=>{
    console.log("Server started on port",PORT);
});