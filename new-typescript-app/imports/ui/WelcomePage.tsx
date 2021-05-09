import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useTracker } from 'meteor/react-meteor-data';
import { Students } from '../api/models/StudentCollection';
import { Teachers } from '../api/models/TeacherCollection';
import { PageHeader, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import TeacherPage from './TeacherPage';
import StudentPage from './StudentPage';
import { setStudent } from './redux/actions/student.actions';

type Teacher = {
    username: string;
    password: string;
    email: string;
    title: string;
};

const WelcomePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state: any) => state.userId);

    const { student, students, username, teacher } = useTracker(() => {

        const noDataAvailable = { students: [], student: {}, username: "", teacher: {} };
        if (!Meteor.user() || !userId) {
            return noDataAvailable;
        }
        const handler = Meteor.subscribe('students');
        const handlerTeacher = Meteor.subscribe('teachers');


        const user = Meteor.user();
        let username;
        if (user) username = user.username;

        if (!handler.ready() || !handlerTeacher.ready()) {
            return { ...noDataAvailable };
        }
        const student = Students.findOne({ userId: userId });
        const teacher = Teachers.findOne({ userId: userId });

        const students = Students.find().fetch();
        dispatch(setStudent(students));
        if (student) {
            return { student, students: [], username, teacher: {} };
        }
        return { student, students, username, teacher };
    }, [])


    return (

        <div className="site-page-header-ghost-wrapper">
            <PageHeader
                ghost={false}
                title={username}
                subTitle={student ? "student" : (teacher as Teacher).title}
                extra={[

                    <Button key="1" icon={<LogoutOutlined />} onClick={() => {
                        Meteor.logout();
                        history.push('/login');
                    }}>
                        Logout
                    </Button>,
                ]}
            >
                {
                    student && <StudentPage />
                }
                {
                    students.length !== 0 && <TeacherPage students={students} />
                }


            </PageHeader>
        </div>
    )
}

export default WelcomePage;
