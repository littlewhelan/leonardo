//service for ajax calls to constant contact


app.service('newContactListData', ['ContactListDataService', '$http',
    function (ContactListDataService, $http) {

    this.newContactList = [];
    this.listNum = "0";

    this.postList = function (name) {
        console.log("did the name make it to the service? " + name );
        return $http.post('/newContactList', {name: name}).then(function (response) {
            console.log(response.data);
            listNum = response.data;
            console.log("Id? ", listNum);

        }, function(data){
            console.log(data); //error
        });
    };

    this.importDataArray = [
        {
            "email_addresses": [
                "user1@example.com"
            ],
            "first_name": "John",
            "last_name": "Smith",
            "company_name": "Company X",
            "addresses": [{
                city: "anytown"
            }]
        },
        {
            "email_addresses": [
                "user2@example.com"
            ],
            "first_name": "Jane",
            "last_name": "Smithy",
            "company_name": "Company Y",
            "addresses": [{
                city: "sometown"
            }]
        }
    ];


    this.popList = function () {
        getChecked();
        $http.post('/populateContactList.js', importDataArray, listNum).then(function (data, status, headers, config) {
            console.log(data);
        });
        console.log(options);

    };

    //get all the checked elements and stuff them in an array
    var getChecked = function () {
            $(":checked.type-element").each(
                function () {
                    if (id == ContactListDataService.results.id) {
                        var contactObject =
                        {
                            "email_addresses": [
                                $(this).email
                            ],
                            "first_name": $(this).firstName,
                            "last_name": $(this).lastName,
                            "company_name": $(this).company,
                            "addresses": [{
                                city: $(this).city
                            }]
                        };
                        importDataArray.push(contactObject);
                    }

                }
            );
        }
}]);