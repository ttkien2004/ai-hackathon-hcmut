import { useState, useEffect } from "react";
import type { Task } from "../data-types/Types";
// import { TASK_STORAGE_KEY } from "../storage_key/StorageKeys";
import FormAddTask from "../components/FormAddTask";
import TaskDetails from "../components/TaskDetails";
import TaskList from "../components/TaskList";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// interface TaskListPageProps {
// 	typeList: string;
// }

const TaskListPage = () => {
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
	// const [viewTodo, setViewTodo] = useState<"list" | "calendar">("list");
	const { id } = useParams<{ id: string }>();

	// Lấy tasks từ localStorage
	useEffect(() => {
		const getTaskFromLocalStorage = JSON.parse(
			localStorage.getItem(id || "") ?? "[]"
		);
		setTasks(getTaskFromLocalStorage);
		setTotalTodo(getTaskFromLocalStorage.length);
	}, [id]);

	// Lưu tasks vào localStorage mỗi khi tasks thay đổi
	// useEffect(() => {
	// 	if (id) {
	// 		localStorage.setItem(id, JSON.stringify(tasks));
	// 		setTotalTodo(tasks.length);
	// 	}
	// }, [tasks, id]);
	return (
		<div className="container-fluid flex-1">
			<div className="row" style={{ minHeight: "100vh" }}>
				{/* Sidebar */}
				<div className="col-3 bg-light border-end p-3">
					<h5 className="mb-4">Menu</h5>
					<ul className="nav flex-column">
						<li className="nav-item">
							<Link className="nav-link active" to={`/tasks/${id}`}>
								Lists View
							</Link>
						</li>

						<li className="nav-item">
							<Link className="nav-link active" to={`/calendar/${id}`}>
								Calendar View
							</Link>
						</li>

						<li className="nav-item">
							<Link className="nav-link active" to={`/kanban/${id}`}>
								Kanban View
							</Link>
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

				<div className="col-6 p-4">
					<TaskList
						tasks={tasks}
						totalTodo={totalTodo}
						setPressAddButton={setPressAddButton}
						setSelectedTask={setSelectedTask}
					/>
					{/* {viewTodo === "calendar" && <CalendarView tasks={tasks} />} */}
				</div>
				{/* Task List */}

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

export default TaskListPage;
