import React from 'react';
import { Button, Checkbox, Form, Input, notification, Row, Col, Divider } from 'antd';
import { registerUserAPI } from '../services/api.service';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import useDocumentTitle from "../services/useDocumentTitle";
const RegisterPage = () => {
    useDocumentTitle("Register");
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const response = await registerUserAPI(values.fullName, values.email, values.password, values.phone);
        if (response.data) {
            notification.success({
                message: "Register successfully",
                description: "Đăng ký thành công"
            })
            navigate('/login');
        } else {
            notification.error({
                message: "Register failed",
                description: JSON.stringify(response.message)
            })
        }
    };
    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend><h3>Đăng ký tài khoản</h3></legend>
                    <Form

                        layout='vertical'
                        form={form}
                        onFinish={onFinish}

                    >
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your fullName!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    pattern: new RegExp(/(([^<>()\[\]\\.,;:\s+@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/mg),
                                    message: 'The input is not valid E-mail!',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Phone number"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: "Wrong format!"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item >
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Button htmlType='submit' type="primary" >Register</Button>
                                <Link to="/">Go to homepage <ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>

                        <Divider />
                        <div style={{ textAlign: "center" }}>
                            Đã có tài khoản?
                            <Link to={"/login"}> Đăng nhập tại đây</Link>
                        </div>
                    </Form >
                </fieldset>
            </Col>
        </Row>
    )
}

export default RegisterPage;