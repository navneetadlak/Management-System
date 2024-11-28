import React, { useEffect, useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`/api/tasks?page=${page}&limit=5`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [page]);

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 0}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default TaskList;
