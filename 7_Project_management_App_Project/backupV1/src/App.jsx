import { useState, useRef } from "react"
import SideBar from "./Components/Sidebar";
import NoProject from "./Components/NoProject";
import NewProject from "./Components/NewProject";
import EditProject from "./Components/EditProject";

function App() {

  const [projects, setProjects] = useState([
    {
      title: "Test 1",
      description: "TEST 1 Lorem ipsum dolor",
      date: "11-12-21",
      tasks: ["Task 1", "Task 1", "Task 3"]
    },
    {
      title: "Test 2",
      description: "TEST 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit.Nobis laboriosam iure culpa! Qui ea distinctio fugiat aperiam.Nobis magni ut iure porro fugit odio ad, iusto doloremque tempora illum eligendi. Nam officia ex nostrum iusto quod.Animi rem rerum asperiores voluptates cum illum veritatis, porro numquam tempore ipsum vitae debitis optio ullam et pariatur aspernatur assumenda voluptate dolore",
      date: "11-12-10",
      tasks: ["Task 1", "Task 2", "Task 3"]
    },
    {
      title: "Test 3",
      description: "TEST 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit.Nobis laboriosam iure culpa! Qui ea distinctio fugiat aperiam.Nobis magni ut iure porro fugit odio ad, iusto doloremque tempora illum eligendi. Nam officia ex nostrum iusto quod.Animi rem rerum asperiores voluptates cum illum veritatis, porro numquam tempore ipsum vitae debitis optio ullam et pariatur aspernatur assumenda voluptate dolore",
      date: "11-12-13",
      tasks: ["Task 1", "Task 2", "Task 3"]
    }

  ]);

  // Selected project state
  const [selectedProject, setSelectedProject] = useState()

  // Input states
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  // Handle tasks
  const [task, setTask] = useState("");

  // Checks what should be rendered in content - defualt no project renders
  const [noProject, setNoProject] = useState(true);
  const [newProject, setNewProject] = useState(false);
  const [editingProject, setEditingProject] = useState(false);

  //  Changehandler for inputs in new project component
  function changeHandler(e, inputName) {
    switch (inputName) {
      case 'title':
        setTitleInput(e.target.value);
        break;

      case 'description':
        setDescriptionInput(e.target.value);
        break;

      case 'date':
        setDateInput(e.target.value);
        break;

      default:
        break;
    }
  }

  function saveNewProject(e) {
    //  Create new project and set project and selecetedProject states
    const newProject = {
      title: titleInput,
      description: descriptionInput,
      date: dateInput,
      tasks: []
    };
    setProjects([...projects, newProject]);
    setSelectedProject(newProject)

    // Reset inputs
    setTitleInput("");
    setDescriptionInput("");
    setDateInput("");

    // Update view states
    setNewProject(false);
    setEditingProject(true)
    setNoProject(false);
  }

  function projectClickHandler(project) {
    setSelectedProject(project)
    setEditingProject(true);
    setNewProject(false);
    setNoProject(false);
  }

  function createNewProject() {
    setNewProject(true);
    setNoProject(false);
    setEditingProject(false);
  }

  function cancelNewProject() {
    setNoProject(true);
    setNewProject(false);
    setEditingProject(false);
  }

  function removeTask(taskIndex) {
    const updatedTasks = selectedProject.tasks.filter((_, index) => index !== taskIndex);

    // Update the selected project's tasks
    const updatedSelectedProject = { ...selectedProject, tasks: updatedTasks };

    // Update the state of selectedProject
    setSelectedProject(updatedSelectedProject);

    // Also update the projects array in the state
    setProjects(currentProjects =>
      currentProjects.map(project =>
        project.title === selectedProject.title ? updatedSelectedProject : project
      )
    );
  }


  function addTask(newTask, callback) {
    // First, create a new list of tasks for the selected project
    const updatedTasks = [newTask, ...selectedProject.tasks];

    // Next, update the selected project with this new list of tasks
    const updatedSelectedProject = { ...selectedProject, tasks: updatedTasks };

    // Now, update the array of projects with this updated project
    setProjects(currentProjects => currentProjects.map(project => {
      if (project.title === selectedProject.title) {
        return updatedSelectedProject;
      }
      return project;
    }));

    // Finally, update the selected project state
    setSelectedProject(updatedSelectedProject);

    if (callback) {
      callback();
    }
  }

  function deleteProject(projectTitle) {
    // Filter out the project with the given title, and update projects state
    const updatedProjects = projects.filter(item => item.title !== projectTitle);
    setProjects(updatedProjects);

    // Select first project or set noProject state
    if (updatedProjects.length > 0) {
      setSelectedProject(updatedProjects[0])
    } else {
      setNoProject(true);
      setEditingProject(false);
      setNewProject(false);
      setSelectedProject(null);
    }
  }

  function updateProjectDescription(updatedDescription, projectTitle) {
    setProjects(currentProjects =>
      currentProjects.map(project =>
        project.title === projectTitle ? { ...project, description: updatedDescription } : project
      )
    );
  }


  return (
    <>

      <main className="flex">

        <SideBar projects={projects} newProject={createNewProject} projectClickHandler={projectClickHandler} />

        <section className="flex flex-col items-center w-4/5 h-screen mt-20">


          {noProject && <NoProject newProject={createNewProject} />}

          {newProject && <NewProject
            titleInput={titleInput}
            descriptionInput={descriptionInput}
            dateInput={dateInput}
            saveNewProject={saveNewProject}
            cancelNewProject={cancelNewProject}
            onChange={changeHandler}
          />}

          {editingProject && <EditProject project={selectedProject} removeTask={removeTask} addTask={addTask} deleteProject={deleteProject} updateDescription={updateProjectDescription} />}

        </section>

      </main >

    </>
  );
}

export default App;