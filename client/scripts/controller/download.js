(function(){
    'use strict';
    angular
        .module('ros')
        .controller('DownloadController', DownloadController);
    DownloadController.$inject = ['$state', '$scope', '$interval', 'ROSService', '$cookieStore', '$window', '$route', '$rootScope'];
    function DownloadController($state, $scope, interval, ROSService, $cookieStore, $window, $route, $rootScope){
        var ctrl = this;

        console.log("succ");
        ctrl.loggedIn = false;
        ctrl.dataLoaded = false;
        ctrl.currentState = $rootScope.current;
        checkForCookies();

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
                if((ctrl.userDetails.level == 23 && ctrl.currentState == 'ros23') ||
                    (ctrl.userDetails.level == 24 && ctrl.currentState == 'ros24') ||
                    (ctrl.userDetails.level == 25 && ctrl.currentState == 'ros25')){
                    getDownload();
                }
                else{
                    var level = 'level' + ctrl.userDetails.level;
                    $state.go(level);
                }
            }
        }

        function getDownload() {
            var obj = {
                accessToken: ctrl.userDetails.accessToken
            };

            ROSService.GetDownloadableClues(obj).then(function(response){
                console.log(JSON.stringify(response));
                if(response.status == 200){
                    $window.open(response.data.url, '_self');
                }
                else{
                    Materialize.toast("Error!");
                }
                var level = 'level' + ctrl.userDetails.level;
                $state.go(level);
            })
        }

    }

})();