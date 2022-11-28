const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const phonesCollection = client.db('easyPhones').collection('phones')
        const advertiseCollection = client.db('easyPhones').collection('advertisedItems')
        const userCollection = client.db('easyPhones').collection('users')

        app.get('/categories',async(req,res)=>{
            const query = {};
            const categories = await categoryCollection.find(query).toArray();
            res.send(categories);
        })
        app.get('/categories/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const category = await categoryCollection.findOne(query);
            res.send(category);
        })
        app.get('/phones',async(req,res)=>{
            const query = {};
            const phones = await phonesCollection.find(query).toArray();
            res.send(phones);
        })
        app.get('/advertise',async(req,res)=>{
            const query = {};
            const categories = await advertiseCollection.find(query).toArray();
            res.send(categories);
        })
        app.get('/users',async(req,res)=>{
            const query = {};
            const users = await userCollection.find(query).toArray();
            res.send(users);
        })
        app.get('/buyers',async(req,res)=>{
            const role='Buyer'
            const query = {role:role};
            const users = await userCollection.find(query).toArray();
            res.send(users);
        })
        app.get('/seller',async(req,res)=>{
            const role='Seller'
            const query = {role:role};
            const users = await userCollection.find(query).toArray();
            res.send(users);
        })
        app.get('/my-products/:email',async(req,res)=>{
            const email = req.params.email;
            const query = {email}
            const result = await phonesCollection.find(query).toArray();
            res.send(result);
        })
        app.get('/users/:email',async(req,res)=>{
            const email = req.params.email;
            const query = {email}
            const user = await userCollection.findOne(query);
            res.send({isAdmin:user?.role==='admin'})
        })
        app.get('/users/seller/:email',async(req,res)=>{
            const email = req.params.email;
            const query = {email}
            const user = await userCollection.findOne(query);
            res.send({isSeller:user?.role==='Seller'})
        })
        app.get('/users/buyer/:email',async(req,res)=>{
            const email = req.params.email;
            const query = {email}
            const user = await userCollection.findOne(query);
            res.send({isBuyer:user?.role==='Buyer'})
        })
        app.post('/users',async(req,res)=>{
            const user = req.body;
            const result = userCollection.insertOne(user);
            res.send(result);
        })
        app.post('/phones',async(req,res)=>{
            const phone = req.body;
            const result = phonesCollection.insertOne(phone);
            res.send(result);
        })
        app.post('/advertise',async(req,res)=>{
            const phone = req.body;
            const result = advertiseCollection.insertOne(phone);
            res.send(result);
        })
        app.delete('/users/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
        app.put('/users/:id',async(req,res)=>{
            const id= req.params.id;
            const filter = { _id: ObjectId(id)};
            const updatedUserList = {
                $set:{
                    role:'admin'
                }
            }
            const result = await userCollection.updateOne(filter,updatedUserList);
            res.send(result);
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