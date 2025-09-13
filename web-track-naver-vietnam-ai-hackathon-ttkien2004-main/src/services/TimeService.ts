const TimeApi = {
	daysLeft: (dueDate: string, finishedDate: string): number => {
		const due = new Date(dueDate).getTime();
		const finished = new Date(finishedDate).getTime();

		// số ngày còn lại
		return Math.ceil((due - finished) / (1000 * 60 * 60 * 24));
	},
	timeLeft: (dueDate: string, finishedDate: string): string => {
		const due = new Date(dueDate);
		const finished = new Date(finishedDate);

		// lấy ngày hôm nay (không tính giờ phút giây)
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const dueDay = new Date(due);
		dueDay.setHours(0, 0, 0, 0);

		// nếu dueDate sau hôm nay -> chưa tới hạn
		if (dueDay.getTime() > today.getTime()) {
			return "Chưa tới hạn";
		}

		// nếu khác ngày -> tính theo ngày
		if (
			due.getFullYear() !== finished.getFullYear() ||
			due.getMonth() !== finished.getMonth() ||
			due.getDate() !== finished.getDate()
		) {
			const diff = Math.ceil(
				(due.getTime() - finished.getTime()) / (1000 * 60 * 60 * 24)
			);
			return diff >= 0 ? `${diff} ngày` : "Quá hạn";
		}

		// nếu cùng ngày -> tính số giờ còn lại đến 23:59 hôm đó
		const deadline = new Date(due);
		deadline.setHours(23, 59, 59, 999);

		const now = new Date(); // thời điểm hiện tại
		const diffHours = Math.floor(
			(deadline.getTime() - now.getTime()) / (1000 * 60 * 60)
		);

		return diffHours >= 0 ? `${diffHours} giờ` : "Quá hạn";
	},
};
export default TimeApi;
