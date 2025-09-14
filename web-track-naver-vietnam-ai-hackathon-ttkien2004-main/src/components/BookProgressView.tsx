import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Book } from "../data-types/Types";

const BookProgressView: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		if (!id) return;

		const data = localStorage.getItem(id);
		if (data) {
			setBooks(JSON.parse(data));
		} else {
			setBooks([]);
		}
	}, [id]);

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-4">Book Progress</h2>
			{books.length === 0 ? (
				<p>No books found for this list.</p>
			) : (
				<ul className="space-y-4">
					{books.map((book) => {
						const progress = (book.pagesHaveRead / book.totalOfPages) * 100;
						return (
							<li
								key={book.id}
								className="p-4 border rounded shadow-sm bg-white"
							>
								<h3 className="text-lg font-semibold">{book.title}</h3>
								<h4 className="text-md font-semibold">{book.author}</h4>
								<p className="text-gray-600">{book.description}</p>
								<p>Status: {book.status}</p>
								<div className="w-full bg-gray-200 rounded-full h-3 mt-2">
									<div
										className="bg-green-500 h-3 rounded-full"
										style={{ width: `${progress}%` }}
									></div>
								</div>
								<p className="text-sm mt-1">
									{book.pagesHaveRead}/{book.totalOfPages} pages
								</p>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default BookProgressView;
