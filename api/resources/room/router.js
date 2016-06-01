const mongoose = require('mongoose');

exports.init = (app)=>{

    app.get('/rooms', (req, res) => {

        const Room = mongoose.model('Room');

        Room.find((err, docs)=>{

            if(err){
                res.status(400).send(err);
            }else{
                res.send(docs);
            }

        });

    });

    app.post('/room', (req, res)=>{

        const Room = mongoose.model('Room');
        const data = req.body;

        const newRoom = new Room({
            name:data.name
        });

        Room.count({name:data.name}, (err, num)=>{

            if(num > 0){
                res.status(409).send('Room name not available');
            }else{
                newRoom.save((err)=>{

                    if(err){
                        res.status(400).send(err);
                    }else{
                        res.send(newRoom);
                    }

                });
            }

        });

    });

    app.delete('/room/:roomId', (req, res)=>{

        const Room = mongoose.model('Room');
        const Message = mongoose.model('Message');
        const roomId = req.params.roomId;

        Room.findByIdAndRemove(roomId, (err, doc)=>{

            Message.remove({room:roomId}, (err, docs)=>{

                if(err){
                    res.status(400).send(err);
                }else{
                    res.send(doc);
                }

            });

        });


    });






};