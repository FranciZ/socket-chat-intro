angular.module('chatApp').factory('roomService',function(
    $http,
    socketService
) {

    var roomService = {

        model:{
            list:[]
        },
        create:function(data){

            console.log('Post data: ',data);

            var promise = $http.post('http://franci.sae.proxima.si/api/room', data);

            promise.then(function(res){

                roomService.model.list.push(res.data);

            });

            return promise;

        },
        getAll:function(){

            var promise = $http.get('http://franci.sae.proxima.si/api/rooms');

            promise.then(function(res){

                roomService.model.list = res.data;

            });

            return promise;

        },
        getRoomMessages: function(roomId){

            var promise = $http.get('http://franci.sae.proxima.si/api/room/'+roomId+'/messages');

            promise.then(function(res){

                socketService.messages.length = 0;
                angular.extend(socketService.messages, res.data);

            });

            return promise;

        },
        removeRoom: function(roomId){

            var promise = $http.delete('http://franci.sae.proxima.si/api/room/'+roomId);

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
