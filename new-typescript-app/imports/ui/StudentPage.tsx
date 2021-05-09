import React from 'react';
import { Descriptions } from 'antd';
import { connect } from 'react-redux';

interface Student {
    username: string;
    email: string;
    class: string;
    ects: number;
    rank: number;
};


class StudentPage extends React.Component<StudentPageProps> {


    render() {
        const { students, userId } = this.props;
        const student = students && students.find((item: any) => item.userId === userId);

        return (
            <>
                {
                    student &&
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="Username">{(student as Student).username}</Descriptions.Item>
                        <Descriptions.Item label="Ects">
                            <a>{(student as Student).ects}</a>
                        </Descriptions.Item>
                        <Descriptions.Item label="Class">{(student as Student).class}</Descriptions.Item>
                        <Descriptions.Item label="Rank">{(student as Student).rank}</Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {(student as Student).email}
                        </Descriptions.Item>
                    </Descriptions >
                }
            </>

        );
    }
}

const mapStateToProps = (state: any) => {
    const { students } = state.setStudentReducer;
    const { userId } = state;

    return { students, userId };
};


type StudentPageProps = ReturnType<typeof mapStateToProps>;



export default connect(mapStateToProps)(StudentPage);