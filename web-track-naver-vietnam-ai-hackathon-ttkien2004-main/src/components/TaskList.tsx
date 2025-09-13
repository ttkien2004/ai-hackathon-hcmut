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
						<span className="badge bg-secondary">Task</span>
					</li>
				))}
			</ul>
		</div>
	);
};
export default TaskList;
