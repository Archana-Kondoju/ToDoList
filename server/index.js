const express = require('express')
const app = express()
const cors= require('cors')
const port = process.env.PORT || 3000;
require('dotenv').config()
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
app.use(express.json())
app.use(cors())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@to-do-list.snwtatk.mongodb.net/?retryWrites=true&w=majority&appName=to-do-list`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const db=client.db("toDoList")
    const todoList=db.collection("todoList")

    app.post("/:uid",async(req,res)=>{
      const body=req.body;
      body.createAt=new Date();
      console.log(body);
      const result=await todoList.insertOne(body)
      if(result.insertedId){
        return res.status(200).send(result);
      }
      return res.status(404).send({message:"can not add! try again later",
                                  status:false});
    })

    app.get("/:uid",async(req,res)=>{
      const todos= await todoList.find({}).toArray()
      res.send(todos);
    })

    app.delete("/:uid/:id",async(req,res)=>{
      const id=req.params;
      const filter={_id: new ObjectId(id)};
      const result=await todoList.deleteOne(filter);
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {}
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})