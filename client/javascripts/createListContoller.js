app.controller('createListSearch', ['$scope', '$http', 'ContactListDataService', 'newContactListData', function ($scope, $http, ContactListDataService,newContactListData) {
    $scope.type ={};
    $scope.age={};
    $scope.zip={};


    $scope.emailList = [ ];

    $scope.searchListBtn = function () {


        //THIS WORKS  -- will search by zip
        if ($scope.type == 'zipCk') {

            ContactListDataService.makeDataCall('zip', $scope.zip.data)
                .then(function (data) {
                    $scope.emailList = data;
                    console.log($scope.emailList);
                })
        }


        //THIS WORKS - will search by age
        if ($scope.type == 'ageCk') {
            var age = ContactListDataService.makeDataCall('age', $scope.age.data);
            age.then(function (data) {
                console.log(data);
                $scope.emailList = data;
            });
        }

        //THIS WORKS --get all families if fam is true
        if ($scope.type == 'fam') {
            var fam = ContactListDataService.makeDataCall('family', '');
            fam.then(function (data) {
                $scope.emailList = data;
                console.log(data);
            });
        }

        //get all corp if corp is true
        if ($scope.type == 'corp') {
            var comp = ContactListDataService.makeDataCall('company', '');
            comp.then(function (data) {
                $scope.emailList = data;
                console.log(data);
            });
        }

        //empty the search box
       $scope.type={};
        $scope.age={};
        $scope.zip={};

    };
    $scope.populateList  = function () {
        alert('working');
        newContactListData.popList($scope.emailList)
            .then(function() {
                $(".search").hide();
                $(".endMessage").append("<h2>sent</h2>");
            });
  };

}]);


