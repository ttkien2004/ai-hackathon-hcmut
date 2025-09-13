import { useState } from "react";
import CalendarView from "../components/CalendarView";
import type { Task } from "../data-types/Types";

const CalendarPage = () => {
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
				<CalendarView type="" />
			</div>
		</div>
	);
};
export default CalendarPage;
