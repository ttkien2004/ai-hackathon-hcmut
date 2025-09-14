import React, { useState, useEffect } from "react";
import type { Book } from "../data-types/Types";
import BookApi from "../services/BookService";
import { useParams } from "react-router-dom";

interface FormAddBookProps {
	setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
	setTotalBooks: React.Dispatch<React.SetStateAction<number>>;
}

// tạo chuỗi random với 16 ký tự
const generateRandom16DigitNumber = (): string => {
	let result = "";
	result += Math.floor(Math.random() * 9) + 1; // Ensure first digit ≠ 0
	for (let i = 0; i < 15; i++) {
		result += Math.floor(Math.random() * 10);
	}
	return result;
};

// Tạo hàm lấy danh sách books
const getAllBooks = (id: string): Book[] => {
	const data = localStorage.getItem(id);
	return data ? JSON.parse(data) : [];
};

const FormAddBook: React.FC<FormAddBookProps> = ({
	setBooks,
	setTotalBooks,
}) => {
	const initialBook: Book = {
		id: "",
		title: "",
		author: "",
		description: "",
		status: "pending",
		totalOfPages: 0,
		pagesHaveRead: 0,
	};
	const [newBook, setNewBook] = useState<Book>(initialBook);

	// Toast
	const [toastMessage, setToastMessage] = useState<string>("");
	const [showToast, setShowToast] = useState<boolean>(false);

	const triggerToast = (message: string) => {
		setToastMessage(message);
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 3000);
	};

	const { id } = useParams<{ id: string }>();

	const handleAdd = async (book: Book) => {
		const res = await BookApi.addNewBook(id || "", book);
		setBooks(getAllBooks(id || ""));
		triggerToast(res.message || "Book added!");
	};

	// Auto update status theo số trang đã đọc
	useEffect(() => {
		if (newBook.pagesHaveRead === 0) {
			setNewBook((prev) => ({ ...prev, status: "pending" }));
		} else if (newBook.pagesHaveRead < newBook.totalOfPages) {
			setNewBook((prev) => ({ ...prev, status: "in_progress" }));
		} else if (
			newBook.totalOfPages > 0 &&
			newBook.pagesHaveRead >= newBook.totalOfPages
		) {
			setNewBook((prev) => ({ ...prev, status: "completed" }));
		}
	}, [newBook.pagesHaveRead, newBook.totalOfPages]);

	return (
		<div className="col-3 bg-white border-start p-4">
			<h4>Add Book</h4>

			<div className="mb-3">
				<label className="form-label">Title</label>
				<input
					type="text"
					className="form-control"
					value={newBook.title}
					onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label">Author</label>
				<input
					type="text"
					className="form-control"
					value={newBook.author}
					onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label">Description</label>
				<textarea
					className="form-control"
					value={newBook.description}
					onChange={(e) =>
						setNewBook({ ...newBook, description: e.target.value })
					}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label">Total Pages</label>
				<input
					type="number"
					className="form-control"
					value={newBook.totalOfPages}
					onChange={(e) =>
						setNewBook({ ...newBook, totalOfPages: Number(e.target.value) })
					}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label">Pages Have Read</label>
				<input
					type="number"
					className="form-control"
					value={newBook.pagesHaveRead}
					onChange={(e) =>
						setNewBook({ ...newBook, pagesHaveRead: Number(e.target.value) })
					}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label">Status</label>
				<input
					type="text"
					className="form-control"
					value={newBook.status}
					readOnly
				/>
			</div>

			<div className="d-flex gap-2">
				<button
					className="btn btn-success"
					onClick={() => {
						handleAdd({ ...newBook, id: generateRandom16DigitNumber() });
						setTotalBooks(getAllBooks(id || "").length);

						setNewBook(initialBook);
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				>
					Save
				</button>
				<button className="btn btn-secondary">Cancel</button>
			</div>

			{/* Toast */}
			<div
				className={`toast align-items-center text-bg-success border-0 position-absolute top-0 end-0 m-3 ${
					showToast ? "show" : "hide"
				}`}
				role="alert"
			>
				<div className="d-flex">
					<div className="toast-body">{toastMessage}</div>
					<button
						type="button"
						className="btn-close btn-close-white me-2 m-auto"
						onClick={() => setShowToast(false)}
					></button>
				</div>
			</div>
		</div>
	);
};

export default FormAddBook;
