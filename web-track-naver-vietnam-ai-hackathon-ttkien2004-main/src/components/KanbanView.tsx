import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import type { Task } from "../data-types/Types";
import { useParams } from "react-router-dom";

const columns: Record<string, { title: string; color: string }> = {
	pending: { title: "To Do", color: "#f8d7da" },
	in_progress: { title: "In Progress", color: "#fff3cd" },
	completed: { title: "Done", color: "#d4edda" },
};

const KanbanView: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		const data = localStorage.getItem(id || "")
			? JSON.parse(localStorage.getItem(id || "") ?? "[]")
			: [];
		setTasks(data);
	}, [id]);

	const normalizeDay = (dateStr?: string | null) => {
		if (!dateStr) return null;
		const d = new Date(dateStr);
		d.setHours(0, 0, 0, 0);
		return d;
	};

	const today = () => {
		const t = new Date();
		t.setHours(0, 0, 0, 0);
		return t;
	};

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;
		if (!destination) return;

		// no-op if same place
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const sourceCol = source.droppableId;
		const destCol = destination.droppableId;

		// build per-column arrays (preserve current order)
		const colMap: Record<string, Task[]> = {
			pending: tasks.filter((t) => t.status === "pending"),
			in_progress: tasks.filter((t) => t.status === "in_progress"),
			completed: tasks.filter((t) => t.status === "completed"),
		};

		// copy arrays so we can mutate
		const sourceArr = [...(colMap[sourceCol] || [])];
		const destArr = [...(colMap[destCol] || [])];

		// get the moved task from sourceArr
		const moved = sourceArr[source.index];
		if (!moved) return; // safety

		// Validate dropping to "completed"
		if (destCol === "completed") {
			const due = normalizeDay(moved.dueDate);
			const finish = normalizeDay(moved.finishedDate);
			const now = today();

			if (!due) {
				// no due date -> disallow
				alert("Không thể chuyển sang Completed: task chưa có dueDate.");
				return;
			}

			if (finish) {
				// both due & finished -> require today in [due, finish]
				if (now < due || now > finish) {
					alert(
						"Không thể chuyển sang Completed: hôm nay không nằm trong khoảng dueDate → finishedDate."
					);
					return;
				}
				// ok -> mark completed
				moved.status = "completed";
			} else {
				// finishedDate missing -> allow only if today >= due
				if (now < due) {
					alert("Không thể chuyển sang Completed: hôm nay chưa tới dueDate.");
					return;
				}
				// set finishedDate = today and status completed
				const todayStr = new Date().toISOString().split("T")[0];
				moved.finishedDate = todayStr;
				moved.status = "completed";
			}
		} else if (destCol === "in_progress") {
			// set dueDate = today if not set (or update) and set status
			const todayStr = new Date().toISOString().split("T")[0];
			moved.dueDate = todayStr;
			moved.status = "in_progress";
		} else {
			// moving to pending or other column
			moved.status = destCol as Task["status"];
		}

		// remove from sourceArr
		sourceArr.splice(source.index, 1);
		// insert into destArr at destination.index
		destArr.splice(destination.index, 0, moved);

		// The above is messy. Simpler approach: we already have mutated sourceArr and destArr but other columns unchanged.
		// Let's recompute fresh using the updated column arrays:
		const updatedColumns: Record<string, Task[]> = {
			pending: [],
			in_progress: [],
			completed: [],
		};
		// if sourceCol === destCol then we already modified sourceArr correctly and destArr is same array
		// Build updated columns:
		// Start from original colMap, but replace sourceCol with sourceArr and destCol with destArr:
		updatedColumns["pending"] = [
			...(sourceCol === "pending"
				? sourceArr
				: destCol === "pending"
				? destArr
				: colMap["pending"]),
		];
		updatedColumns["in_progress"] = [
			...(sourceCol === "in_progress"
				? sourceArr
				: destCol === "in_progress"
				? destArr
				: colMap["in_progress"]),
		];
		updatedColumns["completed"] = [
			...(sourceCol === "completed"
				? sourceArr
				: destCol === "completed"
				? destArr
				: colMap["completed"]),
		];

		// Now rebuild flat list maintaining column order
		const finalTasks: Task[] = [
			...updatedColumns["pending"],
			...updatedColumns["in_progress"],
			...updatedColumns["completed"],
		];

		setTasks(finalTasks);
		if (id) {
			localStorage.setItem(id, JSON.stringify(finalTasks));
		}
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
