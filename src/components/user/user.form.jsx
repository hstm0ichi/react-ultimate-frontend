import { Input, Button, notification, Modal } from 'antd';
import { useState } from 'react';
import { createUserAPI } from '../../services/api.service';

const UserForm = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const { loadUsers } = props;
    const [loading, setLoading] = useState(false);

    const handleSubmitBtn = async () => {
        setLoading(true);
        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Tạo user thành công"
            })
            resetAndCloseModal();
            await loadUsers();
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false);
    }

    const resetAndCloseModal = () => {
        setFullName();
        setEmail();
        setPassword();
        setPhone();
        setIsModalOpen(false);
    }

    return (
        <div className="user-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    type="primary"> Create User </Button>
            </div>

            <Modal
                title="Create User"
                open={isModalOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => resetAndCloseModal()}
                confirmLoading={loading}
                maskClosable={false}
                okText={"Create User"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Full Name</span>
                        <Input
                            value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Phone number</span>
                        <Input
                            value={phone}
                            onChange={(event) => { setPhone(event.target.value) }}
                        />
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default UserForm;