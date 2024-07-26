import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, notification, Popconfirm, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { deleteBookAPI, fetchAllBooksAPI } from "../../services/api.service";
import ViewBookDetail from "./view.book.detail";
import CreateBook from "./create.book";
import UpdateBook from "./update.book";

const BookTable = () => {
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState(null);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);

    const loadBooks = useCallback(async () => {
        setLoadingTable(true)
        const response = await fetchAllBooksAPI(current, pageSize);
        if (response.data) {
            setDataBooks(response.data.result);
            setCurrent(response.data.meta.current);
            setPageSize(response.data.meta.pageSize);
            setTotal(response.data.meta.total);
        }
        setLoadingTable(false)
    }, [current, pageSize])

    useEffect(() => {
        loadBooks();
    }, [loadBooks])


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

    const handleDeleteBook = async (id) => {
        const response = await deleteBookAPI(id);
        if (response.data) {
            message.success("Delete book successfully");
            await loadBooks();
        } else {
            notification.error({
                message: "Error delete book",
                description: JSON.stringify(response.message)
            })
        }
    }

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
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text, record, index, action) => {
                if (text)
                    return new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' }).format(text)

            },
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },

        {
            title: 'Tác giả',
            dataIndex: 'author',
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
                        title="Xóa book"
                        description="Bạn chắc chắn xóa book này ?"
                        onConfirm={() => handleDeleteBook(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"

                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },

    ];



    return (
        <>
            <div style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h3>Table Book</h3>
                <Button type="primary" onClick={() => setIsCreateOpen(true)}>Create Book</Button>
            </div>
            <Table
                columns={columns}
                dataSource={dataBooks}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                onChange={onChange}
                loading={loadingTable}
            />
            <ViewBookDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadBooks={loadBooks}
            />
            <CreateBook
                loadBooks={loadBooks}
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
            />
            <UpdateBook
                loadBooks={loadBooks}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
            />
        </>
    )

}

export default BookTable;