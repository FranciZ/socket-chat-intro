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

        socket.on('message-seen', function(data){

            const Notification = mongoose.model('Notification');

            const q = Notification.findOneAndUpdate({message:data._id, room:data.room}, { seen:true });

            q.exec()
                .then((doc)=>{



                })
                .catch((err)=>{
                    console.log(err);
                });

        });

        socket.on('message', function (data) {

            const Message = mongoose.model('Message');
            const Notification = mongoose.model('Notification');

            const newMessage = new Message({
                room: data.room,
                content: socket.account.username + ' said: ' +data.content,
                type: 'message',
                account: socket.account._id
            });

            newMessage.save()
                .then((err)=>{

                    const newNotification = new Notification({
                        room:data.room,
                        message:newMessage._id,
                        account:socket.account._id
                    });

                    return newNotification.save();

                })
                .then((err)=>{

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