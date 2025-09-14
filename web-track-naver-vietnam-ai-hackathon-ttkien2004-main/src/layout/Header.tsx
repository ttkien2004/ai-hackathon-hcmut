import "../css/Header.css";
import { Link } from "react-router-dom";

export const Header = () => {
	return (
		<header className="app-header">
			{/* <div className="logo">Smart To-Do</div> */}
			<Link className="logo" to={"/"}>
				Smart To-do
			</Link>
		</header>
	);
};
