import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import type { View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { Task } from "../data-types/Types";
import { useParams } from "react-router-dom";

const locales = {
	"en-US": import("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // tuần bắt đầu từ Thứ 2
	getDay,
	locales,
});

const CalendarView = () => {
	const [view, setView] = useState<View>("week"); // view mặc định
	const [date, setDate] = useState(new Date()); // ngày hiện tại
	const [tasks, setTasks] = useState<Task[]>([]);
	const { id } = useParams<{ id: string }>();
	// Map Task -> Event cho Calendar
	const events = tasks.map((task) => ({
		id: task.id,
		title: task.title,
		start: new Date(task.dueDate ?? new Date()), // bắt buộc dạng Date
		end: new Date(task.finishedDate ?? task.dueDate ?? new Date()), // nếu chưa có finishedDate thì end = dueDate
		allDay: false,
	}));

	useEffect(() => {
		const data = localStorage.getItem(id || "")
			? JSON.parse(localStorage.getItem(id || "") ?? "")
			: [];
		setTasks(data);
	}, []);

	return (
		<div style={{ height: "80vh" }}>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				view={view}
				date={date}
				onView={(newView) => setView(newView)}
				onNavigate={(newDate) => setDate(newDate)}
				views={["day", "week", "month"]}
				style={{ background: "white", borderRadius: "8px", padding: "10px" }}
			/>
		</div>
	);
};

export default CalendarView;
