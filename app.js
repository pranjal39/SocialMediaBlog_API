import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes';
import blogRouter from './routes/blog-routes';

const app = express();

//as we used to use bodyParser now to let the app know what kind of data we are sending
app.use(express.json());

app.use("/api/user",router);
app.use("/api/blog",blogRouter);

mongoose
.connect('mongodb+srv://prnjl39:Prnjl1704@cluster17.xugqo49.mongodb.net/Blog?retryWrites=true&w=majority')
.then(() => app.listen(8080))
.then(() => console.log('connected to DB'))
.catch((err) => console.log(err));
