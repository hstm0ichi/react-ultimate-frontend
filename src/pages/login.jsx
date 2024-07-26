import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Divider, notification, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";
import useDocumentTitle from "../services/useDocumentTitle";
const LoginPage = () => {
    useDocumentTitle("Login");
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        setLoading(true);
        const response = await loginAPI(values.email, values.password);
        if (response.data) {
            message.success("Đăng nhập thành công!");
            localStorage.setItem("access_token", response.data.access_token)
            setUser(response.data.user);
            navigate("/");
        } else {
            notification.error({
                message: "Đăng nhập thất bại!",
                description: JSON.stringify(response.message)
            })
        }
        setLoading(false);
    }

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend><h3>Đăng Nhập</h3></legend>
                    <Form

                        layout='vertical'
                        form={form}
                        onFinish={onFinish}

                    >
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
                            <Input.Password
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        form.submit()
                                    }
                                }}
                            />
                        </Form.Item>
                        <Form.Item >
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Button
                                    id="loginBtn"
                                    loading={loading}
                                    type="primary"
                                    htmlType="submit"
                                > Login </Button>
                                <Link to="/">Go to homepage <ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>
                        <Divider />
                        <div style={{ textAlign: "center" }}>
                            Chưa có tài khoản? <Link to={"/register"}> Đăng ký tại đây</Link>
                        </div>
                    </Form >
                </fieldset>
            </Col>
        </Row>
    )
}

export default LoginPage;