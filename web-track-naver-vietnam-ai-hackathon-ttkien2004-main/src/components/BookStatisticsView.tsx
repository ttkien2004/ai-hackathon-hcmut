import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Book } from "../data-types/Types";

const BookStatisticsView: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		if (id) {
			const data = localStorage.getItem(id);
			if (data) {
				setBooks(JSON.parse(data));
			}
		}
	}, [id]);

	// Thống kê
	const totalBooks = books.length;
	const completedBooks = books.filter((b) => b.status === "completed").length;
	const inProgressBooks = books.filter(
		(b) => b.status === "in_progress"
	).length;
	const pendingBooks = books.filter((b) => b.status === "pending").length;

	// Tổng số trang đã đọc / tổng số trang
	const totalPages = books.reduce((sum, b) => sum + b.totalOfPages, 0);
	const pagesRead = books.reduce((sum, b) => sum + b.pagesHaveRead, 0);
	const completionRate =
		totalPages > 0 ? Math.round((pagesRead / totalPages) * 100) : 0;

	return (
		<div className="p-6">
			<h2 className="text-xl font-bold mb-4">📊 Book Statistics</h2>

			<div className="grid grid-cols-2 gap-4">
				<div className="p-4 rounded-lg shadow bg-white">
					<h3 className="font-semibold text-lg">Tổng số sách</h3>
					<p className="text-2xl font-bold">{totalBooks}</p>
				</div>

				<div className="p-4 rounded-lg shadow bg-green-100">
					<h3 className="font-semibold text-lg">Hoàn thành</h3>
					<p className="text-2xl font-bold">{completedBooks}</p>
				</div>

				<div className="p-4 rounded-lg shadow bg-yellow-100">
					<h3 className="font-semibold text-lg">Đang đọc</h3>
					<p className="text-2xl font-bold">{inProgressBooks}</p>
				</div>

				<div className="p-4 rounded-lg shadow bg-gray-100">
					<h3 className="font-semibold text-lg">Chưa đọc</h3>
					<p className="text-2xl font-bold">{pendingBooks}</p>
				</div>
			</div>

			<div className="mt-6 p-4 rounded-lg shadow bg-blue-50">
				<h3 className="font-semibold text-lg mb-2">Tiến độ tổng thể</h3>
				<div className="w-full bg-gray-200 rounded-full h-4">
					<div
						className="bg-blue-600 h-4 rounded-full"
						style={{ width: `${completionRate}%` }}
					></div>
				</div>
				<p className="mt-2 text-sm text-gray-700">
					{pagesRead} / {totalPages} trang ({completionRate}%)
				</p>
			</div>
		</div>
	);
};

export default BookStatisticsView;
