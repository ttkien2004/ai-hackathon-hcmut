import type { Task } from "../data-types/Types";
// import { TASK_STORAGE_KEY as STORAGE_KEY } from "../storage_key/StorageKeys";

export interface ApiResponse<T> {
	data: T;
	status?: number;
	message?: string;
	error?: string;
}
const TaskApi = {
	getAll: (urlId: string): Task[] => {
		const tasks = localStorage.getItem(urlId);
		return tasks ? JSON.parse(tasks) : [];
	},
	addNewTask: async (
		urlId: string,
		taskData: Task
	): Promise<ApiResponse<Task>> => {
		const tasks = TaskApi.getAll(urlId);
		tasks.push(taskData);
		localStorage.setItem(urlId, JSON.stringify(tasks));
		return {
			data: taskData,
			message: "Add new task successfully",
		};
	},
	updateTask: async (
		urlId: string,
		id: string,
		updatedTask: Partial<Task>
	): Promise<string> => {
		let tasks = TaskApi.getAll(urlId);
		tasks = tasks.map((task) =>
			task.id === id ? { ...task, ...updatedTask } : task
		);
		localStorage.setItem(urlId, JSON.stringify(tasks));
		return "Update task successfully";
	},
	deleteTask: async (urlId: string, id: string): Promise<string> => {
		let tasks = TaskApi.getAll(urlId);
		tasks = tasks.filter((task) => task.id !== id);
		localStorage.setItem(urlId, JSON.stringify(tasks));
		return "Delete task successfully";
	},
};

export default TaskApi;
