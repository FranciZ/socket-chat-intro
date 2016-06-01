angular.module('chatApp', [
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'btford.socket-io'
]);

angular.module('chatApp').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app', {
        abstract:true,
        views:{
            'sidebar':{
                templateUrl: 'partial/sidebar/sidebar.html',
                controller:'SidebarCtrl'
            },
            'header':{
                templateUrl: 'partial/header/header.html',
                controller:'HeaderCtrl'
            }
        },
        resolve:{
            isLoggedIn:function(authService){

                return authService.isLoggedIn();

            }
        }
    });

    $stateProvider.state('app.chat', {
        url:'/chat',
        views:{
            'main@':{
                templateUrl: 'partial/main/main.html',
                controller:'MainCtrl',
                resolve:{
                    rooms: function(roomService){

                        return roomService.getAll();

                    }
                }
            }
        }
    });

    $stateProvider.state('login', {
        url: '/login',
        views:{
            login:{
                templateUrl: 'partial/login/login.html',
                controller:'LoginCtrl'
            }
        }
    });
    $stateProvider.state('registration', {
        url: '/registration',
        views:{
            registration:{
                templateUrl: 'partial/registration/registration.html',
                controller:'RegistrationCtrl'
            }
        }
    });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/login');

});

angular.module('chatApp').run(function(
    $rootScope,
    socketService,
    authService) {

    $rootScope.loginStatus = authService.loginStatus;

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
