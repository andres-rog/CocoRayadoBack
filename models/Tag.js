const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const tagSchema = new Schema({
    title:{
        type:String,
        required:[true,"La Tag debe tener un nombre"]
    },
},{timestapms:true})

module.exports = model("Tag",tagSchema);