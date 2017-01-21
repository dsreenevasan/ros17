(function(){
    'use strict';
    angular
        .module('ros')
        .controller('ROSController', ROSController);
    ROSController.$inject = ['$state', '$scope', '$interval', 'ROSService', '$cookieStore', '$window', '$route', '$rootScope'];
    function ROSController($state, $scope, interval, ROSService, $cookieStore, $window, $route, $rootScope){
        var ctrl = this;

        ctrl.loggedIn = false;
        ctrl.dataLoaded = false;
        checkForCookies();
        downloadFile();

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

        function downloadFile() {
            var data = "Some Clue";
            var file = new Blob([data], { type: 'text/plain;charset=utf-8' });
            saveAs(file, 'clue.txt');
            $state.go('main');
        }

    }

})();