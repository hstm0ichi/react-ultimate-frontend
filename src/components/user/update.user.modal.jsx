import { Input, notification, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { updateUserAPI } from '../../services/api.service';

const UpdateUserModal = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const { isModalUpdateOpen, setIsModalUpdateOpen,
        dataUpdate, setDataUpdate,
        loadUsers
    } = props;

    //next dataUpdate != prev dataUpdate
    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate])

    const handleSubmitBtn = async () => {
        setLoading(true);
        const res = await updateUserAPI(id, fullName, phone);
        if (res.data) {
            notification.success({
                message: "Update user",
                description: "Cập nhât thành công"
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
        setIsModalUpdateOpen(false);
        setFullName("");
        setPhone("");
        setId("");
        setDataUpdate(null);
    }


    return (
        <Modal
            title="Update a User"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            confirmLoading={loading}
            maskClosable={false}
            okText={"SAVE"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
                <div>
                    <span>Full Name</span>
                    <Input
                        value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }}
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
    )
}
export default UpdateUserModal;

