import { useState, useEffect } from "react";
import type { Book } from "../data-types/Types";
import FormAddBook from "../components/FormAddBook";
import BookDetails from "../components/BookDetails";
import BookList from "../components/BookList";
import { Link, useParams } from "react-router-dom";

const BookListPage = () => {
	const initialBook: Book = {
		id: "",
		title: "",
		author: "",
		description: "",
		status: "pending",
		totalOfPages: 0,
		pagesHaveRead: 0,
	};
	const [books, setBooks] = useState<Book[]>([]);
	const [selectedBook, setSelectedBook] = useState<Book>(initialBook);
	const [pressAddButton, setPressAddButton] = useState<boolean>(true);
	const [totalBooks, setTotalBooks] = useState<number>(0);
	const { id } = useParams<{ id: string }>();

	// Lấy books từ localStorage
	useEffect(() => {
		const getBooksFromLocalStorage = JSON.parse(
			localStorage.getItem(id || "") ?? "[]"
		);
		setBooks(getBooksFromLocalStorage);
		setTotalBooks(getBooksFromLocalStorage.length);
	}, [id]);

	// Nếu muốn lưu lại khi books thay đổi thì bỏ comment
	// useEffect(() => {
	// 	if (id) {
	// 		localStorage.setItem(id, JSON.stringify(books));
	// 		setTotalBooks(books.length);
	// 	}
	// }, [books, id]);

	return (
		<div className="container-fluid flex-1">
			<div className="row h-100">
				{/* Sidebar */}
				<div className="col-3 bg-light border-end p-3">
					<h5 className="mb-4">Menu</h5>
					<ul className="nav flex-column">
						<li className="nav-item">
							<Link className="nav-link active" to={`/books/${id}`}>
								Lists View
							</Link>
						</li>

						<li className="nav-item">
							<Link className="nav-link active" to={`/progress/${id}`}>
								Progress View
							</Link>
						</li>

						<li className="nav-item">
							<Link className="nav-link active" to={`/stats/${id}`}>
								Statistics View
							</Link>
						</li>
					</ul>

					<h6 className="mt-4">Lists</h6>
					<span className="badge bg-danger me-2">Fiction</span>
					<span className="badge bg-primary me-2">Non-Fiction</span>
					<span className="badge bg-secondary">Others</span>

					<div className="mt-4">
						<button className="btn btn-outline-dark btn-sm w-100">
							+ Add New List
						</button>
					</div>
				</div>

				{/* Book List */}
				<div className="col-6 p-4">
					<BookList
						books={books}
						totalBooks={totalBooks}
						setPressAddButton={setPressAddButton}
						setSelectedBook={setSelectedBook}
					/>
				</div>

				{/* Book Detail or Add Form */}
				{pressAddButton ? (
					<FormAddBook setBooks={setBooks} setTotalBooks={setTotalBooks} />
				) : (
					<BookDetails
						selectedBook={selectedBook}
						setBooks={setBooks}
						setSelectedBook={setSelectedBook}
					/>
				)}
			</div>
		</div>
	);
};

export default BookListPage;
