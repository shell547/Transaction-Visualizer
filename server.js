import dotenv from 'dotenv';
// import fetch from 'node-fetch';
// import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dbConnect from './dbConnect.js';
import productRoutes from './routes/idata.js';
dotenv.config();
const app=express();

dbConnect();

// middlewares
app.use(express.json());
app.use(cors());

app.use("/api",productRoutes);

const port=process.env.PORT || 8080;



//mongoose.connect("mongodb://127.0.0.1:27017/RMS");
// now we will make schema then its model
// const initialDataSchema = new mongoose.Schema({
//     id: {
//         type: Number,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     sold: {
//         type: Boolean,
//         required: true
//     },
//     dateOfSale: {
//         type: String,
//         required: true  
//         //why??
//     },
//     month: {
//       type: String,
//       required: true
//     }


// });
// ye ban gya model based on the upward schema
//const Idata = mongoose.model('Idata', initialDataSchema);

// const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October","November","December"];

// async function getInitialData() {
//     const myIntialData = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
//     const response = await myIntialData.json();
//     //console.log(response);

//     for (let i = 0; i < response.length; i++) {

//         const mon= response[i]['dateOfSale'].substring(5, 7);
//        const mon2 = parseInt(mon);
//    const month=monthNames[mon2-1];
//         const iData = new Idata({
//             id: response[i]['id'],
//             title: response[i]['title'],
//             price: response[i]['price'].stringify(),
//             description: response[i]['description'],
//             category: response[i]['category'],
//             image: response[i]['image'],
//             sold: response[i]['sold'],
//             dateOfSale: response[i]['dateOfSale'],
//             month: month
//         });
//         iData.save();
      
//       // console.log(monthNames[month-1]);
//     }
// }
// getInitialData();


app.listen(port,()=>{
    console.log(`Listening on port ${port}...`);
});