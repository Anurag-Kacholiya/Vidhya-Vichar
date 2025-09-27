const FacultyMeetingBoard = () => {
  // TODO: Fetch questions for this meeting from backend
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Live Q&A Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Example sticky notes */}
        <div className="card bg-yellow-100 shadow p-4">
          <p className="font-semibold">What is CAP Theorem?</p>
          <div className="mt-2 flex gap-2">
            <button className="btn btn-success btn-xs">Mark Answered</button>
            <button className="btn btn-warning btn-xs">Mark Important</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyMeetingBoard;
