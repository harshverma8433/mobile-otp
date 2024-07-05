import express from "express";
import dotenv from "dotenv"
dotenv.config({path : './.env'})
import connectToDatabase from "./database/index.js";
import app from "./app.js";

connectToDatabase()
.then(() => {
    console.log("DB CONNECTED!!!");
    app.listen(process.env.PORT , () => {
        console.log("http://localhost:" + process.env.PORT);
    })
})
.catch((error) => {
    console.log("MONGO ERROR" , error);
})