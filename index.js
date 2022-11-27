const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('mongodb')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vivqooe.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        const categoryCollection = client.db('easyPhones').collection('phonesCategory');

        app.get('/categories',async(req,res)=>{
            const query = {};
            const categories = await categoryCollection.find(query).toArray();
            res.send(categories);
        })
    }
    finally{

    }
}
run().catch(error=>console.log(error));


app.get('/',(req,res)=>{
    res.send('Easy phones running');
})

app.listen(port,()=>{
    console.log(`EasyPhones server running on ${port}`);
})