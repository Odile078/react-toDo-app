import { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const handleChangTaskInput = (e) => setTaskInput(e.target.value);
  const addTask = (e) => {
    e?.preventDefault();
    if (!taskInput.trim()) return;
    let taskArray = tasks.slice();
    taskArray.push({ checked: false, value: taskInput });
    setTasks(taskArray);
    setTaskInput("");
  };
  const deleteTask = (selectedTask) => {
    let taskArray = tasks.filter((task) => task !== selectedTask);
    setTasks(taskArray);
  };
  const markTaskDone = (selectedTaskIndex) => {
    let newTaskArray = tasks.map((task, index) => {
      if (index === selectedTaskIndex) {
        const newTask = { ...task, checked: !task.checked };
        task = newTask;
        return newTask;
      } else return task;
    });
    setTasks(newTaskArray);
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-gray-800 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-slate-300 text-center text-5xl font-bold">Todos</h1>
        <div className="mt-10 space-y-6">
          <form
            className="rounded-3xl  shadow-lg border-2 border-gray-300 flex py-4 px-10"
            onSubmit={addTask}
          >
            <div className="flex flex-1">
              <label for="new task" className="sr-only">
                To do task
              </label>
              <input
                type="text"
                id="new task"
                placeholder="Add todo"
                className="w-full outline-none focus:outline-none"
                value={taskInput}
                onChange={handleChangTaskInput}
              />
            </div>
            <button
              type="button"
              onClick={addTask}
              className=" bg-teal-500 rounded-full p-2"
            >
              <FaPlus className=" text-white text-base" />
            </button>
          </form>
          <div className="flex flex-col gap-4">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex gap-6 justify-between flex-wrap sm:flex-nowrap border-b border-gray-200 py-2"
              >
                <div className="flex gap-3">
                  <div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                      type="checkbox"
                      id={`checkbox${index + 1}`}
                      value=""
                      checked={task.checked ? true : false}
                      onChange={() => markTaskDone(index)}
                      aria-label="..."
                    />
                    <label class="sr-only" for={`checkbox${index + 1}`}>
                      {task.value}
                    </label>
                  </div>
                  <p
                    className={`text-lg ${task.checked ? "line-through" : ""}`}
                  >
                    {task.value}
                  </p>
                </div>
                <button
                  className="p-3 bg-gray-100 rounded-full h-fit "
                  onClick={() => deleteTask(task)}
                >
                  <FaTrash className="text-red-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
