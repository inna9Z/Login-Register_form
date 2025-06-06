import path from "path"
import express from 'express'
import connectToMangoDB from './db/connectToDb.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import cors from 'cors'; 


import authRoute from './routes/authRoute.js'

const PORT = process.env.PORT || 5005

const __dirname = path.resolve()

const app = express();

app.use(
    cors({
      origin:"*", // Make sure this matches your frontend URL
      credentials: true, // This allows sending cookies
    })
  );

app.use(cors());
dotenv.config();


app.use(express.json()); // Parse JSON bodies
app.use(cookieParser());


app.use("/api/auth" , authRoute)

// Serve static files
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("*", (req, res) => {
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  } else {
    res.status(404).send('Not found');
  }
});
// app.get('/',  (req, res) => {
//     res.send('Hello World')

// })

app.listen(PORT, () => {
    connectToMangoDB()
    console.log('Server created')
})

