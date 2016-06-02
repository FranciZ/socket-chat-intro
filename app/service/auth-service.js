angular.module('chatApp').factory('authService',function(
    $http,
    $state,
    $rootScope,
    socketService,
    $localForage
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

                return authService.saveToken(authService.token);

            });

            return promise;

        },

        login:function(userData){

            return $http.post('http://localhost:3033/login', userData)
                .then(function(res){

                console.log('Logged in: ',res);

                authService.token = res.data.token;
                authService.account = res.data.account;

                authService.loginStatus = true;
                $rootScope.loginStatus = authService.loginStatus;

                return authService.saveToken(authService.token);

            }, function(err){

                $state.go('login');

            });

        },

        logout:function(){

            var promise = $http.post('http://localhost:3033/logout', {}, {
                headers:{
                    authorization:authService.token
                }
            });

            promise.then(function(res){

                console.log(res);

            });

            $state.go('login');

            $localForage.removeItem('token');

            authService.loginStatus = false;
            $rootScope.loginStatus = authService.loginStatus;

        },

        isLoggedIn:function(){

            return authService.getToken()
                .then(function(){

                    var promise = $http.get('http://localhost:3033/account/isLoggedIn', {
                        headers:{
                            authorization:authService.token
                        }
                    });

                    promise.then(function(res){

                        authService.account = res.data;
                        authService.loginStatus = true;
                        $rootScope.loginStatus = authService.loginStatus;

                    }, function(err){

                        authService.loginStatus = false;
                        $state.go('login');

                    });

                    return promise;

                });

        },
        /**
         *
         * @param {String} token
         * @returns {Promise.<TResult>|*|Promise}
         */
        saveToken:function(token){

            return $localForage.setItem('token', token);

        },
        getToken:function(){

            return $localForage.getItem('token')
                .then(function(token){

                    authService.token = token;

                });

        }

    };

    return authService;
});
