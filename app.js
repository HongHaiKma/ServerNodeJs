// const express = require('express');
// const app = express();
// const port = 8080;

// app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//     return res.render('index');
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));



const express = require('express')
const mongoose = require('mongoose')

const url = "mongodb://127.0.0.1:27017/"
const port = 8080
const app = express()

const MongoClient = require("mongodb").MongoClient;

// import { MongoClient } from "mongodb";
const client = new MongoClient(url)

// const detailsSchema = mongoose.Schema({
//     EnemyType: String,
//     UnitId: String,
//     Count: Number,
//     Delay: Number
//   })

const levelData = 
{
    // "userid": reg.params["id"],
    EnemyType: String,
    UnitId: String,
    Count: Number,
    Delay: Number
} 

mongoose.connect(url, {})
    .then(result => console.log("Database connected"))
    .catch(err => console.log(err))

async function run(count) {
    try {
        const database = client.db("GameDB")
        const movies = database.collection("LevelData")
        // Query for a movie that has the title 'The Room'
        // const query = { UnitId: "Monster1" }
        const query = { _id: count }
        const options = {
        // sort matched documents in descending order by rating
        // sort: { "imdb.rating": -1 },
        // Include only the `title` and `imdb` fields in the returned document
        // projection: { _id: 0 },
        };
        const data = await movies.findOne(query, options)

        levelData.EnemyType = data.EnemyType
        levelData.UnitId = data.UnitId
        levelData.Count = data.Count
        levelData.Delay = data.Delay

        // since this method returns the matched document, not a cursor, print it directly
        // console.log(JSON.stringify(levelData))
        // return JSON.stringify(levelData)
        return levelData
    } finally {
        console.log("AAAAAAAAA")
    }
}

app.get("/:id", (reg, res) =>
{
    var _id = parseInt(reg.params.id)
    run(_id)

    console.log(_id)

    res.send(levelData)
})

app.listen(port, () =>
{
    console.log("Connected")
})