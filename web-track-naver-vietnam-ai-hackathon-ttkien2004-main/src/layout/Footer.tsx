import React from "react";
import "../css/Footer.css";

const Footer: React.FC = () => {
	return (
		<footer className="app-footer">
			<p>© {new Date().getFullYear()} Smart To-Do App. All rights reserved.</p>
		</footer>
	);
};

export default Footer;
