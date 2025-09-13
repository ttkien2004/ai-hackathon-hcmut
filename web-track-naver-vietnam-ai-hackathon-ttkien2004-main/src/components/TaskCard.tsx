import React from "react";
import type { Task } from "../data-types/Types";

interface TaskCardProps {
	task: Task;
	onDelete: (id: string) => void;
	// onUpdate: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
	return (
		<div className="mb-4">
			<div className="card shadow-sm h-100">
				<div className="card-body d-flex flex-column">
					<div className="d-flex justify-content-between align-items-start mb-2">
						<h5 className="card-title mb-0">{task.title}</h5>
						{task.priority && (
							<span
								className={`badge ${
									task.priority === "high"
										? "bg-danger"
										: task.priority === "medium"
										? "bg-warning text-dark"
										: "bg-success"
								}`}
							>
								{task.priority}
							</span>
						)}
					</div>

					{task.description && (
						<p className="card-text text-muted">{task.description}</p>
					)}

					<div className="mt-auto">
						<p className="mb-1">
							<strong>Status:</strong>{" "}
							<span
								className={`badge ${
									task.status === "completed"
										? "bg-success"
										: task.status === "in_progress"
										? "bg-primary"
										: "bg-secondary"
								}`}
							>
								{task.status}
							</span>
						</p>
						{task.dueDate && (
							<p className="mb-1">
								<strong>Due:</strong> {task.dueDate}
							</p>
						)}
						{task.estimatedTime && (
							<p className="mb-3">
								<strong>Estimated:</strong> {task.estimatedTime}h
							</p>
						)}

						<div className="d-flex justify-content-between">
							<button
								className="btn btn-sm btn-outline-primary"
								// onClick={() => onUpdate(task.id)}
							>
								Update
							</button>
							<button
								className="btn btn-sm btn-outline-danger"
								onClick={() => onDelete(task.id)}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TaskCard;
