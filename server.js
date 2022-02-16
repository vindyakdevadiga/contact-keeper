const express=require('express');
const connectDB=require ('./config/db');
const path = require('path');

const app=express();
app.use(express.json({ extended: false }));

//connect database
connectDB();
app.get('/', (req,res) =>{
    res.json({msg : 'welcome to the contact api'});
});

//Define Routes
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contact'));
 

const PORT=process.env.PORT ||5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));