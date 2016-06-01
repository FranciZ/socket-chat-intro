angular.module('chatApp').factory('socketService',function() {

    var socketService = {
        socket:null,
        room:null,
        messages:[],
        connect:function(token){

            var socketIo = io.connect('http://localhost:3033?token='+token);

            socketService.socket = socketIo;

        }
    };

    return socketService;
});
