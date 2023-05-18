require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors")
const router = require("./routes")
const { PORT } = process.env;

const app = express();

app.use(cors())
app.use(logger("tiny"));
app.use(express.json())

app.use("/api/v1", router)

// handle error 404
app.use((req,res,next) =>{
  return res.status(404).json({
    status: false,
    message: "page not found 404",
    data: null
  })
})

// handle error 500
app.use((err,req,res,next)=>{
  return res.status(500).json({
    status: false,
    message: err.message,
    data: null
  })
})

module.exports = app