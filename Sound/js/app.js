(function() {
    var app = angular.module('SoundCloud', [])
        .factory('serviceCloud', ['$http', function($http) {
            var getResult = function(topic, client) {
                return $http.get('https://api.soundcloud.com/tracks?q=' + topic + '&client_id=' + client + '&limit=10')
                    .then(function(response) {
                        return response.data;
                    });
            }
            return {
                getResult: getResult
            };
        }])
        .controller('SoundCloudCtrl', ['$scope', 'serviceCloud', function($scope, serviceCloud) {
            $scope.respuesta = [];
            $scope.wAudio = new Audio();
            $scope.linkTracks = 'https://api.soundcloud.com/tracks/'
            $scope.client_id = {
                'keys': [{
                    'id': 'ae1c0d2a28b3eae3bd0d11eb9e1704a4'
                }, {
                    'id': '02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea'
                }]
            };
            $scope.consumer_key = "?consumer_key=";
            $scope.ids_src = $scope.client_id.keys[Math.floor(Math.random() * $scope.client_id.keys.length)]

            $scope.mostrarResultado = function(data) {
                $scope.respuesta = data;
            }
            $scope.search = function(topic) {
                if (topic != undefined) {
                    serviceCloud
                        .getResult(topic, $scope.ids_src.id)
                        .then($scope.mostrarResultado)
                };
            };
            $scope.loadAudio = function(id_ta) {
                $scope.wAudio.src = $scope.linkTracks + id_ta + '/stream' + $scope.consumer_key + $scope.ids_src.id;
                $scope.wAudio.play();
            };
            $scope.playAudio = function() {
                $scope.wAudio.play();
            };
            $scope.pauseAudio = function() {
                $scope.wAudio.pause();
            };
            $scope.stopAudio = function() {
                // $scope.wAudio 
            };
        }]);

})();
