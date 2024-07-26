import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateBookThumbnailAPI } from '../../services/api.service';

const ViewBookDetail = (props) => {
    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen,
        loadBooks
    } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleOnChangeFile = (event) => {

        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleUpdateBookThumbnail = async () => {
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            //success
            const newThumbnail = resUpload.data.fileUploaded;
            //step 2: update user
            const resUpdateAvatar = await updateBookThumbnailAPI(
                newThumbnail, dataDetail._id, dataDetail.mainText, dataDetail.author, dataDetail.price, dataDetail.quantity, dataDetail.category)

            if (resUpdateAvatar.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadBooks();

                notification.success({
                    message: "Update book thumbnail",
                    description: "Cập nhật thumbnail thành công"
                })

            } else {
                notification.error({
                    message: "Error update book thumbnail",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }
        } else {
            //failed
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }

    }

    return (
        <Drawer
            width={"auto"}
            title="Chi tiết Book"
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ? <>
                <p>Id: {dataDetail._id}</p>
                <br />
                <p>Tiêu đề: {dataDetail.mainText}</p>
                <br />
                <p>Tác giả: {dataDetail.author}</p>
                <br />
                <p>Thể loại: {dataDetail.category}</p>
                <br />
                <p>Giá tiền: {
                    new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' }).format(dataDetail.price)}
                </p>
                <br />
                <p>Số lượng: {dataDetail.quantity}</p>
                <br />
                <p>Đã bán: {dataDetail.sold}</p>
                <br />
                <p>Thumbnail:</p>
                <div style={{
                    marginTop: "10px",
                    height: "100px", width: "150px",
                    border: "1px solid #ccc"
                }}>
                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                        src={`${import.meta.env.VITE_BASE_URL}/images/book/${dataDetail.thumbnail}`} />
                </div>
                <div>
                    <label htmlFor='btnUpload' style={{
                        display: "block",
                        width: "fit-content",
                        marginTop: "15px",
                        padding: "5px 10px",
                        background: "orange",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}>
                        Upload Book Thumbnail
                    </label>
                    <input
                        type='file' hidden id='btnUpload'
                        // onChange={handleOnChangeFile}
                        onChange={(event) => handleOnChangeFile(event)}
                        onClick={(event) => {
                            event.target.value = null
                        }}
                    />
                </div>
                <br />
                {preview &&
                    <>
                        <div style={{
                            marginTop: "10px",
                            marginBottom: "15px",
                            height: "100px", width: "150px",
                            border: "1px solid #ccc"
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={preview} />
                        </div>
                        <Button
                            type='primary'
                            onClick={() => {
                                handleUpdateBookThumbnail()
                            }}
                        >
                            Save</Button>
                    </>
                }
            </>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>
            }
        </Drawer>
    )

}

export default ViewBookDetail;