const mongoose = require("mongoose");

const mongoURI = 'mongodb+srv://sachingupta98935:sachingupta2105@cluster0.p79qazi.mongodb.net/gofood?retryWrites=true&w=majority';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Connected to MongoDB");

        const foodCollection = mongoose.connection.db.collection("food_items");
        const data = await foodCollection.find({}).toArray();
        const foodcategory = mongoose.connection.db.collection("foodCategory");
        const catData = await foodcategory.find({}).toArray();

        global.food_items = data;
        global.foodCategory = catData;

        // console.log("Data fetched from MongoDB:", global.food_item, global.foodCategory);

        
    } catch (error) {
        console.error();
    }
};

module.exports = connectToMongoDB;


// "Retrieved data:", data
// "Error connecting to MongoDB:", error














// const mongoose  = require("mongoose");

// var mongoURL = "mongodb+srv://sachingupta98935:sachingupta2105@cluster0.p79qazi.mongodb.net/gofood?retryWrites=true&w=majority" ;

// mongoose.connect(mongoURL, {useNewUrlParser: true,useUnifiedTopology:true, useNewUrlParser:true})

// var db = mongoose.connection ;

// db.on('connected' , ()=> {
//     console.log("MongoDB connected successfully");
//     const fetched_data =  mongoose.connection.db.collection("food_items")
//     fetched_data.find({}).toArray(function(err,data){
//         if(err) console.log(err)
//         else console.log(data);
//     })
// })

// db.on('error' , ()=> {
//     console.log("MongoDB connection failed");
// })

// module.exports = mongoose








// // const mongoose = require('mongoose');

// // const mongoURI = "mongodb+srv://sachingupta98935:<password>@cluster0.p79qazi.mongodb.net/?retryWrites=true&w=majority"

// // const mongoDb = () =>{
// //     mongoose.connect(mongoURI,()=>{
// //         console.log("mongodb connented successfully");
// //     });
// // }


// // module.export = mongoDb;



