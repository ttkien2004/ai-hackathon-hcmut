import { useState, useEffect } from "react";
import type { Task } from "../data-types/Types";
import { TASK_STORAGE_KEY } from "../storage_key/StorageKeys";
import FormAddTask from "../components/FormAddTask";
import TaskDetails from "../components/TaskDetails";

const TestPage = () => {
	const initialTask: Task = {
		id: "",
		title: "",
		description: "",
		status: "pending",
		dueDate: "",
		priority: "medium",
		estimatedTime: undefined,
	};
	const [tasks, setTasks] = useState<Task[]>([]);
	const [selectedTask, setSelectedTask] = useState<Task>(initialTask);
	const [pressAddButton, setPressAddButton] = useState<boolean>(true);
	const [totalTodo, setTotalTodo] = useState<number>(0);

	// Hàm tính số ngày còn lại để hoàn thiện deadline
	const daysLeft = (dueDate: string, finishedDate: string): number => {
		const due = new Date(dueDate).getTime();
		const finished = new Date(finishedDate).getTime();

		// số ngày còn lại
		return Math.ceil((due - finished) / (1000 * 60 * 60 * 24));
	};

	useEffect(() => {
		const getTaskFromLocalStorage = JSON.parse(
			localStorage.getItem(TASK_STORAGE_KEY) ?? "[]"
		);
		setTasks(getTaskFromLocalStorage);
		setTotalTodo(getTaskFromLocalStorage.length);
	}, []);
	return (
		<div className="container-fluid flex-1">
			<div className="row h-100">
				{/* Sidebar */}
				<div className="col-3 bg-light border-end p-3">
					<h5 className="mb-4">Menu</h5>
					<ul className="nav flex-column">
						<li className="nav-item">
							<a className="nav-link active" href="#">
								Today
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Upcoming
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Calendar
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Sticky Wall
							</a>
						</li>
					</ul>

					<h6 className="mt-4">Lists</h6>
					<span className="badge bg-danger me-2">Personal</span>
					<span className="badge bg-primary me-2">Work</span>
					<span className="badge bg-secondary">List 1</span>

					<div className="mt-4">
						<button className="btn btn-outline-dark btn-sm w-100">
							+ Add New List
						</button>
					</div>
				</div>

				{/* Task List */}
				<div className="col-6 p-4">
					<div
						className="d-flex justify-content-between align-items-center mb-3"
						style={{ cursor: "pointer" }}
					>
						<h3>
							Today <span className="text-muted">{totalTodo}</span>
						</h3>
						<button
							className="btn btn-primary btn-sm"
							onClick={() => setPressAddButton(true)}
						>
							+ Add New Task
						</button>
					</div>

					<ul className="list-group">
						{tasks.map((task) => (
							<li
								key={task.id}
								className="list-group-item d-flex justify-content-between align-items-center"
								onClick={() => {
									setSelectedTask(task), setPressAddButton(false);
								}}
							>
								{task.title}
								<span className="badge bg-secondary">Task</span>
							</li>
						))}
					</ul>
				</div>

				{/* Task Detail */}
				{pressAddButton ? (
					<FormAddTask setTasks={setTasks} setTotalTodo={setTotalTodo} />
				) : (
					<TaskDetails
						selectedTask={selectedTask}
						setTasks={setTasks}
						setSelectedTask={setSelectedTask}
					/>
				)}
			</div>
		</div>
	);
};

export default TestPage;
