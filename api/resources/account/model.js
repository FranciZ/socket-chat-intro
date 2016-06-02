const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateCreated : { type:Date, default:Date.now },
    email       : { type:String, unique:true},
    password    : String,
    username    : String,
    tokens      : [
        {
            value   : String,
            expires : { type:Date, default:function(){return +new Date() + 7*24*60*60*1000}},
            dateCreated : { type:Date, default:Date.now}
        }
    ]

});

mongoose.model('Account', schema);