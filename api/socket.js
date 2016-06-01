const _         = require('lodash');
const mongoose  = require('mongoose');

exports.init = (io)=> {

    io.use((socket, next)=>{

        const Account = mongoose.model('Account');

        const token = socket.request._query.token;

        Account.findOne({'tokens.value':token}, (err, accountDoc)=>{

            if(err) return next('Nope!');

            if(accountDoc){
                socket.account = accountDoc;
                next();
            }else{
                next('Nope!');
            }

        });

    });

    io.on('connection', function (socket) {

        socket.on('message', function (data) {

            const Message = mongoose.model('Message');

            const newMessage = new Message({
                room: data.room,
                content: socket.account.username + ' said: ' +data.content,
                type: 'message'
            });

            newMessage.save((err)=> {

                if (err) {
                    console.log(err);
                }

                io.sockets.in(data.room).emit('message', newMessage);

            });

        });

        socket.on('join', (room)=> {

            _.each(socket.rooms, (value, key)=> {

                socket.leave(key);

            });

            socket.join(room);

        });

    });

};