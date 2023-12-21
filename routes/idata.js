import { Router } from "express";
import Idata from "../models/Idata.js";
import fetch from 'node-fetch';
import mongoose from 'mongoose';
// Creating an instance of the Express Router
const router = Router();

// creating /idatas endpoint
router.get("/idatas", async(req,res)=>{
   try{
    // pagination
     const page = parseInt(req.query.page)-1 || 0;
     const limit = parseInt(req.query.limit) || 10;
     const search = req.query.search || "";
      let month=req.query.month || "March";

      const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October","November","December"];
      //,{description: {$regex: search, $options: "i"}},{price: {$regex: search, $options: "i"}}
  //{title:{$regex: search, $options: "i"}}
      const idatas= await Idata.find({
         $or: [
           { title: { $regex: search, $options: "i" } },
           { description: { $regex: search, $options: "i" } },
           { price: { $regex: search, $options: "i" } },
         ],
       })
         .where('month') 
         .in(month)
         .skip(page*limit);

         const total = await Idata.countDocuments({
            month:{$in: month},
            $or: [
               { title: { $regex: search, $options: "i" } },
               { description: { $regex: search, $options: "i" } },
               { price: { $regex: search, $options: "i" } },
             ]
            //title:{$regex: search, $options: "i"},
            // description: {$regex: search, $options: "i"},
            // price: {$regex: search, $options: "i"}
         });
         const response ={
            error: false,
            total,
            page: page +1,
            limit,
            month: monthOptions,
            idatas
         };

         res.status(200).json(response);

   } catch(err){
      console.log(err);
      res.status(500).json({error:true, message:"Internal Server Error"});
   }
});



const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October","November","December"];

async function getInitialData() {
    const myIntialData = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
    const response = await myIntialData.json();
    //console.log(response);

    for (let i = 0; i < response.length; i++) {

        const mon= response[i]['dateOfSale'].substring(5, 7);
       const mon2 = parseInt(mon);
   const month=monthNames[mon2-1];
        const iData = new Idata({
            id: response[i]['id'],
            title: response[i]['title'],
            price: response[i]['price'],
            description: response[i]['description'],
            category: response[i]['category'],
            image: response[i]['image'],
            sold: response[i]['sold'],
            dateOfSale: response[i]['dateOfSale'],
            month: month
        });
        iData.save();
        
      
      // console.log(monthNames[month-1]);
    }
}
getInitialData();




//module.exports=router;
export default router;