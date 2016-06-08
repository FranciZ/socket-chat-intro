angular.module('chatApp').factory('roomService',function(
    $http,
    socketService,
    NET
) {

    var roomService = {

        model:{
            list:[]
        },
        listen:function(){

            socketService.socket.on('newRoom', function(room){

                roomService.model.list.push(room);

            });

        },
        create:function(data){

            console.log('Post data: ',data);

            var promise = $http.post(NET.API_URL+'/room', data);

            promise.then(function(res){

                //roomService.model.list.push(res.data);

            });

            return promise;

        },
        getAll:function(){

            var promise = $http.get(NET.API_URL+'/rooms');

            promise.then(function(res){

                roomService.model.list = res.data;

            });

            return promise;

        },
        getRoomMessages: function(roomId){

            var promise = $http.get(NET.API_URL+'/room/'+roomId+'/messages');

            promise.then(function(res){

                socketService.messages.length = 0;
                angular.extend(socketService.messages, res.data);

            });

            return promise;

        },
        removeRoom: function(roomId){

            var promise = $http.delete(NET.API_URL+'/api/room/'+roomId);

            promise.then(function(res){

                var removedRoom = res.data;

                angular.forEach(roomService.model.list, function(room, i){

                    if(room._id === removedRoom._id) {
                        roomService.model.list.splice(i, 1);
                    }

                });

            });

            return promise;

        }

    };

    return roomService;

});
