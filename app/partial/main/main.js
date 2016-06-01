angular.module('chatApp').controller('MainCtrl',function(
    $scope,
    socketService,
    $timeout,
    roomService
){

    $scope.messages = socketService.messages;
    $scope.message = {};

    $timeout(function(){

        $('.messages-scroll-container')[0].scrollTop = $('.messages-scroll-container')[0].scrollHeight;

    }, 100);

    
    $scope.onKeyUp = function(event){

        if(event.keyCode === 13){

            var message = {
                content:'neki',
                room:'General'
            };

            $scope.message.room = socketService.room._id;

            socketService.socket.emit('message', $scope.message);
            $scope.message.content = '';

        }

    };

    socketService.socket.on('message', function(message){

        socketService.messages.push(message);
        $scope.messages = socketService.messages;
        $scope.$apply();

    });

    var room = roomService.model.list[0];

    socketService.socket.emit('join', room._id);
    socketService.room = room;
    roomService.getRoomMessages(room._id);

});
