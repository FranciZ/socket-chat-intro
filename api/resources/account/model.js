const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateCreated : { type:Date, default:Date.now },
    email       : { type:String, unique:true},
    password    : String,
    username    : String,
    tokens      : [
        {
            value   : String,
            expires : { type:Date, default:function(){
                return new Date() + 1000*60*60*24*7
            }},
            dateCreated : { type:Date, default:Date.now}
        }
    ]

});

mongoose.model('Account', schema);