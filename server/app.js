const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
mongoose.connect(
  "mongodb://jigneshk5:"+ process.env.MONGO_ATLAS_PW +"@cluster0-shard-00-00-8wiaa.mongodb.net:27017,cluster0-shard-00-01-8wiaa.mongodb.net:27017,cluster0-shard-00-02-8wiaa.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", {
    useMongoClient: true
  }
);
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://jigneshk5:'+ process.env.MLAB_PW +'@ds341605.mlab.com:41605/roomdb'); 

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/api/rooms", productRoutes);
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

//Handle production
if(process.env.NODE_ENV === 'production' ){
  app.use(express.static(__dirname+'/public/'));
  //Handle SPA
  app.get(/.*/,(req,res) => {
    res.sendFile(__dirname+'/public/index.html');
  });
}

module.exports = app;