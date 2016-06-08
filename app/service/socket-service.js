angular.module('chatApp').factory('socketService',function(
    NET
) {

    var socketService = {
        socket:null,
        room:null,
        messages:[],
        connect:function(token){

            var socketIo = io.connect(NET.WS_URL+'?token='+token,{path:'/api/socket.io'});

            socketService.socket = socketIo;

        }
    };

    return socketService;
});
