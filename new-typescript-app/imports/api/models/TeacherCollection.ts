import { Mongo } from 'meteor/mongo';

export enum Title {
    INSTRUCTOR = 'Instructor',
    ASSISTANT_PROFESSOR = 'Assistant Professor',
    SENIOR_ASSISTANT_PROFESSOR = 'Senior Assistant Professor',
    ASSOCIATE_PROFESSOR = 'Associate Professor',
    SENIOR_ASSOCIATE_PROFESSOR = 'Senior Associate Professor',
    PROFESSOR = 'Professor'
}

export interface Teacher {
    _id?: string;
    username: string;
    password: string;
    title: {
        type: string,
        enum: Title,
    };
    createdAt: Date;
}

export const Teachers = new Mongo.Collection<Teacher>('teachers');
