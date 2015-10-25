//edit family modal template
app.controller('editFamilyCtrl', ['$scope', '$uibModal', '$log', 'ResultService', '$http', 'validService', function ($scope, $uibModal, $log, ResultService, $http, validService) {
	// sets validation from service for dom calls
	$scope.validateInput = validService.validateInput;
	//sends the adults and kids after the results have been organized
	$scope.adults = ResultService.adults;
	$scope.kids = ResultService.kids;
	$scope.family = {
		adultOne: {},
		adultTwo: {},
		emergency: {},
		children: [],
		donations: []
	};
	$scope.newChild = {};
	$scope.newDonation = {};

	$scope.animationsEnabled = true;
	$scope.open = function (size, id) {
		console.log('family call', id);
		return $http({
			method: 'GET',
			url: '../family',
			params: {id: id}
		}).then(function (response) {

			$scope.family = response.data;
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'private/editfamily.html',
				controller: 'ModalInstanceCtrl',
				size: size,
				scope: $scope,
				resolve: {
					items: function () {
						return $scope.family;
					}
				}
			});
			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		});
	};

	$scope.toggleAnimation = function () {
		$scope.animationsEnabled = !$scope.animationsEnabled;
	};

	// save family
	$scope.save = function () {
		console.log("Save submitted", $scope.family);
		//alert("Submitted");
		// if has id, then put
		if(!$scope.family.id) {
			$http({
				method: 'POST',
				url: '/family',
				data: {family: $scope.family}
			}).then(function (res) {
				console.log("Posted family, got id ", res.data);
				$scope.family.id = res.data.id;
				$scope.family.adultOne = (res.data.adultOne) ? res.data.adultOne : {};
				$scope.family.adultTwo = (res.data.adultTwo) ? res.data.adultTwo : {};
				$scope.family.emergency = (res.data.emergency) ? res.data.emergency : {};
				if($scope.family.children.length) {
					$scope.family.children = [];
				}
				$scope.family.children = (res.data.children) ? res.data.children : [];
				if($scope.family.donations.length) {
					$scope.family.donations = [];
				}
				$scope.family.donations = (res.data.donations) ? res.data.donations : [];
			});
		}else {
		// insert family - has no id
			console.log("insert family", $scope.family);
			$http({
				method: 'PUT',
				url: '/family',
				data: {family: $scope.family}
			}).then(function (res) {
				console.log("Put family, got id ", res.data);
				$scope.family.id = res.data.id;
				$scope.family.adultOne = (res.data.adultOne) ? res.data.adultOne : {};
				$scope.family.adultTwo = (res.data.adultTwo) ? res.data.adultTwo : {};
				$scope.family.emergency = (res.data.emergency) ? res.data.emergency : {};
				if($scope.family.children.length) {
					$scope.family.children = [];
				}
				$scope.family.children = (res.data.children) ? res.data.children : [];
				if($scope.family.donations.length) {
					$scope.family.donations = [];
				}
				$scope.family.donations = (res.data.donations) ? res.data.donations : [];
			});
		}
	};

	// for appending children to model before saving new family
	$scope.addChild = function () {
		console.log("child added", $scope.newChild, $scope.family.children);
		// if true, then update that index
		if($scope.editingChild) {
			$scope.family.children[$scope.editingChild] = $scope.newChild;
			$scope.editingChild = false;
		}else {
		// else push to array
			$scope.family.children.push($scope.newChild);
		}
		$scope.newChild = {};
	};

	// edit child on the add children tab of add family
	$scope.editChild = function (index) {
		// save index of child editing
		$scope.editingChild = index;
		$scope.newChild = $scope.family.children[index];
	};

	$scope.removeChild = function (index) {
		console.log("in remove child index", index, " edit ", $scope.editingChild);
		$scope.family.children.splice(index, 1);
		if(index == $scope.editingChild) {
			console.log("edit match");
			$scope.clearChild();
		}else {
			console.log("no edit match");
		}
	};

	// clears text boxes in add family->children tab
	$scope.clearChild = function () {
		console.log("in clear child");
		$scope.newChild = {
			firstName: '',
			lastName: '',
			birthdate: '',
			school: '',
			notes: ''
		};
		$scope.editingChild = false;
	};

		// adds donation to family object
		$scope.addDonation = function () {
			$scope.family.donations.push($scope.newDonation);
			$scope.newDonation = {};
		};

	//// prevent accidental backs
	//$scope.$on('$locationChangeSuccess', function( event, oldUrl ) {
	//	console.log("old url: ", oldUrl);
	//	if(/(addfamily)/.test(oldUrl)) {
	//		var answer = confirm("Are you sure you want to leave this page?");
	//		if (!answer) {
	//			event.preventDefault();
	//		}
	//	}
	//});

}]);