
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 2567;

const uri = "mongodb+srv://CharlieSimons:<password>@one-word-story.axfep.mongodb.net/test";
const client = new MongoClient(uri);
const db = client.db('ows');
const collection = db.collection('ows-collection');
app.use(express.json());
app.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
    }

);
 app.get('/cards',async  (req, res) => {
    documents = await getCardsFromDb();
    if(documents.length > 0){
    res.status(200).send(documents);
    }
    else{
        res.status(404).send("No cards found");
    }
}
);
app.post('/cards', async (req, res) => {
    // The document to be inserted, is a json object with a string title and an array of strings called body
    const document = {
        title: req.body.title,
        body: req.body.body
    };
    // Insert the document into the collection
    await collection.insertOne(document);
    console.log("Document inserted")
    // Return the inserted document
    res.status(201).send(document);
}
);


async function getCardsFromDb(){
    let documents = await collection.find({}).toArray();
    return documents;
}

