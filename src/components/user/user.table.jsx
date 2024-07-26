import { message, Popconfirm, Table, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from "../../services/api.service";

const UserTable = (props) => {
    const { dataUsers, loadUsers, current, pageSize, total, setCurrent, setPageSize, loadingTable } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const columns = [
        {
            title: "STT",
            align: "center",
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                )
            }
        },

        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a
                        href='#'
                        onClick={() => {
                            setDataDetail(record);
                            setIsDetailOpen(true);
                        }}
                    >{record._id}</a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />
                    <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn chắc chắn xóa user này ?"
                        onConfirm={() => handleDeleteUser(record._id)}
                        okText="Yes"
                        cancelText="No"
                        onCancel={cancel}
                        placement="left"

                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];
    const cancel = () => {
        message.warning('Chill Man, you clicked cancel, so we don\'t delete that user!');
    };

    const handleDeleteUser = async (id) => {
        const response = await deleteUserAPI(id);
        if (response.data) {
            notification.success({
                message: "Delete user",
                description: "Xóa user thành công"
            })
            await loadUsers();
        } else {
            notification.error({
                message: "Error delete user",
                description: JSON.stringify(response.message)
            })
        }
    }

    const onChange = (pagination, filters, sorter, extra) => {
        // setCurrent, setPageSize
        //nếu thay đổi trang : current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current) //"5" => 5
            }
        }

        //nếu thay đổi tổng số phần tử : pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize) //"5" => 5
            }
        }
    };


    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {range[0]}-{range[1]} trên {total} rows
                            </div>
                        )
                    }
                }

                }
                onChange={onChange}
                loading={loadingTable}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUsers={loadUsers}
            />
            <ViewUserDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadUsers={loadUsers}
            />
        </>
    )
}

export default UserTable;