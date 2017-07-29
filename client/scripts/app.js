(function(){
    /*'use strict';*/

    var stateNames = ['level0', 'level9', 'level10', 'level11', 'level12', 'level13', 'level14', 'level15', 'level16', 'level17', 'level18', 'level19', 'level20',
                        'level21', 'level22', 'level23', 'level24', 'level25', 'surprise1', 'surprise2', 'surprise3'];

    var states = [
        {
            name: 'header',
            state:
            {
                url:'/header',
                templateUrl: 'views/header.html',
                data: {
                    text: "header",
                    visible: false
                }
            }
        },
        {
            name: 'login',
            state:
            {
                url:'/login',
                templateUrl: 'views/login.html',
                data: {
                    text: "Login",
                    visible: false
                }
            }
        },
        {
            name: 'main',
            state:
            {
                url:'/main',
                templateUrl: 'views/main.html',
                data: {
                    text: "Riddles Of Sphinx",
                    visible: false
                }
            }
        },
        {
            name: 'hallOfFame',
            state:
            {
                url:'/hallOfFame',
                templateUrl: 'views/leaderBoard.html',
                data: {
                    text: "Hall Of Fame",
                    visible: false
                }
            }
        },
        {
            name: 'clues',
            state:
            {
                url:'/clues',
                templateUrl: 'views/clues.html',
                data: {
                    text: "Clues",
                    visible: false
                }
            }
        },
        {
            name: 'rules',
            state:
            {
                url:'/rules',
                templateUrl: 'views/rules.html',
                data: {
                    text: "Rules",
                    visible: false
                }
            }
        },
        {
            name: 'contact',
            state:
            {
                url:'/contact',
                templateUrl: 'views/announcements.html',
                data: {
                    text: "Contact",
                    visible: false
                }
            }
        },
        {
            name: 'forum',
            state:
            {
                url:'/forum',
                templateUrl: 'views/forum.html',
                data: {
                    text: "Forum",
                    visible: false
                }
            }
        },
        {
            name: 'howToPlay',
            state:
            {
                url:'/howToPlay',
                templateUrl: 'views/howToPlay.html',
                data: {
                    text: "How To Play",
                    visible: false
                }
            }
        },
        {
            name: 'ros',
            state:
            {
                url:'/level23.txt',
                templateUrl: 'views/level23bin.html',
                data: {
                    text: "ROS",
                    visible: false
                }
            }
        },
        {
            name: 'level1',
            state:
            {
                url:'/level1',
                templateUrl: 'views/level1.html',
                data: {
                    text: "level1",
                    visible: false
                }
            }
        },
        {
            name: 'level2',
            state:
            {
                url:'/level2',
                templateUrl: 'views/level2.html',
                data: {
                    text: "level2",
                    visible: false
                }
            }
        },
        {
            name: 'level3',
            state:
            {
                url:'/level3',
                templateUrl: 'views/level3.html',
                data: {
                    text: "level3",
                    visible: false
                }
            }
        },
        {
            name: 'level4',
            state:
            {
                url:'/level4',
                templateUrl: 'views/level4.html',
                data: {
                    text: "level4",
                    visible: false
                }
            }
        },
        {
            name: 'level5',
            state:
            {
                url:'/level5',
                templateUrl: 'views/level5.html',
                data: {
                    text: "level5",
                    visible: false
                }
            }
        },
        {
            name: 'level6',
            state:
            {
                url:'/level6',
                templateUrl: 'views/level6.html',
                data: {
                    text: "level6",
                    visible: false
                }
            }
        },
        {
            name: 'level7',
            state:
            {
                url:'/level7',
                templateUrl: 'views/level7.html',
                data: {
                    text: "level7",
                    visible: false
                }
            }
        },
        {
            name: 'level8',
            state:
            {
                url:'/level8',
                templateUrl: 'views/level8.html',
                data: {
                    text: "level8",
                    visible: false
                }
            }
        },
        {
            name: 'completed',
            state:
            {
                url:'/completed',
                templateUrl: 'views/completed.html',
                data: {
                    text: "completed",
                    visible: false
                }
            }
        },
        {
            name: 'ros24',
            state:
            {
                url:'/level24.txt',
                templateUrl: 'views/level24txt.html',
                data: {
                    text: "level24.txt",
                    visible: false
                }
            }
        },
        {
            name: 'ros23',
            state:
            {
                url:'/level23.bin',
                templateUrl: 'views/level23bin.html',
                data: {
                    text: "level24.txt",
                    visible: false
                }
            }
        },
        {
            name: 'ros25',
            state:
            {
                url:'/level25.zip',
                templateUrl: 'views/level25zip.html',
                data: {
                    text: "level24.txt",
                    visible: false
                }
            }
        }

    ];

    angular.forEach(stateNames, function(value, key){
        var obj = {
            name: value,
            state: {
                url : '/' + value,
                templateUrl : 'views/' + value + '.html',
                data: {
                    text: value,
                    visible: false
                }
            }
        };
        states.push(obj);
    });

var app = angular.module('ros', [
        'ui.router',
        'ui.materialize',
        'ngCookies',
        'ngRoute',
        'ezfb'
    ])

    .run(
        function($cookieStore, $location, $rootScope, $state){
            $rootScope.$on('$locationChangeStart', function(event, next, current, fromState, toState){
                /*console.log("at location change");
                console.log("current - " + current);
                console.log("next - " + next);*/
                var authUrl = [
                                "http://localhost:8080/#",
                                "http://localhost:8080",
                                "http://localhost:8081/#",
                                "http://localhost:8081",
                                "http://ros.kurukshetra.org.in/#",
                                "http://ros.kurukshetra.org.in",
                                "http://vr.cegtechforum.com/#",
                                "http://vr.cegtechforum.com"
                ];
                var url = "";
                var index = -1, itr;
                for(itr=0; itr < authUrl.length; itr++){
                    index = next.indexOf(authUrl[itr]);
                    if(index != -1){
                        url = authUrl[itr];
                        break;
                    }
                }
               /* console.log("url - " + url);*/
                var currentUrl = current.replace(url, "");
                var nextUrl = next.replace(url, "");
                console.log("CurrentUrl - " + currentUrl);
                console.log("nextUrl - " + nextUrl);
                if ($cookieStore.get('userDetails')) {
                    var userDetails = $cookieStore.get('userDetails');
                    if(nextUrl != '/login'){
                        if(currentUrl == '/') {
                            var path = 'level' + userDetails.level;
                            $location.path(path);
                        }
                        else if(nextUrl == '/forum' && ($cookieStore.get('shared') == 'true')){
                            console.log("CurrentUrl - " + currentUrl);
                            $location.path(currentUrl);
                        }
                        else{
                            console.log('1');
                            $location.path(nextUrl);
                        }
                    }
                    else if(currentUrl != '/'){
                        console.log('2');
                        $location.path(currentUrl);
                    }
                    else{
                        console.log('3');
                        $location.path('/login');
                    }
                }
                else {
                    $location.path('/login');
                }
            });

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
                /*console.log("toState" + toState.name);
                 console.log("FromState" + fromState.name);*/
                $rootScope.toState = toState.name;
                $rootScope.current = toState.name;
                //$rootScope.loginObj = {};
                /*console.log($rootScope.fromState, $rootScope.toState);*/
                /*if($rootScope.toState != $rootScope.fromState){
                    $rootScope.fromState = angular.copy($rootScope.toState);
                    $state.go('login');
                }*/
            });
        }
    )

    .config(function($stateProvider, $urlRouterProvider, ezfbProvider) {
        $urlRouterProvider.otherwise('/level1');

        app.stateProvider = $stateProvider;
        angular.forEach(states, function(state) {
            $stateProvider.state(state.name, state.state);
        });

        ezfbProvider.setInitParams({
            appId: '1528474110509931'
        });
    });

})();