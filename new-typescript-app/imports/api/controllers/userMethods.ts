import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    'user.createUser'(user) {
        var userId = Accounts.createUser(user);
        return userId;
    }
})