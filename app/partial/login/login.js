angular.module('chatApp').controller('LoginCtrl',function(
    $scope,
    authService,
    $state
){

    $scope.user = {};
    $scope.isLoggingIn = false;
    $scope.buttonText = 'Log In';

    $scope.loginClick = function(){

        $scope.isLoggingIn = true;
        $scope.buttonText = 'Logging In';

        authService.login($scope.user)
            .then(function(res){

                $scope.buttonText = 'Logged In';
                $state.go('app.chat');

            });

    };

});
