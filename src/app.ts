import express from 'express'


//Importing Routes

import userRoute from './routes/user.js';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';

const port =4000;

connectDB();

const app=express();
app.use(express.json());

app.get("/",(_req,res)=>{
    res.send("API Working with /api/v1")
})
//Using Routes

app.use("/api/v1/user", userRoute);

app.use(errorMiddleware);

app.listen(port,()=>{
    console.log(`express is working on http://localhost:${port}`);
})
    