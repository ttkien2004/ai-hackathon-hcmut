import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import type { Task } from "../data-types/Types";
import { useParams } from "react-router-dom";

// interface KanbanViewProps {
// 	tasks: Task[];
// 	setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // để cập nhật sau khi kéo thả
// }

const columns = {
	pending: { title: "To Do", color: "#f8d7da" },
	in_progress: { title: "In Progress", color: "#fff3cd" },
	completed: { title: "Done", color: "#d4edda" },
};

const KanbanView = () => {
	const { id } = useParams<{ id: string }>();
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		const data = localStorage.getItem(id || "")
			? JSON.parse(localStorage.getItem(id || "") ?? "")
			: [];
		setTasks(data);
	}, []);

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;
		if (!destination) return;

		// không đổi cột và vị trí
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const updated = [...tasks];
		const movedTask = updated[source.index];

		// Cập nhật status theo droppableId
		movedTask.status = destination.droppableId as
			| "pending"
			| "in_progress"
			| "completed";

		// Bỏ task khỏi vị trí cũ
		updated.splice(source.index, 1);
		// Thêm task vào vị trí mới
		updated.splice(destination.index, 0, movedTask);

		setTasks(updated);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div style={{ display: "flex", gap: "1rem", height: "80vh" }}>
				{Object.entries(columns).map(([colId, col]) => (
					<Droppable droppableId={colId} key={colId}>
						{(provided) => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								style={{
									flex: 1,
									background: col.color,
									borderRadius: "8px",
									padding: "1rem",
									overflowY: "auto",
								}}
							>
								<h3 style={{ textAlign: "center" }}>{col.title}</h3>
								{tasks
									.filter((task) => task.status === colId)
									.map((task, index) => (
										<Draggable
											draggableId={task.id.toString()}
											index={index}
											key={task.id}
										>
											{(provided) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={{
														padding: "10px",
														margin: "0 0 8px 0",
														borderRadius: "5px",
														background: "white",
														boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
														...provided.draggableProps.style,
													}}
												>
													{task.title}
												</div>
											)}
										</Draggable>
									))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				))}
			</div>
		</DragDropContext>
	);
};

export default KanbanView;
