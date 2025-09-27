const PostLectureReview = () => {
  // TODO: Fetch all questions + answers for a meeting
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Post Lecture Review</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>What is horizontal scaling?</td>
              <td>Adding more servers to handle load</td>
              <td><span className="badge badge-success">Answered</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostLectureReview;
