import "./App.css";
// import hackathonGraphic from './assets/hackathon-graphic.svg'
// import naverLogo from './assets/naver-logo.svg'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";

function App() {
	return <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>;
}

export default App;
