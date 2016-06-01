angular.module('chatApp').controller('HeaderCtrl',function(
    $scope,
    authService
){

    $scope.account = authService.account;

    $scope.logoutClick = function(){

        authService.logout();

    };

});
