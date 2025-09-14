import type { Book } from "../data-types/Types";

interface BookListProps {
	books: Book[];
	totalBooks: number;
	setPressAddButton: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedBook: React.Dispatch<React.SetStateAction<Book>>;
}

const BookList: React.FC<BookListProps> = ({
	books,
	totalBooks,
	setPressAddButton,
	setSelectedBook,
}) => {
	// Hàm xử lý trạng thái đọc sách
	const getReadingStatus = (book: Book) => {
		if (book.pagesHaveRead === 0) {
			return <span className="badge bg-secondary">Not started</span>;
		} else if (book.pagesHaveRead < book.totalOfPages) {
			return <span className="badge bg-warning text-dark">In progress</span>;
		} else if (book.pagesHaveRead === book.totalOfPages) {
			return <span className="badge bg-success">Completed</span>;
		} else {
			return <span className="badge bg-danger">Invalid</span>;
		}
	};

	return (
		<div>
			<div
				className="d-flex justify-content-between align-items-center mb-3"
				style={{ cursor: "pointer" }}
			>
				<h3>
					My Books <span className="text-muted">{totalBooks}</span>
				</h3>
				<button
					className="btn btn-primary btn-sm"
					onClick={() => setPressAddButton(true)}
				>
					+ Add New Book
				</button>
			</div>

			<ul className="list-group">
				{books.map((book) => (
					<li
						key={book.id}
						className="list-group-item d-flex justify-content-between align-items-center"
						onClick={() => {
							setSelectedBook(book);
							setPressAddButton(false);
						}}
					>
						<div>
							<strong>{book.title}</strong>
							<br />
							<small className="text-muted">{book.description}</small>
						</div>
						<span className="badge bg-info">{book.status}</span>
						{getReadingStatus(book)}
					</li>
				))}
			</ul>
		</div>
	);
};
export default BookList;
