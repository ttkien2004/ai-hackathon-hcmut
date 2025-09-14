// import type { Task } from "../data-types/Types";
import type { Book } from "../data-types/Types";
// import { TASK_STORAGE_KEY as STORAGE_KEY } from "../storage_key/StorageKeys";

export interface ApiResponse<T> {
	data: T;
	status?: number;
	message?: string;
	error?: string;
}
const BookApi = {
	getAll: (urlId: string): Book[] => {
		const books = localStorage.getItem(urlId);
		return books ? JSON.parse(books) : [];
	},
	addNewBook: async (
		urlId: string,
		bookData: Book
	): Promise<ApiResponse<Book>> => {
		const tasks = BookApi.getAll(urlId);
		tasks.push(bookData);
		localStorage.setItem(urlId, JSON.stringify(tasks));
		return {
			data: bookData,
			message: "Add new book successfully",
		};
	},
	updateBook: async (
		urlId: string,
		id: string,
		updatedBook: Partial<Book>
	): Promise<string> => {
		let books = BookApi.getAll(urlId);
		books = books.map((book) =>
			book.id === id ? { ...book, ...updatedBook } : book
		);
		localStorage.setItem(urlId, JSON.stringify(books));
		return "Update book successfully";
	},
	deleteBook: async (urlId: string, id: string): Promise<string> => {
		let books = BookApi.getAll(urlId);
		books = books.filter((book) => book.id !== id);
		localStorage.setItem(urlId, JSON.stringify(books));
		return "Delete book successfully";
	},
};

export default BookApi;
