import React from 'react';
import { Meteor } from 'meteor/meteor';
import { RouteComponentProps, withRouter } from 'react-router';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';


type Student = {
    username: string;
    password: string;
    email: string;
    class: string;
    ects: number;
};


class StudentRegister extends React.Component<RouteComponentProps, {}> {
    state = {
        isError: false,
        errorMessage: '',
    }

    onFinish = (values: Student) => {
        const { username, password } = values;
        Meteor.call('user.createUser', { username, password }, (err: any, userId: string) => {
            if (err) {
                this.setState({ isError: true, errorMessage: 'Username already exists' });
            } else if (userId) {
                this.setState({ isError: false });
                Meteor.call('student.insert', { ...values, ects: 0, userId }, (err: any) => {
                    if (err) {
                        this.setState({ isError: true, errorMessage: 'Something went wrong' });
                    } else
                        this.props.history.push('/login');
                })
            }
        });
    };


    render() {

        return (
            <Form
                onFinish={this.onFinish}
            >
                {
                    this.state.isError &&
                    <Form.Item>
                        <div>
                            {this.state.isError && <Alert message={this.state.errorMessage}
                                type="error" />}
                        </div>
                    </Form.Item>
                }
                <Form.Item>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="class"
                        rules={[{ required: true, message: 'Please input your Class!' }]}
                    >
                        <Input placeholder="Class" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Register
                                </Button>
                        {' '} Have you a account? <a href="/login">login</a>
                    </Form.Item>
                </Form.Item>
            </Form>

        );
    }
}

export default withRouter(StudentRegister);
