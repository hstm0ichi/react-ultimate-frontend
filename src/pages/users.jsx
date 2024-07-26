import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useCallback, useEffect, useState } from "react";
import { fetchAllUsersAPI } from "../services/api.service";
import useDocumentTitle from "../services/useDocumentTitle";
const UserPage = () => {
    useDocumentTitle("Users");
    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);

    const loadUsers = useCallback(async () => {
        setLoadingTable(true)
        const response = await fetchAllUsersAPI(current, pageSize)
        if (response.data) {
            setDataUsers(response.data.result);
            setCurrent(response.data.meta.current);
            setPageSize(response.data.meta.pageSize);
            setTotal(response.data.meta.total);
        }
        setLoadingTable(false)
    }, [current, pageSize])

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    // lift-up state 
    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUsers={loadUsers} />
            <UserTable
                dataUsers={dataUsers}
                loadUsers={loadUsers}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                loadingTable={loadingTable}
            />
        </div>
    )
}

export default UserPage;
