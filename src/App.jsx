import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Task from "./components/Task";
import { v4 } from "uuid";

function App() {
  const [tasks, setTask] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  //Utilizando o localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //API para teste
  useEffect(() => {
    const featTasks = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setTask(data);
    };
    // featTasks();
    //função no qual exita uma API,(acima um a API para testes)
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //atualizar esta tarefa
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      //nao precisa atualizar esta tarefa
      return task;
    });
    setTask(newTasks);
  }
  function onDeleteTaskCLick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTask(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTask([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Task
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskCLick={onDeleteTaskCLick}
        />
      </div>
    </div>
  );
}
export default App;
