import React, { lazy } from "react";
import DefaultLayout from "./layout/DefaultLayout";
import type { RouteObject } from "react-router-dom";

// Lazy load các page
const TaskPage = lazy(() => import("./pages/TaskListPage"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const ErrorBoundary = lazy(() => import("./layout/ErrorBoundary"));
const StatsPage = lazy(() => import("./pages/StatsPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const TestPage = lazy(() => import("./pages/TestPage"));
const KanbanPage = lazy(() => import("./pages/KanbanPage"));

const routes: RouteObject[] = [
	{
		path: "/",
		index: true,
		element: React.createElement(HomePage),
	},
	// {
	// 	path: "/tasks",
	// 	element: React.createElement(TaskPage),
	// },
	{
		path: "/calendar/:id",
		element: React.createElement(CalendarPage),
	},
	{
		path: "/stats",
		element: React.createElement(StatsPage),
	},
	{
		path: "/tasks/:id",
		element: React.createElement(TaskPage),
	},
	{
		path: "/test",
		element: React.createElement(TestPage),
	},
	{
		path: "/kanban/:id",
		element: React.createElement(KanbanPage),
	},
];

const routesWithLayout: RouteObject[] = [
	{
		path: "/",
		element: React.createElement(DefaultLayout),
		children: routes,
		errorElement: React.createElement(ErrorBoundary),
	},
];
export default routesWithLayout;
