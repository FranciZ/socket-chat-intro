const mongoose = require('mongoose');

exports.init = ()=>{

    return new Promise((resolve, reject)=>{

        mongoose.connect('mongodb://localhost/socket-chat');

        mongoose.connection.on('error', (err)=>{

            

        });

        mongoose.connection.once('open', ()=>{

            resolve();

        });

    });



};