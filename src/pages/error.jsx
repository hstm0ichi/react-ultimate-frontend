import { Link, useRouteError } from "react-router-dom";
import { Button, Result } from 'antd';
import useDocumentTitle from "../services/useDocumentTitle";
export default function ErrorPage() {
    useDocumentTitle("Error");
    const error = useRouteError();
    return (
        <Result
            status="404"
            title="Oops!"
            subTitle={error.statusText || error.message}
            extra={<Button type="primary">
                <Link to="/">
                    <span>Back to homepage</span>
                </Link>
            </Button>}
        />
    );
}
