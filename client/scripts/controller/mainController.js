(function(){
    'use strict';
    angular
        .module('ros')
        .controller('MainController', MainController);
    MainController.$inject = ['$state', '$scope', '$interval', 'ROSService', '$cookieStore', '$window', '$route', '$rootScope'];
    function MainController($state, $scope, interval, ROSService, $cookieStore, $window, $route, $rootScope){
        var ctrl = this;

        ctrl.loggedIn = false;
        ctrl.dataLoaded = false;
        
        checkForCookies();
        trackUserLevel();

        window.addEventListener('keydown', function(event){
            if(event.keyCode == 73 && event.ctrlKey && event.shiftKey){
                event.preventDefault();
            }
        });

     
        function checkForCookies() {
            if($cookieStore.get('userDetails')){
                ctrl.userDetails = $cookieStore.get('userDetails');
                ctrl.loggedIn = true;
                //Materialize.toast("Logged In", 3000);
            }
            else{
                $state.go('login');
            }
        }

        function trackUserLevel(){
            ctrl.answer = undefined;
            var obj = {
                accessToken: ctrl.userDetails.accessToken
            };

            ROSService.TrackUser(obj).then(function(response){
                if(response.status == 200){
                    ctrl.levels = response.data;
                    console.log(JSON.stringify(ctrl.levels.url[0]));
                    ctrl.displayQuestion = ctrl.levels.url.length-1;
                    ctrl.dataLoaded = true;
                }
                else{
                    Materialize.toast("Error! Check your internet Connection", 3000);
                }
            });
        }

        ctrl.submit = function () {
            var obj = {
                accessToken: ctrl.userDetails.accessToken,
                answer: ctrl.answer
            };
            
            ROSService.CheckAnswer(obj).then(function (response) {
                console.log(JSON.stringify(response));
                if(response.status == 200){
                    Materialize.toast("Hurray! You got the Right Answer", 3000);
                    trackUserLevel();
                }
                else if(response.status == 401){
                    Materialize.toast("Oops! Incorrect Answer", 3000);
                }
                else if(response.status == 400){
                    Materialize.toast("You already Completed this level", 3000);
                }
                else {
                   /* Materialize.toast("Error! Check Your Internet Connection", 3000);*/
                    Materialize.toast("Oops! Incorrect Answer", 3000);
                }
            })
        };
        
        ctrl.seek = function(operation){
            if(operation == 1){
                if(ctrl.displayQuestion < ctrl.levels.url.length-1){
                    ctrl.displayQuestion += 1;
                }
            }
            else if(operation == 0){
                if(ctrl.displayQuestion > 0){
                    ctrl.displayQuestion -= 1;
                }
            }
        };

    }

})();