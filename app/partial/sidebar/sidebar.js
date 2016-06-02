/* global alert */

angular.module('chatApp').controller('SidebarCtrl',function(
    $scope,
    $rootScope,
    roomService,
    socketService
){

    $scope.selectedRoom = socketService.room;
    $scope.room = {};
    $scope.rooms = roomService.model.list;

    $scope.saveClick = function(){

        $scope.createRoom = !$scope.createRoom;

        if(!$scope.createRoom){
            console.log($scope.room.name);
            roomService.create($scope.room)
                .catch(function(err){

                    console.log(err);
                    alert(err.data);

                });
        }

    };

    $scope.joinClick = function(room){

        socketService.room = room;
        $scope.selectedRoom = socketService.room;
        socketService.socket.emit('join', room._id);

        socketService.messages.length = 0;

        roomService.getRoomMessages(room._id)
            .then(function(res){

                $rootScope.$broadcast('room-change');

            });

    };



    $scope.deleteClick = function(roomId){

        roomService.removeRoom(roomId);

    };

    var room = roomService.model.list[0];

    $scope.selectedRoom = room;

});
