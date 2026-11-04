import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_TASKS } from './graphql/queries';
import { CREATE_TASK, COMPLETE_TASK } from './graphql/mutations';

export default function App() {
  const [title, setTitle] = useState('');

  const { loading, error, data } = useQuery(GET_ALL_TASKS);

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });

  const [completeTask] = useMutation(COMPLETE_TASK, {
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    createTask({ variables: { title } });
    setTitle('');
  };

  if (loading) return <p style={{ padding: 20 }}>Загрузка</p>;
  if (error) return <p style={{ padding: 20, color: 'red' }}>Ошибка:{error.message}</p>;

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Менеджер задач</h1>

      <form onSubmit={handleCreate} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Название задачи..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '250px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Создать</button>
      </form>

      <ul>
        {data.allTasks.map((task) => (
          <li key={task.id} style={{ marginBottom: 10 }}>
            <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
              <strong>{task.title}</strong> ({task.category ? task.category.name : 'Без категории'})
            </span>
            {!task.isCompleted && (
              <button
                onClick={() => completeTask({ variables: { id: task.id } })}
                style={{ marginLeft: 10 }}
              >
                Завершить
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}