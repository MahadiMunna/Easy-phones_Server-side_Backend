const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('Easy phones running');
})

app.listen(port,()=>{
    console.log(`EasyPhones server running on ${port}`);
})