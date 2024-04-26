export default function NoProject({ newProject }) {
    return (
        <>
            <div className="flex flex-col items-center h-screen">
                <img className="h-24 mb-8" src="logo.png" alt="Picture of a notepad" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">No Project Selected</h2>
                <p className="text-lg text-gray-600 mb-6">Select a project or get started with a new one</p>
                <button
                    className="bg-stone-800 hover:bg-stone-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                    onClick={newProject}
                >
                    Create New Project
                </button>
            </div>
        </>
    )
}
