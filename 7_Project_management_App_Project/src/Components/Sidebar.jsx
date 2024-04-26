import { useContext } from "react"
import { ProjectContext } from "../contexts/ProjectContext"

export default function SideBar() {

    const { projects, createNewProject, projectClickHandler } = useContext(ProjectContext)

    return (
        <>
            <div className="bg-stone-900 text-white m-h-screen w-1/5 mt-10 rounded-tr-lg flex flex-col items-center shadow-lg">
                <h1 className="text-2xl font-semibold mt-5 mb-8">
                    Your Projects
                </h1>
                <button
                    className="bg-stone-700 hover:bg-stone-600 text-white font-bold py-2 px-4 rounded inline-flex items-center mb-5"
                    onClick={createNewProject}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 mr-2">
                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                    </svg>
                    Add Project
                </button>
                <ul className="w-full px-4">
                    {projects.map((project, index) => (
                        <li
                            className="py-2 rounded-md bg-stone-800 hover:bg-stone-700 text-center mb-1 cursor-pointer transition-colors duration-300"
                            key={index}
                            onClick={() => projectClickHandler(project)}
                        >
                            {project.title}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
