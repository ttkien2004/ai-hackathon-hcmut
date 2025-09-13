import { Header } from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export const DefaultLayoyt = () => {
	return (
		<div
			style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
		>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};
export default DefaultLayoyt;
