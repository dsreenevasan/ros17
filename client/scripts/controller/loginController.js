(function(){
    'use strict';
    angular
        .module('ros')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['$state', '$scope', '$interval', 'ROSService', '$cookieStore', '$window', '$route', '$rootScope'];
    function LoginController($state, $scope, interval, ROSService, $cookieStore, $window, $route, $rootScope){
        var ctrl = this;

        console.log($rootScope.current);
        ctrl.loggedIn = false;
        ctrl.showCount = true;
        ctrl.currentState = $rootScope.current;
        checkForCookies();

        $(document).ready(function () {
            $('.button-collapse').sideNav({
                    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                    draggable: true // Choose whether you can drag to open on touch screens
                }
            );
        });

        window.addEventListener('keydown', function(event){
            if(event.keyCode == 73 && event.ctrlKey && event.shiftKey){
                event.preventDefault();
            }
        });

        function checkForCookies() {
          if($cookieStore.get('userDetails')){
              ctrl.loggedIn = true;
              ctrl.userDetails = $cookieStore.get('userDetails');
              if(ctrl.currentState == 'login'){
                  Materialize.toast("Welcome Back " + $cookieStore.get('userDetails').name + "!", 3000);
              }
          }
        }

        ctrl.login = function(){
            var loginObj = {
                emailId: ctrl.email,
                password: ctrl.password
            };
            ROSService.Login(loginObj).then(function(response){
                if(response.status == 200) {
                    $cookieStore.put('userDetails', response.data);
                    console.log(JSON.stringify($cookieStore.get('userDetails')));
                    checkForCookies();
                    $state.go('main');
                    //$route.reload();
                    /*Materialize.toast("Successfully Logged in!", 3000);*/
                }
                else{
                    Materialize.toast("Invalid Username or Password", 3000);
                }
            });
        };

        ctrl.logout = function(){
            $cookieStore.put('userDetails', '');
            $state.go('login');
            ctrl.loggedIn = false;
        };

        ctrl.go = function(state){
            $state.go(state);
        }

    }

})();