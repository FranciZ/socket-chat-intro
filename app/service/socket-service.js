angular.module('chatApp').factory('socketService',function(
    NET,
    socketFactory
) {

    var socketService = {
        socket:null,
        room:null,
        angularSocket:null,
        messages:[],
        connect:function(token){

            var socketIo = io.connect(NET.WS_URL+'?token='+token,{path:'/api/socket.io'});

            socketService.angularSocket = socketFactory({ioSocket: socketIo});

            /**
             * Hello
             */

            // another comment

            socketService.socket = socketIo;

        }
    };

    return socketService;
});
