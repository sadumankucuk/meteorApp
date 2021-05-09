import React from 'react';
import { Avatar, Tabs } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import StudentRegister from './Register/StudentRegister';
import TeacherRegister from './Register/TeacherRegister';


const { TabPane } = Tabs;

class RegisterPage extends React.Component {

    state = {
        activeTab: 1,
    }

    render() {
        return (
            <div
                className="login-form"
            >
                <Avatar size={64} icon={<UserOutlined />} className="avatar-center-register" />
                <Tabs defaultActiveKey="1" onChange={(e: string) => this.setState({ activeTab: e })} centered>
                    <TabPane tab="Student" key="1">
                        <StudentRegister />
                    </TabPane>
                    <TabPane tab="Teacher" key="2">
                        <TeacherRegister />
                    </TabPane>
                </Tabs>
            </div>

        );
    }
}

export default RegisterPage;
