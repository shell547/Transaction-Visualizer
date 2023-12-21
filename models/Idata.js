import mongoose from 'mongoose';

const initialDataSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        //type: Number,
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sold: {
        type: String,
        required: true
    },
    dateOfSale: {
        type: String,
        required: true  
        //why??
    },
    month: {
      type: String,
      required: true
    }


});
const Idata = mongoose.model('Idata', initialDataSchema);
//module.exports= Idata;
export default Idata;