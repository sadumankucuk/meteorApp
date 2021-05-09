import { Meteor } from 'meteor/meteor';

import '/imports/api/controllers/userMethods';
import '/imports/api/controllers/studentMethods';
import '/imports/api/controllers/teacherMethods';


Meteor.users.allow({
    remove: function () {
        return true;
    }
})