import React, { useEffect, useState } from "react";
import type { Book } from "../data-types/Types";
import BookApi from "../services/BookService";
import { useParams } from "react-router-dom";

interface BookDetailsProps {
	selectedBook: Book;
	setSelectedBook: React.Dispatch<React.SetStateAction<Book>>;
	setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const BookDetails: React.FC<BookDetailsProps> = ({
	selectedBook,
	setBooks,
	setSelectedBook,
}) => {
	// Book rỗng
	const initialBook: Book = {
		id: "",
		title: "",
		author: "",
		description: "",
		status: "pending",
		totalOfPages: 0,
		pagesHaveRead: 0,
	};

	const [updatedBook, setUpdatedBook] = useState<Book>(selectedBook);

	// Toast
	const [toastMessage, setToastMessage] = useState<string>("");
	const [showToast, setShowToast] = useState<boolean>(false);

	const { id } = useParams<{ id: string }>();

	const triggerToast = (message: string) => {
		setToastMessage(message);
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 3000);
	};

	// Delete
	const handleDelete = async (bookId: string) => {
		const returnMessage = await BookApi.deleteBook(id || "", bookId);
		setBooks(BookApi.getAll(id || ""));
		setSelectedBook(initialBook);
		triggerToast(returnMessage);
	};

	// Update
	const handleUpdate = async (bookId: string, updatedBook: Book) => {
		const returnMessage = await BookApi.updateBook(
			id || "",
			bookId,
			updatedBook
		);
		setBooks(BookApi.getAll(id || ""));
		triggerToast(returnMessage);
	};

	// Cập nhật status theo số trang đọc
	useEffect(() => {
		if (updatedBook.pagesHaveRead === 0) {
			setUpdatedBook((prev) => ({ ...prev, status: "pending" }));
		} else if (updatedBook.pagesHaveRead < updatedBook.totalOfPages) {
			setUpdatedBook((prev) => ({ ...prev, status: "in_progress" }));
		} else if (
			updatedBook.totalOfPages > 0 &&
			updatedBook.pagesHaveRead >= updatedBook.totalOfPages
		) {
			setUpdatedBook((prev) => ({ ...prev, status: "completed" }));
		}
	}, [updatedBook.pagesHaveRead, updatedBook.totalOfPages]);

	useEffect(() => {
		setUpdatedBook(selectedBook);
	}, [selectedBook]);

	return (
		<div className="col-3 bg-white border-start p-4">
			<h5>Book: {selectedBook.title}</h5>
			<h5>Author: {selectedBook.author}</h5>

			<div className="mb-3">
				<label className="form-label fw-bold">Description</label>
				<textarea
					className="form-control"
					value={updatedBook.description}
					onChange={(e) =>
						setUpdatedBook({ ...updatedBook, description: e.target.value })
					}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label fw-bold">Total Pages</label>
				<input
					type="number"
					className="form-control"
					value={updatedBook.totalOfPages}
					onChange={(e) =>
						setUpdatedBook({
							...updatedBook,
							totalOfPages: Number(e.target.value),
						})
					}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label fw-bold">Pages Have Read</label>
				<input
					type="number"
					className="form-control"
					value={updatedBook.pagesHaveRead}
					onChange={(e) =>
						setUpdatedBook({
							...updatedBook,
							pagesHaveRead: Number(e.target.value),
						})
					}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label fw-bold">Status</label>
				<input
					type="text"
					className="form-control"
					value={updatedBook.status}
					readOnly
				/>
				{updatedBook.status === "completed" && (
					<div className="text-success mt-2">🎉 Hoàn thành cuốn sách!</div>
				)}
			</div>

			<div className="d-flex justify-content-between">
				<button
					className="btn btn-outline-danger"
					disabled={!selectedBook.id}
					onClick={() => handleDelete(selectedBook.id)}
				>
					Delete Book
				</button>
				<button
					className="btn btn-warning"
					disabled={!selectedBook.id}
					onClick={() => handleUpdate(selectedBook.id, updatedBook)}
				>
					Save Changes
				</button>
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

export default BookDetails;
