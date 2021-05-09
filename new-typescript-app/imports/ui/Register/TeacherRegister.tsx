import React from 'react';
import { Meteor } from 'meteor/meteor';
import { RouteComponentProps, withRouter } from 'react-router';
import { Form, Input, Button, Select, Alert } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const { Option } = Select;

type Teacher = {
    username: string;
    password: string;
    email: string;
    title: string;
};


class TeacherRegister extends React.Component<RouteComponentProps, {}> {

    state = {
        isError: false,
        errorMessage: '',
        titles: [
            { value: "Instructor", name: "Instructor" },
            { value: "Assistant Professor", name: "Assistant Professor" },
            { value: "Senior Assistant Professor", name: "Senior Assistant Professor" },
            { value: "Associate Professor", name: "Associate Professor" },
            { value: "Senior Associate Professor", name: "Senior Associate Professor" },
            { value: "Professor", name: "Professor" },
        ]
    }


    onFinish = (values: Teacher) => {
        const { username, password } = values;
        Meteor.call('user.createUser', { username, password }, (err: any, userId: string) => {
            if (err) {
                this.setState({ isError: true, errorMessage: 'Username already exists' });

            } else if (userId) {
                this.setState({ isError: false });
                Meteor.call('teacher.insert', { ...values, userId }, (err: any) => {
                    if (err) {
                        this.setState({ isError: true, errorMessage: 'Something went wrong' });
                    } else
                        this.props.history.push('/login');
                })
            }
        });
    };


    render() {
        const { titles } = this.state;

        return (
            <Form
                onFinish={this.onFinish}
            >
                <Form.Item>
                    {
                        this.state.isError &&
                        <Form.Item>
                            <div>
                                {this.state.isError && <Alert message={this.state.errorMessage}
                                    type="error" />}
                            </div>
                        </Form.Item>
                    }

                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Please input your Title!' }]}
                    >
                        <Select placeholder="Select Title...">
                            {titles.map(title => (
                                <Option value={title.value} key={title.value}>{title.name}</Option>
                            ))}
                        </Select>
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
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                             </Button>
                    {' '} Have you a account? <a href="/login">login</a>
                </Form.Item>
            </Form>

        );
    }
}

export default withRouter(TeacherRegister);
