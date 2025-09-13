import KanbanView from "../components/KanbanView";
import type { Task } from "../data-types/Types";
import { useState } from "react";

const KanbanPage = () => {
	const [tasks, setTasks] = useState<Task[]>([
		{
			id: "6835095353805006",
			title: "Learn React",
			description: "Hello",
			status: "pending",
			finishedDate: "2025-09-21",
			dueDate: "2025-09-20",
			priority: "medium",
		},
	]);
	return (
		<div className="d-flex">
			{/* <Sidebar /> bạn đã làm rồi */}
			<div className="flex-grow-1 p-3">
				<KanbanView tasks={tasks} setTasks={setTasks} />
			</div>
		</div>
	);
};
export default KanbanPage;
