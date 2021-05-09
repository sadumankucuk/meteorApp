import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Students } from '../models/StudentCollection';

Meteor.methods({
    'student.insert'(student) {
        Students.insert(student);
    },

    'student.remove'(stutendId) {
        check(stutendId, String);
        if (!this.setUserId) {
            throw new Meteor.Error('Not authorized.');
        }
        Students.remove(stutendId);
    },
})

Meteor.publish('students', () => {
    return Students.find();
})