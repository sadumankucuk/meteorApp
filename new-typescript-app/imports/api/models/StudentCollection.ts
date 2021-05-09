import { Mongo } from 'meteor/mongo';

export interface Student {
    _id?: string;
    userId: string;
    username: string;
    password: string;
    class: string;
    ects: number;
    createdAt: Date;
}

export const Students = new Mongo.Collection<Student>('students');
