import "../css/Header.css";
import { Link } from "react-router-dom";

export const Header = () => {
	return (
		<header className="app-header">
			<div className="logo">Smart To-Do</div>
			{/* <nav className="nav-links">
				<Link to="/tasks">Tasks</Link>
				<Link to="/calendar">Calendar</Link>
				<Link to="/kanban">Kanban</Link>
			</nav> */}
		</header>
	);
};
