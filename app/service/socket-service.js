angular.module('chatApp').factory('socketService',function() {

    var socketService = {
        socket:null,
        room:null,
        messages:[],
        connect:function(token){

            var socketIo = io.connect('http://franci.sae.proxima.si/api?token='+token);

            socketService.socket = socketIo;

        }
    };

    return socketService;
});
