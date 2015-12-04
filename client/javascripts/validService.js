app.service('validService', [function () {

    var validateInput = function (type, id) {
        //console.log("validateInput()");
        // stores the form being called on
        var pattern;
        var $obj = (id) ? $('#'+ id) : false;
        //console.log("object is ", $obj, type, id);
        switch (type) {
            case "name":
            case "city":
            case "state":
                // allows and alpha chars, as well as white space and a few extra chars
                pattern = /^[a-zA-z\s,.'-]{0,28}/;
                break;
            case "corpName":
                pattern = /^[a-zA-Z0-9\s,.?@!#'~*_;+-]{0,75}/;
                break;
            case "address":
                pattern = /^[a-zA-Z0-9\s,.?@!#'~*_;+:()%&-]{0,50}/;
                break;
            case "zip":
                pattern = /^[0-9]{5}$/;
                break;
            case "phone":
                pattern = /^([(][0-9]{3}[)]|[0-9]{3})[\s\-.]?[0-9]{3}[\s\-.]?[0-9]{4}$/;
                break;
            case "email":
                pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                break;
            case "notes":
                pattern = /^[a-zA-Z0-9\s,.?@!#'~*_;+:()%&<>\[\]{}\-="|`\\\/]{0,250}/;
                break;
            case "ext":
                pattern = /^[a-zA-Z0-9\s:-]{0,15}$/;
                break;
            case "date":
                //pattern = /^20[0-9]{2}[-](0[1-9]|1[0-2])[-](0[1-9]|[1-2][0-9]|3[01])$/;
                pattern = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-2][0-9]|3[01])\/20[0-9]{2}$/;
                break;
            case "birthdate":
                pattern = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-2][0-9]|3[01])\/((199[0-9]|20)[0-9]{2})$/;
                //pattern = /^(199[0-9]|20[0-9]{2})[-](0[1-9]|1[0-2])[-](0[1-9]|[1-2][0-9]|3[01])$/;
                break;
            case "amount":
                pattern = /^([\$]?[\d]+([.][\d]{2})?){1,10}$/;
                break;
			case "username":
				pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d_\-]{8,20}$/;
				break;
			case "password":
				//pattern = /^([a-z]+[A-Z]+[0-9]+[-_]?){8,20}$/;
				pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
				break;
			case "search":
				pattern = /^[a-zA-Z0-9\s,.?@!#'~*_;+-]{0,75}$/;
				break;
			case "age":
				pattern = /^[0-9]{1,2}$/;
				break;
            default:
                //console.log("invalid class search");
                return false;
                break;
        }

        // if required or trimmed length is not 0, then validate info
        if($obj.attr('required') || $obj.val()) {
            // checks if value matches regex for field type
            if(!pattern.test($obj.val().trim()) || $obj.val().trim().length == 0 && $obj.attr('required')) {
                // if fails, adds invalid class (highlighting), changes placeholder to what should be entered
                $obj.addClass('invalid').attr('placeholder', $obj.data('invalid')).val('');
                //console.log(type, ' failed test', pattern);
				return false;
            } else {
                // if passes, removes invalid class, resets placeholder to default
                $obj.removeClass('invalid').attr('placeholder', $obj.data('placeholder'));
                //console.log(type, ' passed test', pattern);
				return true;
            }
        }
    };

	var validateForm = function (forms) {
		var pass = true;
		forms.forEach(function (v, i, a) {
			$('#'+ v +' .js-validate').each(function () {
				if(validateInput($(this).data('type'), $(this).attr('id')) == false) {
					//console.log($(this).attr('id') +" failed the test "+ $(this).data('type') +" entered info: "+ $(this).val());
					pass = false;
				}
			});
		});
		return pass;
	};

    return {
        validateInput: validateInput,
		validateForm: validateForm
    };
}]);