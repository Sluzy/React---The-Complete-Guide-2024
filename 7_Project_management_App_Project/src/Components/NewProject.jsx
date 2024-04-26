import { useContext } from "react"
import { ProjectContext } from "../contexts/ProjectContext"

export default function NewProject() {

    const { titleInput, descriptionInput, dateInput, saveNewProject, handleInputChange, cancelNewProject } = useContext(ProjectContext);

    function handleSubmit(e) {
        e.preventDefault();
        saveNewProject();
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full md:w-3/5 lg:w-2/5">
                <h2 className="text-2xl font-bold">Create a New Project</h2>

                <div className="mt-5">
                    <label htmlFor="title" className="uppercase block text-sm font-bold">Title</label>
                    <input
                        className="bg-gray-100 border border-gray-300 focus:border-blue-500 rounded w-full py-2 px-3 focus:outline-none mt-1"
                        type="text"
                        id="title"
                        onChange={(e) => handleInputChange(e, "titleInput")}
                        value={titleInput}
                        required
                    />
                </div>

                <div className="mt-5">
                    <label htmlFor="description" className="uppercase block text-sm font-bold">Description</label>
                    <textarea
                        className="bg-gray-100 border border-gray-300 rounded w-full h-40 p-2 resize-none focus:outline-none focus:border-blue-500"
                        id="description"
                        onChange={(e) => handleInputChange(e, "descriptionInput")}
                        value={descriptionInput}
                        required
                    ></textarea>
                </div>

                <div className="mt-5">
                    <label htmlFor="date" className="uppercase block text-sm font-bold">Due Date</label>
                    <input
                        className="bg-gray-100 border border-gray-300 focus:border-blue-500 rounded w-full py-2 px-3 focus:outline-none"
                        type="date"
                        id="date"
                        onChange={(e) => handleInputChange(e, "dateInput")}
                        value={dateInput}
                        max="9999-12-31"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <span>
                        <button
                            className="bg-stone-800 hover:bg-stone-700 text-white font-semibold py-2 px-4 rounded transition duration-300 mt-5"
                            onClick={cancelNewProject}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-stone-800 hover:bg-stone-700 text-white font-semibold py-2 px-4 rounded transition duration-300 mt-5 ml-2"
                            type="submit"
                        >
                            Save
                        </button>
                    </span>
                </div>
            </form>
        </>
    )
}