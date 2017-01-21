(function(){
    'use strict';
    angular
        .module('ros')
        .controller('CluesController', CluesController);
    CluesController.$inject = ['$state', '$scope', '$interval', 'ROSService', '$cookieStore', '$window', '$route', '$rootScope'];
    function CluesController($state, $scope, interval, ROSService, $cookieStore, $window, $route, $rootScope){
        var ctrl = this;

        ctrl.loggedIn = false;
        ctrl.dataLoaded = false;
        checkForCookies();
        getClues();

        window.addEventListener('keydown', function(event){
            if(event.keyCode == 73 && event.ctrlKey && event.shiftKey){
                event.preventDefault();
            }
        });

        function checkForCookies() {
            if($cookieStore.get('userDetails')){
                ctrl.loggedIn = true;
                ctrl.userDetails = $cookieStore.get('userDetails');
                //Materialize.toast("Logged In", 3000);
            }
        }

        function getClues() {
            var obj = {
                accessToken: ctrl.userDetails.accessToken
            };

            ROSService.GetClues(obj).then(function(response){
                if(response.status == 200){
                    ctrl.clues = response.data;
                    console.log(JSON.stringify(ctrl.clues));
                    ctrl.displayQuestion = ctrl.clues.length-1;
                    ctrl.dataLoaded = true;
                }
                else{
                    Materialize.toast("Error! Kindly Check your Internet Connection!", 3000);
                }
            })
        }

        ctrl.seek = function(operation){
            if(operation == 1){
                if(ctrl.displayQuestion < ctrl.clues.length-1){
                    ctrl.displayQuestion += 1;
                }
            }
            else if(operation == 0){
                if(ctrl.displayQuestion > 0){
                    ctrl.displayQuestion -= 1;
                }
            }
        }

    }

})();