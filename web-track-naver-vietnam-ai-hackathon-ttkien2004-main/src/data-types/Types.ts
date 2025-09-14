export interface Task {
	id: string;
	title: string;
	description?: string;
	status: "pending" | "in_progress" | "completed";
	dueDate?: string;
	finishedDate?: string;
	priority?: "low" | "medium" | "high";
	estimatedTime?: number; // in hours
	type?: "task" | "personal" | "";
}

export interface Personal {
	id: string;
	title: string;
	description?: string;
	status: "pending" | "in-progress" | "completed";
	dueDate?: string;
	priority?: "low" | "medium" | "high";
	estimatedTime?: number; // in hours
	actualMinutesSpent?: number;
	createdAt?: string;
	updatedAt?: string;
}

export interface Book {
	id: string;
	author: string;
	title: string;
	description: string;
	status: "pending" | "in_progress" | "completed";
	totalOfPages: number;
	pagesHaveRead: number;
}
