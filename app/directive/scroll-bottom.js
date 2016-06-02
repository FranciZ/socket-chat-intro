angular.module('chatApp').directive('scrollBottom', function($timeout) {
    return {
        restrict: 'A',
        scope:{
            onInit:'&', // function
            onScroll:'&',
            options:'='
        },
        link: function(scope, element, attrs, fn) {

            function setupScroll(){

                element[0].scrollTop = element[0].scrollHeight;

            }

            $(element).on('scroll', function(){

                scope.onScroll();

            });

            $timeout(function(){

                setupScroll();

            }, 100);

            scope.onInit({
                update:function(){
                    setupScroll();
                },
                getCurrentScroll:function(){

                    console.log(element[0].scrollTop + element[0].clientHeight);
                    console.log(element[0].scrollHeight);

                    return element[0].scrollTop + element.outerHeight() === element[0].scrollHeight;

                }
            });

        }
    };
});
