import React, { useState, useEffect } from "react";
import type { Task } from "../data-types/Types";
import TaskApi from "../services/TaskService";
// import { TASK_STORAGE_KEY } from "../storage_key/StorageKeys";
import { useParams } from "react-router-dom";

interface FormAddTaskProps {
	// tasks: Task[];
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
	setTotalTodo: React.Dispatch<React.SetStateAction<number>>;
}

// tạo chuỗi random với 16 ký tự
const generateRandom16DigitNumber = (): string => {
	let result = "";

	// Ensure the first digit is not zero
	result += Math.floor(Math.random() * 9) + 1;

	// Generate the remaining 15 digits
	for (let i = 0; i < 15; i++) {
		result += Math.floor(Math.random() * 10);
	}
	return result;
};

// Tạo hàm lấy danh sách tasks
const getAllTasks = (id: string): Task[] => {
	const data = localStorage.getItem(id);
	return data ? JSON.parse(data) : [];
};

const FormAddTask: React.FC<FormAddTaskProps> = ({
	setTasks,
	setTotalTodo,
}) => {
	const initialTask: Task = {
		id: "",
		title: "",
		description: "",
		status: "pending",
		dueDate: "",
		finishedDate: "",
		priority: "medium",
		estimatedTime: undefined,
	};
	const [newTask, setNewTask] = useState<Task>(initialTask);

	// State cho Toast
	const [toastMessage, setToastMessage] = useState<string>("");
	const [showToast, setShowToast] = useState<boolean>(false);

	// Hiển thị Toast trong 3 giây
	const triggerToast = (message: string) => {
		setToastMessage(message);
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 3000);
	};

	const { id } = useParams<{ id: string }>();
	const handleAdd = async (newTask: Task) => {
		const res = await TaskApi.addNewTask(id || "", newTask);
		setTasks(getAllTasks(id || ""));
		triggerToast(res.message || "");
	};

	// Cập nhật status theo dueDate
	useEffect(() => {
		if (!newTask.dueDate) return;

		const todayStr = new Date().toISOString().split("T")[0];
		const dueDateStr = new Date(newTask.dueDate).toISOString().split("T")[0];

		if (dueDateStr > todayStr) {
			setNewTask((prev) => ({ ...prev, status: "pending" }));
		} else if (dueDateStr === todayStr) {
			setNewTask((prev) => ({ ...prev, status: "in_progress" }));
		} else {
			// quá hạn thì có thể set completed hoặc giữ nguyên
			setNewTask((prev) => ({ ...prev, status: "completed" }));
		}
	}, [newTask.dueDate]);

	return (
		<div className="col-3 bg-white border-start p-4">
			<h4>Add Task</h4>
			<div className="mb-3">
				<label className="form-label">Title</label>
				<input
					type="text"
					className="form-control"
					value={newTask.title}
					onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Description</label>
				<textarea
					className="form-control"
					value={newTask.description}
					onChange={(e) =>
						setNewTask({ ...newTask, description: e.target.value })
					}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Status</label>
				<input
					type="text"
					className="form-control"
					value={newTask.status === "in_progress" ? "In Progress" : "Pending"}
					readOnly
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Due Date</label>
				<input
					type="date"
					className="form-control"
					value={newTask.dueDate}
					onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Finished Date</label>
				<input
					type="date"
					className="form-control"
					value={newTask.finishedDate}
					onChange={(e) =>
						setNewTask({ ...newTask, finishedDate: e.target.value })
					}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Estimated Time</label>
				<input
					type="number"
					className="form-control"
					value={
						newTask.finishedDate && newTask.dueDate
							? Math.max(
									0,
									Math.ceil(
										(new Date(newTask.finishedDate).getTime() -
											new Date(newTask.dueDate).getTime()) /
											(1000 * 60 * 60 * 24) // ms → days
									)
							  )
							: 0
					}
					readOnly
				/>
			</div>
			<div className="d-flex gap-2">
				<button
					className="btn btn-success"
					onClick={() => {
						handleAdd({ ...newTask, id: generateRandom16DigitNumber() });
						setTotalTodo(getAllTasks(id || "").length);
						setNewTask(initialTask);

						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				>
					Save
				</button>
				<button className="btn btn-secondary">Cancel</button>
			</div>

			{/* Toast để thông báo update hoặc delete thành công */}
			<div
				className={`toast align-items-center text-bg-success border-0 position-absolute top-0 right-0 m-3 ${
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

export default FormAddTask;
