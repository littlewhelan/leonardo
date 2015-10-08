var mongoose = require('mongoose')
    , bcrypt = require('bcrypt')
    , jsonwebtoken = require('jsonwebtoken')
    , SALT_WORK_FACTOR = 12;

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true }
});


UserSchema.pre('save', function (next){
    var user = this;
    console.log('saving user!');
    //only hash the password if it has been modified (or is new)
    if(!user.isModified('password'))return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the clear-text password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        return callback(null, isMatch);
    });
};

UserSchema.statics.getAuthenticated = function (user, callback) {
    console.log('getAuthenticated', user);
    this.findOne({username: user.username}, function (err, doc) {
        if (err) {
            console.log(err);
            return callback(err);
        }
        // make sure the user exists
        else if (!doc) {
            console.log('No user found,');
            return callback(new Error('Invalid username or password.', 401), null);
        }
        else {
            // test for a matching password
            doc.comparePassword(user.password, function (err, isMatch) {
                if (err) {
                    console.log(err);
                    return callback(err);
                }

                // check if the password was a match
                if (isMatch) {
                    var user = {
                        username: doc.username
                    };

                    // return the jwt
                    var token = jsonwebtoken.sign(user, 'supersecret', {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    return callback(null, token, user);
                }
                else {
                    return callback(new Error('Invalid username or password.'), null);

                }
            });
        }
    });
};
UserSchema.statics.Create = function (user, callback) {
    // find a user in Mongo with provided username
    this.findOne({'username': user.username}, function (err, doc) {
        console.log('findOne');
        // In case of any error return
        if (err) {
            return callback(err);
        }
        // already exists
        if (doc) {
            return callback(new Error('Username Already Exists'), null);
        } else {

            if (user.password != user.confirm) {
                return callback(new Error('Passwords do not match.'), null);
            }

            // if there is no user with that username
            // create the user
            console.log('create user');
            var User =  mongoose.model('User', UserSchema);
            var newUser = new User({
                password: user.password,
                username: user.username
            });

            // save the user
            newUser.save(function (err) {
                // In case of any error, return using the done method
                if (err) {
                    return callback(err);
                }
                // User Registration succesful
                console.log('success!')
                return callback(null, newUser);
            });
        }
    });
};

module.exports = mongoose.model('User', UserSchema);