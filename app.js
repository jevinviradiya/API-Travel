let express = require("express");
let app = express();
const mongo = require("mongodb");
let mongoClient = mongo.MongoClient;
const dotenv = require("dotenv");
dotenv.config();
let port = process.env.PORT || 1234;

const bodyParser = require("body-parser");
const cors = require('cors');
// const { response, query } = require("express");
// const res = require("express/lib/response");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

let mongoUrl = "mongodb+srv://travel:travel0123@cluster0.cjeic.mongodb.net/travel?retryWrites=true&w=majority";
let db;

app.get("/", (req,res)=>{
    res.send("Testing API");
})

app.get("/location", (req,res)=>{
    db.collection("location").find().toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.get("/gallary", (req,res)=>{
    db.collection("gallary").find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.get("/gallaryFirst", (req,res)=>{
    db.collection("gallary_first").find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.get("/places/:id", (req,res)=>{
    let countryId = Number(req.params.id);
    db.collection("places").find({country_id : countryId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);

    })

})

app.get("/gallary/:id", (req,res)=>{
    let countryId = Number(req.params.id);
    db.collection("gallary").find({country_id : countryId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})


mongoClient.connect(mongoUrl, (err,connection)=>{
    if(err) console.log("Error while connectiong");
    db = connection.db("travel");

app.listen(port, ()=>{
    console.log(`port is start at ${port}`);
    })

})