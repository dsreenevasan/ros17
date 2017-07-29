(function(){
    'use strict';
    angular
        .module('ros')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['$state', '$scope', '$interval', 'ROSService', '$cookieStore', '$window', '$route', '$rootScope', 'ezfb'];
    function LoginController($state, $scope, $interval, ROSService, $cookieStore, $window, $route, $rootScope, ezfb){
        var ctrl = this;

        console.log($rootScope.current);
        ctrl.loggedIn = false;
        ctrl.showCount = true;
        ctrl.isSubmitting = false;
        ctrl.currentState = $rootScope.current;
        ctrl.showAd = false;
        checkForCookies();

        /*setTimeout(function () {
            ctrl.showAd = true;
            angular.element('#dummy').triggerHandler('click');
        }, 600000);*/

        function popAd(){
            ctrl.adInterval = $interval(function () {
                ctrl.showAd = true;
                var randomNumber = Math.floor((Math.random() * 12)+1);
                ctrl.popupImage = '#dummy' + randomNumber;
                console.log(ctrl.popupImage);
                angular.element(ctrl.popupImage).triggerHandler('click');
            }, 60000);
        }


        $(document).ready(function () {
            /*$('.button-collapse').sideNav({
                    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                    draggable: true // Choose whether you can drag to open on touch screens
                }
            );*/
            /*$('.modal').modal({
                    dismissible: true // Modal can be dismissed by clicking outside of the modal
                }
            );*/
        });

        window.addEventListener('keydown', function(event){
            if(event.keyCode == 73 && event.ctrlKey && event.shiftKey){
                event.preventDefault();
            }
        });

        /*window.addEventListener('keydown', function(event){
            if(event.keyCode == 13 && ctrl.currentState == 'login'){
                ctrl.login();
            }
        });*/

        ctrl.resetInterval = function(){
            $interval.cancel(ctrl.adInterval);
            popAd();
        };

        ctrl.clickSubmit = function (event) {
            if(event.keyCode == 13){
                ctrl.login();
            }
        };

        function checkForCookies() {
          if($cookieStore.get('userDetails')){
              ctrl.loggedIn = true;
              ctrl.userDetails = $cookieStore.get('userDetails');
              if(ctrl.currentState == 'login'){
                  Materialize.toast("Welcome Back " + $cookieStore.get('userDetails').name + "!", 3000);
              }
              var level = 'level' + ctrl.userDetails.level;
              if(ctrl.currentState == level){
                  popAd();
              }
          }
        }

        ctrl.login = function(){
            ctrl.isSubmitting = true;
            console.log(ctrl.isSubmitting);
            var loginObj = {
                emailId: ctrl.email,
                password: ctrl.password
            };
            ROSService.Login(loginObj).then(function(response){
                if(response.status == 200) {
                    $rootScope.loginObj = loginObj;
                    $cookieStore.put('userDetails', response.data);
                    $cookieStore.put('shared', 'false');
                    $cookieStore.put('ad', 1);
                    console.log(JSON.stringify($cookieStore.get('userDetails')));
                    checkForCookies();
                    var state = 'level' + ctrl.userDetails.level;
                    $state.go(state);
                    //$route.reload();
                    /*Materialize.toast("Successfully Logged in!", 3000);*/
                }
                else{
                    Materialize.toast("Invalid Username or Password", 3000);
                }
                ctrl.isSubmitting = false;
            });
            console.log(ctrl.isSubmitting);
        };

        ctrl.logout = function(){
            $cookieStore.put('userDetails', '');
            $state.go('login');
            ctrl.loggedIn = false;
        };

        ctrl.go = function(state){
            if(state == 'main'){
                state = 'level' + ctrl.userDetails.level;
            }
            $state.go(state);
        };

        ctrl.openUrl = function (link) {
            $window.open('http://' + link, '_blank');
        };

        ctrl.share = function () {
            console.log($cookieStore.get('shared'));
            if($cookieStore.get('shared') == 'false'){
                ezfb.ui(
                    {
                        method: 'feed',
                        name: 'RIDDLES OF THE SPHINX',
                        picture: 'http://res.cloudinary.com/ros/image/upload/v1486477977/share_nbrbjq.jpg',
                        link: 'http://ros.kurukshetra.org.in',
                        description: 'Hurray! I cleared Level ' + ctrl.userDetails.level + ' in Riddles of the Sphinx. Can you beat me?'
                    },
                    function (res) {
                        // res: FB.ui response
                        if(res){
                            $state.go('forum');
                            $cookieStore.put('shared', 'true');
                        }
                        else{
                            Materialize.toast("You can't view the forum without sharing in Facebook", 3000);
                        }
                        console.log(res);
                    }
                );
            }
            else{
                $state.go('forum');
            }
        };

    }

})();