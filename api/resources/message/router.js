const mongoose = require('mongoose');

exports.init = (app)=>{

    app.get('/room/:roomId/messages', (req, res)=>{

        const roomId = req.params.roomId;
        const Message = mongoose.model('Message');

        const q = Message.find({room:roomId});

        q.populate('room');

        q.exec()
            .then((docs)=>{
                res.send(docs);
            })
            .catch((err)=>{
                res.status(400).send(err);
            });

    });

    app.delete('/message/:messageId', (req, res)=>{

        const Message = mongoose.model('Message');
        const messageId = req.params.messageId;

        Message.findByIdAndRemove(messageId, (err, doc)=>{

            if(err){
                res.status(400).send(err);
            }else{
                res.send(doc);
            }

        });

    });

};