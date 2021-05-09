import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';
import { Teachers } from '../models/TeacherCollection';

Meteor.methods({
    'teacher.insert'(teacher) {
        Teachers.insert(teacher);
    }
})

Meteor.publish('teachers', () => {
    return Teachers.find();
})