import React, { useEffect, useState } from "react";
import type { Task } from "../data-types/Types";
import TaskApi from "../services/TaskService";
import TimeApi from "../services/TimeService";
import { useParams } from "react-router-dom";

interface TaskDetailsProps {
	selectedTask: Task;
	setSelectedTask: React.Dispatch<React.SetStateAction<Task>>;
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
	selectedTask,
	setTasks,
	setSelectedTask,
}) => {
	// Cấu hình task rỗng
	const initialTask: Task = {
		id: "",
		title: "",
		description: "",
		status: "pending",
		dueDate: "",
		priority: "medium",
		estimatedTime: undefined,
	};
	const [updatedTask, setUpdatedTask] = useState<Task>(selectedTask);
	// State cho Toast
	const [toastMessage, setToastMessage] = useState<string>("");
	const [showToast, setShowToast] = useState<boolean>(false);

	const { id } = useParams<{ id: string }>(); // id lấy từ url

	// Hiển thị Toast trong 3 giây
	const triggerToast = (message: string) => {
		setToastMessage(message);
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 3000);
	};

	// Thêm định nghĩa hàm add, delete và Update
	const handleDelete = async (taskId: string) => {
		const returnMessage = await TaskApi.deleteTask(id || "", taskId);
		setTasks(TaskApi.getAll(id || ""));
		setSelectedTask(initialTask);
		triggerToast(returnMessage);
	};
	const handleUpdate = async (taskId: string, updatedTask: Task) => {
		const returnMessage = await TaskApi.updateTask(
			id || "",
			taskId,
			updatedTask
		);
		setTasks(TaskApi.getAll(id || ""));
		triggerToast(returnMessage);
	};
	useEffect(() => {
		console.log(
			TimeApi.timeLeft(
				selectedTask.dueDate || "",
				selectedTask.finishedDate || ""
			)
		);
	}, []);

	useEffect(() => {
		setUpdatedTask(selectedTask);
	}, [selectedTask]);
	return (
		<div className="col-3 bg-white border-start p-4">
			<h5>Task: {selectedTask.title}</h5>
			<div className="mb-3">
				<label className="form-label fw-bold">Description</label>
				<textarea
					className="form-control"
					value={updatedTask.description}
					onChange={(e) =>
						setUpdatedTask({ ...updatedTask, description: e.target.value })
					}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label fw-bold">List</label>
				<select className="form-select">
					<option>Personal</option>
					<option>Task</option>
				</select>
			</div>

			<div className="mb-3">
				<label className="form-label fw-bold">Due Date</label>
				<input
					type="date"
					className="form-control"
					value={updatedTask.dueDate}
					onChange={(e) =>
						setUpdatedTask({ ...updatedTask, dueDate: e.target.value })
					}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label fw-bold">Estimated Hours</label>
				<input
					type="number"
					className="form-control"
					value={updatedTask.estimatedTime || 0}
					onChange={(e) =>
						setUpdatedTask({
							...updatedTask,
							estimatedTime: Number(e.target.value),
						})
					}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label fw-bold">Tags</label>
				<br />
				<span className="badge bg-info me-2">Tag 1</span>
				<button className="btn btn-outline-secondary btn-sm">+ Add Tag</button>
			</div>

			<div className="mb-3">
				<label className="form-label fw-bold">Time Left</label>
				<input
					type="text"
					className="form-control"
					value={TimeApi.timeLeft(
						selectedTask.dueDate || "",
						selectedTask.finishedDate || ""
					)}
					readOnly
				/>
				{TimeApi.timeLeft(
					selectedTask.dueDate || "",
					selectedTask.finishedDate || ""
				) === "Quá hạn" && (
					<div className="text-danger mt-2">⚠ Task đã quá hạn!</div>
				)}
			</div>

			<div className="d-flex justify-content-between">
				<button
					className="btn btn-outline-danger"
					disabled={!selectedTask.id}
					onClick={() => handleDelete(selectedTask.id)}
				>
					Delete Task
				</button>
				<button
					className="btn btn-warning"
					disabled={!selectedTask.id}
					onClick={() => handleUpdate(selectedTask.id, updatedTask)}
				>
					Save Changes
				</button>
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

export default TaskDetails;
