var app = angular.module('flapperNews', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        'use strict';
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl'
        }).state('posts', {
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl'
        });
        
        $urlRouterProvider.otherwise('home');
    }]);

app.factory('posts', [function () {
    'use strict';
    var obj = {
        posts: []
    };
    return obj;
}]);

app.controller('MainCtrl', ['$scope', 'posts', function ($scope, posts) {
    'use strict';
    $scope.title = '';
    $scope.link = '';
    $scope.posts = posts.posts;
    
    $scope.addPost = function () {
        if ($scope.title === '') {
            return false;
        }
        $scope.posts.push({
            title: $scope.title,
            upvotes: 0,
            link: $scope.link,
            comments: [
                {author: 'Joe', body: 'Cool post!', upvotes: 0},
                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
            ]
            
        });
        $scope.title = '';
        $scope.link = '';
    };
    
    $scope.incrementUpvotes = function (post) {
        post.upvotes += 1;
    };
        
}]).controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function ($scope, $stateParams, posts) {
    'use strict';
    $scope.posts = posts.posts[$stateParams.id];
    $scope.addComment = function () {
        if ($scope.body === '') {
            return false;
        }
        $scope.posts.comments.push({
            author: 'User',
            body: $scope.body,
            upvotes: 0
        });
        $scope.body = '';
    };
    $scope.incrementUpvotes = function (comment) {
        comment.upvotes += 1;
    };
}]);