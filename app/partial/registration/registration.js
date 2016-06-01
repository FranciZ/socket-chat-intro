angular.module('chatApp').controller('RegistrationCtrl',function(
    $scope,
    authService
){

    $scope.user = {};
    $scope.buttonText = 'Register';

    $scope.registerClick = function(){

        authService.register($scope.user);

    };

});
