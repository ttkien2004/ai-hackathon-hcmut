import React, { lazy } from "react";
import DefaultLayout from "./layout/DefaultLayout";
import type { RouteObject } from "react-router-dom";

// Lazy load các page
const TaskPage = lazy(() => import("./pages/TaskListPage"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const ErrorBoundary = lazy(() => import("./layout/ErrorBoundary"));
const HomePage = lazy(() => import("./pages/HomePage"));
const KanbanPage = lazy(() => import("./pages/KanbanPage"));
const BookPage = lazy(() => import("./pages/BookListPage"));
const ProgressViewPage = lazy(() => import("./pages/ProgressPage"));
const StatisticsViewPage = lazy(() => import("./pages/StatisticsPage"));

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
		path: "/tasks/:id",
		element: React.createElement(TaskPage),
	},
	{
		path: "/kanban/:id",
		element: React.createElement(KanbanPage),
	},
	{
		path: "/books/:id",
		element: React.createElement(BookPage),
	},
	{
		path: "/progress/:id",
		element: React.createElement(ProgressViewPage),
	},
	{
		path: "/stats/:id",
		element: React.createElement(StatisticsViewPage),
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
