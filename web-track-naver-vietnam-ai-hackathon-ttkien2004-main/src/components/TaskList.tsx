import type { Task } from "../data-types/Types";

interface TaskListProps {
	tasks: Task[];
	totalTodo: number;
	setPressAddButton: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedTask: React.Dispatch<React.SetStateAction<Task>>;
}

const TaskList: React.FC<TaskListProps> = ({
	tasks,
	totalTodo,
	setPressAddButton,
	setSelectedTask,
}) => {
	// Hàm xử lý trạng thái dựa vào dueDate
	const getDueDateBadge = (dueDateStr: string) => {
		if (!dueDateStr) {
			return <span className="badge bg-secondary">No due date</span>;
		}

		const today = new Date();
		const dueDate = new Date(dueDateStr);

		// Bỏ giờ phút giây để so sánh ngày
		const todayStr = today.toISOString().split("T")[0];
		const dueDateOnly = dueDate.toISOString().split("T")[0];

		if (dueDateOnly > todayStr) {
			// chưa tới hạn
			return <span className="badge bg-warning text-dark">upcoming</span>;
		} else if (dueDateOnly === todayStr) {
			// hôm nay là hạn
			return <span className="badge bg-primary">in progress</span>;
		} else {
			// trễ hạn
			return <span className="badge bg-danger">deadline</span>;
		}
	};
	return (
		<div>
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
						<span className="badge bg-secondary">{task.type}</span>
						<span>{getDueDateBadge(task.dueDate || "")}</span>
					</li>
				))}
			</ul>
		</div>
	);
};
export default TaskList;
