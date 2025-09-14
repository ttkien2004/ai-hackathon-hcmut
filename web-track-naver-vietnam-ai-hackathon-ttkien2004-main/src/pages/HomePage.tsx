import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ListData {
	id: string;
	name: string;
	type: "task" | "book";
	items: any[];
}

const HomePage: React.FC = () => {
	const [lists, setLists] = useState<ListData[]>([]);
	const [showPopup, setShowPopup] = useState(false);
	const [newName, setNewName] = useState("");
	const [newType, setNewType] = useState<"task" | "book">("task");
	const navigate = useNavigate();

	// Load lists từ localStorage
	useEffect(() => {
		const stored = localStorage.getItem("lists");
		if (stored) {
			setLists(JSON.parse(stored));
		}
	}, []);

	const handleAddList = () => {
		const newList: ListData = {
			id: Date.now().toString(),
			name: newName,
			type: newType,
			items: [],
		};

		setLists((prevLists) => {
			const updatedLists = [...prevLists, newList];
			localStorage.setItem("lists", JSON.stringify(updatedLists));
			return updatedLists;
		});

		setNewName("");
		setNewType("task");
		setShowPopup(false);
	};

	return (
		<div className="p-6">
			<h2 className="text-xl font-bold mb-4">Sổ ghi chú gần đây</h2>

			<div className="grid grid-cols-4 gap-4">
				{/* Card thêm mới */}
				<div
					onClick={() => setShowPopup(true)}
					className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gray-50"
				>
					<span className="text-3xl">+</span>
					<span className="mt-2">Tạo sổ ghi chú mới</span>
				</div>

				{/* Các list hiện tại */}
				{lists.map((list) => (
					<div
						key={list.id}
						className="p-4 rounded-lg shadow bg-white hover:shadow-md transition"
						onClick={() => {
							// Nếu chưa có data thì tạo list rỗng
							if (!localStorage.getItem(list.id)) {
								localStorage.setItem(list.id, "[]");
							}

							// Navigate dựa trên type
							if (list.type === "task") {
								navigate(`/tasks/${list.id}`);
							} else if (list.type === "book") {
								navigate(`/books/${list.id}`);
							}
						}}
					>
						<h3 className="font-semibold">{list.name}</h3>
						<p className="text-sm text-gray-500">Type: {list.type}</p>
						<p className="text-xs text-gray-400 mt-2">
							{JSON.parse(localStorage.getItem(list.id) || "[]").length} mục
						</p>
					</div>
				))}
			</div>

			{/* Popup thêm mới */}
			{showPopup && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg w-80">
						<h3 className="font-bold mb-4">Thêm Todo List</h3>

						<input
							type="text"
							placeholder="Tên list"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							className="w-full border p-2 mb-3 rounded"
						/>

						<select
							value={newType}
							onChange={(e) => setNewType(e.target.value as "task" | "book")}
							className="w-full border p-2 mb-3 rounded"
						>
							<option value="task">Task</option>
							<option value="book">Book</option>
						</select>

						<div className="flex justify-end gap-2">
							<button
								onClick={() => setShowPopup(false)}
								className="px-4 py-2 bg-gray-200 rounded"
							>
								Hủy
							</button>
							<button
								onClick={handleAddList}
								className="px-4 py-2 bg-blue-600 text-white rounded"
							>
								Thêm
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default HomePage;
