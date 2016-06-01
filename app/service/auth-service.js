angular.module('chatApp').factory('authService',function(
    $http,
    $state,
    $rootScope,
    socketService
) {

    var authService = {
        loginStatus:false,
        token:null,
        account:null,
        register:function(userData){

            var promise = $http.post('http://localhost:3033/account', userData);

            promise.then(function(res){

                authService.token = res.data.token;
                authService.account = res.data.account;

                authService.loginStatus = true;
                $rootScope.loginStatus = authService.loginStatus;

                $state.go('main.chat');

            });

            return promise;

        },

        login:function(userData){

            var promise = $http.post('http://localhost:3033/login', userData);

            promise.then(function(res){

                console.log('Logged in: ',res);

                authService.token = res.data.token;
                authService.account = res.data.account;

                authService.loginStatus = true;
                $rootScope.loginStatus = authService.loginStatus;

            }, function(err){

                $state.go('login');

            });

            return promise;

        },

        logout:function(){

            $state.go('login');
            authService.loginStatus = false;
            $rootScope.loginStatus = authService.loginStatus;

        },

        isLoggedIn:function(){

            var promise = $http.get('http://localhost:3033/account/isLoggedIn', {
                headers:{
                    authorization:authService.token
                }
            });

            promise.then(function(res){

                authService.account = res.data;
                authService.loginStatus = true;

            }, function(err){

                authService.loginStatus = false;
                $state.go('login');

            });

            socketService.connect(authService.token);

            return promise;

        }

    };

    return authService;
});
