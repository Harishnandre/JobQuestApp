import express from 'express';
import cors from 'cors';
import db from './db/db.js';
import dotenv from 'dotenv';
import { readdirSync } from 'fs';
import cookieParser from 'cookie-parser';
dotenv.config();
const app=express();

const PORT=process.env.PORT;

// Middlewares are here
app.use(express.json());
app.use(cors({
    origin:' http://localhost:5173',
    credentials:true
}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

// Load routes dynamically
readdirSync('./routes').forEach(async (file) => {
    const route = await import(`./routes/${file}`);
    app.use('/api/v1/', route.default);
});

const server=()=>{
    db();
    app.listen(PORT,()=>{
        console.log("You are listening to the port:",PORT);
    });
}

server();
