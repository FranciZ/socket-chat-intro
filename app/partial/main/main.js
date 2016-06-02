angular.module('chatApp').controller('MainCtrl',function(
    $scope,
    socketService,
    $timeout,
    roomService
){

    $scope.messages = socketService.messages;
    $scope.message = {};

    $scope.$watch('messages', function(newValue, oldValue){

        $timeout(function(){

            //mUpdateScroll();

        },0);

    }, true);

    $scope.$on('room-change',function(){

        $timeout(function(){

            mUpdateScroll();

        },0);

    });

    var mUpdateScroll;
    var mGetCurrentScroll;

    $scope.onInit = function(updateScroll, getCurrentScroll){

        mUpdateScroll = updateScroll;
        mGetCurrentScroll = getCurrentScroll;

    };

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

    $scope.onScroll = function(){

    };

    socketService.socket.on('message', function(message){

        var isScrollBottom = mGetCurrentScroll();

        socketService.socket.emit('message-seen', message);

        socketService.messages.push(message);
        $scope.messages = socketService.messages;
        $scope.$apply();

        if(isScrollBottom){

            mUpdateScroll();

        }

    });

    var room = roomService.model.list[0];

    socketService.socket.emit('join', room._id);
    socketService.room = room;
    roomService.getRoomMessages(room._id);

});
