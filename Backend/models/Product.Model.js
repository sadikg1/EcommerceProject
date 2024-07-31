const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        lowercase: true,
    },
    description: {
        required: true,
        type:String
    },
    category: {
        type: mongoose.ObjectId,
        ref: "category",
        required:true
    },
    quantity: {
        type: Number,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    photo: {
        data: Buffer,
        contentType:String,
        
    },
    shipping: {
        type:Boolean
    }
    
}, { timestamps: true });
module.exports=mongoose.model("product",productSchema)