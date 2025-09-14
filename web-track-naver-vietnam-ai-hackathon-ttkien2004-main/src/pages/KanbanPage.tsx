import KanbanView from "../components/KanbanView";

const KanbanPage = () => {
	return (
		<div className="d-flex">
			{/* <Sidebar /> bạn đã làm rồi */}
			<div className="flex-grow-1 p-3">
				<KanbanView />
			</div>
		</div>
	);
};
export default KanbanPage;
