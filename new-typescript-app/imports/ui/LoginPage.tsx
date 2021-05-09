import React from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Form, Input, Button, Typography, Avatar, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setUserId } from '../ui/redux/actions/user.actions';

const { Text } = Typography;

type User = {
    username: string;
    password: string;
};

class LoginPage extends React.Component<LoginProps, {}> {
    state = {
        isError: false
    }

    onFinish = (values: User) => {
        Meteor.loginWithPassword(values.username, values.password, (err: any) => {
            if (err) {
                this.setState({ isError: true })
            } else {
                const userId = Meteor.userId();
                if (userId) {
                    this.props.history.push('/');
                    this.props.setUserId(userId);
                }
            }
        });

    };

    render() {
        return (
            <Form
                className="login-form"
                onFinish={this.onFinish}
            >
                <Form.Item className="avatar-center">
                    <Avatar size={64} icon={<UserOutlined />} />
                </Form.Item>
                <Form.Item className="avatar-center">
                    <Text type="secondary">Login to Continue</Text>
                </Form.Item>
                <Form.Item>
                    <div>
                        {this.state.isError && <Alert message={"You entered the username or password incorrectly!"}
                            type="error" showIcon closable />}
                    </div>
                </Form.Item>
                <Form.Item>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                            Log in
                        </Button>
                        {' '}Or <a href="/register">register now!</a>
                    </Form.Item>
                </Form.Item>
            </Form>
        );
    }
}

const mapStateToProps = (state: any) => {
    const { userId } = state.userId;

    return { userId };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    dispatch,
    ...bindActionCreators({ setUserId }, dispatch),
});

type LoginProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> & RouteComponentProps;



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
