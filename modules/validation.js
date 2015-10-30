module.exports = {
		name:  /^[a-zA-z\s,.'-]{0,20}$/,
		city:  /^[a-zA-z\s,.'-]{0,20}$/,
		state: /^[a-zA-z\s,.'-]{0,20}$/,
		corpName: /^[a-zA-Z0-9\s,.?@!#'~*_;+-]{0,75}$/,
		address: /^[a-zA-Z0-9\s,.?@!#'~*_;+:()%&-]{0,50}$/,
		zip: /^[0-9]{5}$/,
		phone: /^(([(][0-9]{3}[)]|[0-9]{3})[\s\-.]?[0-9]{3}[\s\-.]?[0-9]{4}|[0-9]{7})$/,
		email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		notes: /^[a-zA-Z0-9\s,.?@!#'~*_;+:()%&<>\[\]{}\-=|`\\\/]{0,250}$/,
		ext: /^[a-zA-Z0-9\s:-]{0,15}$/,
		date: /^20[0-9]{2}[-](0[1-9]|1[0-2])[-](0[1-9]|[1-2][0-9]|3[01])$/,
		birthdate: /^(199[0-9]|20[0-9]{2})[-](0[1-9]|1[0-2])[-](0[1-9]|[1-2][0-9]|3[01])$/,
		amount: /^([\$]?[\d]+([.][\d]{2})?){1,10}$/,
		username: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9-_+.]{8,20}$/,
		password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9-_+.]{8,20}$/,
		mongo: /^[a-fA-Z\d]{24}$/,
		int: /^[0-9]+$/,
		search: /^[a-zA-Z0-9\s,.?@!#'~*_;+-]{0,75}$/,
		listTypes: /^(company|family|zip|age)$/,
		/* zip code or age: */
		listSearch: /^([0-9]{5}|[0-9]{1,2})$/
};
