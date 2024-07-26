import BookTable from "../components/book/book.table";
import useDocumentTitle from "../services/useDocumentTitle";
const BookPage = () => {
    useDocumentTitle("Books");
    return (
        <div style={{ padding: "20px" }}>
            <BookTable />
        </div>

    )
}

export default BookPage;
