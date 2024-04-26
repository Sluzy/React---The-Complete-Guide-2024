import { createContext, useReducer } from "react"

export const ProjectContext = createContext();

const INITIAL_STATE = {
    // General project state
    projects: [
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
    ],

    // Selected project state
    selectedProject: null,

    // Input states
    titleInput: "",
    descriptionInput: "",
    dateInput: "",

    // Task State
    task: "",

    // States to check what should be rendered in content - defualt no project renders
    noProject: true,
    newProject: false,
    editingProject: false,

}


function projectReducer(state, action) {
    switch (action.type) {
        case "INPUT_CHANGE":
            const { inputName, value } = action.payload;
            return {
                ...state,
                [inputName]: value,
            };

        case "SAVE_NEW_PROJECT": {

            const { titleInput, descriptionInput, dateInput, projects } = state;

            //  Create new project and set project and set selecetedProject states    
            const newProject = {
                title: titleInput,
                description: descriptionInput,
                date: dateInput,
                tasks: []
            };
            return {
                ...state,

                // Update project and selectedProject states to the created project
                projects: [...projects, newProject],
                selectedProject: newProject,

                // Reset inputs
                titleInput: "",
                descriptionInput: "",
                dateInput: "",

                // Update render states
                editingProject: true,
                newProject: false,
                noProject: false,
            };
        }
        case "PROJECT_CLICK_HANDLER":
            return {
                ...state,
                selectedProject: action.payload,

                editingProject: true,
                newProject: false,
                noProject: false,
            };

        case "CREATE_NEW_PROJECT":
            return {
                ...state,
                newProject: true,
                noProject: false,
                editingProject: false,
            };

        case "CANCEL_NEW_PROJECT":
            return {
                ...state,
                statenoProject: true,
                newProject: false,
                editingProject: false,
            };

        case "REMOVE_TASK": {

            const { taskIndex } = action.payload;
            const { selectedProject } = state;

            if (!selectedProject) {
                return state
            }

            // Select task
            const updatedTasks = selectedProject.tasks.filter((_, index) => index !== taskIndex);
            // Update the selected project's tasks
            const updatedSelectedProject = { ...selectedProject, tasks: updatedTasks };
            // update projects
            const updatedProjects = state.projects.map(project => project.title === state.selectedProject.title ? updatedSelectedProject : project)

            return {
                ...state,
                selectedProject: updatedSelectedProject,
                projects: updatedProjects
            };
        }
        case "ADD_TASK": {
            const { newTask } = action.payload;
            const { selectedProject, projects } = state;

            if (!selectedProject) {
                return state;
            }

            // create a new list of tasks for the selected project
            const updatedTasks = [newTask, ...selectedProject.tasks];

            // Update the selected project with this new list of tasks
            const updatedSelectedProject = { ...selectedProject, tasks: updatedTasks };

            const updatedProjects = projects.map(project => project.title === selectedProject.title ? updatedSelectedProject : project)

            return {
                ...state,
                selectedProject: updatedSelectedProject,
                projects: updatedProjects
            }
        }

        case "DELETE_PROJECT": {

            const { projectTitle } = action.payload;
            const { projects } = state;

            // Filter out the project with the given title, and update projects state
            const updatedProjects = projects.filter(item => item.title !== projectTitle);

            // Select first project if any is left or set noProject state
            if (updatedProjects.length > 0) {
                return {
                    ...state,
                    projects: updatedProjects,
                    noProject: true,
                    editingProject: false,
                    newProject: false,
                    selectedProject: updatedProjects[0]
                }
            } else {
                return {
                    ...state,
                    projects: updatedProjects,
                    noProject: true,
                    editingProject: false,
                    newProject: false,
                    selectedProject: (null)
                }
            }
        }

        case "UPDATE_PROJECT_DESCRIPTION":

            const { projects } = state;
            const { updatedDescription, projectTitle } = action.payload;

            const updatedProjects = projects.map(project =>
                projectTitle === project.title ? { ...project, description: updatedDescription } : project)

            return {
                ...state,
                projects: updatedProjects
            }

        default:
            return state;
    }
}


export default function ProjectContextProvider({ children }) {

    const [state, dispatch] = useReducer(projectReducer, INITIAL_STATE);
    const { projects, selectedProject, titleInput, descriptionInput, dateInput, task, noProject, newProject, editingProject } = state;

    // Handler Functions

    //  Changehandler for inputs in new project component
    function handleInputChange(e, inputName) {
        dispatch({
            type: "INPUT_CHANGE",
            payload: {
                inputName: inputName,
                value: e.target.value
            }
        })
    }

    function saveNewProject(e) {
        dispatch({
            type: "SAVE_NEW_PROJECT"
        });
    }

    function projectClickHandler(project) {
        dispatch({
            type: "PROJECT_CLICK_HANDLER",
            payload: project
        })
    }

    function createNewProject() {
        dispatch({
            type: "CREATE_NEW_PROJECT"
        })
    }

    function cancelNewProject() {
        dispatch({
            type: "CANCEL_NEW_PROJECT"
        })
    }

    function removeTask(taskIndex) {
        dispatch({
            type: "REMOVE_TASK",
            payload: { taskIndex }
        })
    }

    function addTask(newTask) {
        dispatch({
            type: "ADD_TASK",
            payload: { newTask }
        })
    }

    function handleAddTask(newTask, callback) {
        addTask(newTask);

        if (callback) {
            callback();
        }
    }

    function deleteProject(projectTitle) {
        dispatch({
            type: "DELETE_PROJECT",
            payload: { projectTitle }
        })
    }

    function updateProjectDescription(updatedDescription, projectTitle) {
        dispatch({
            type: "UPDATE_PROJECT_DESCRIPTION",
            payload: { updatedDescription, projectTitle }
        })
    }


    const contextValue = {
        // states
        projects,
        selectedProject,
        titleInput,
        descriptionInput,
        dateInput,
        task,
        noProject,
        newProject,
        editingProject,

        // functions
        handleInputChange,
        saveNewProject,
        projectClickHandler,
        createNewProject,
        cancelNewProject,
        removeTask,
        addTask,
        handleAddTask,
        deleteProject,
        updateProjectDescription
    }

    return <ProjectContext.Provider value={contextValue}>
        {children}
    </ProjectContext.Provider>
}