const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ Connection error:", err));

const propertySchema=new mongoose.Schema({
    title:String,
    description:String,
    image:String,
    contact:String,
    reviews:[
        {
            user:String,
            rating:Number,
            comment:String,
        },
    ],
});

const Property=mongoose.model("Property",propertySchema);

app.post("/api/properties",async(req,res)=>{
    try{
        const {title,description,image,contact}=req.body;
        if(!title||!description||!image||!contact){
            return res.status(400).json({message:"Incomplete property data"});
        }
        const newProperty= new Property({
            title,
            description,
            image,
            contact,
            reviews:[],
        });

        const savedProperty=await newProperty.save();

        res.status(201).json(savedProperty);
    } catch(error){
        console.error("Error adding Property:",error);
        res.status(500).json({message:"Internal server error"});
    }
});

app.get("/api/properties",async(req,res)=>{
    try{
        const properties=await Property.find();
        res.json(properties);
    } catch(error){
        res.status(500).json({message:error.message});
    }
});

app.post("/api/properties/:id/review",async(req,res)=>{
    const {user,rating,comment}=req.body;
    try{
        const property=await Property.findById(req.params.id);
        property.reviews.push({user,rating,comment});
        await property.save();
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
})

app.delete("/api/properties/:id",async(req,res)=>{
    const propertyId=req.params.id;
    try{
        const deletedProperty=await Property.findByIdAndDelete(propertyId);
        if(!deletedProperty){
            return res.status(404).json({message:"Property not found"});

        }
        res.json({message:"Property deleted",deletedProperty});
    }catch(error){
        console.error("Error deleting property:",error);
        res.status(500).json({message:"Internal server error"});
    }
});





app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
