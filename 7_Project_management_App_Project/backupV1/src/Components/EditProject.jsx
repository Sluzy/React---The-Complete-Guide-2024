import { useState, useEffect } from "react";
import ReactDOM from 'react-dom';

export default function EditProject({ project, removeTask, addTask, deleteProject, updateDescription }) {

    const [newTaskInput, setNewTaskInput] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const [isEditable, setIsEditable] = useState(false);
    const [editableDescription, setEditableDescription] = useState(project.description);

    function changeHandler(e) {
        setNewTaskInput(e.target.value);
        if (showAlert) setShowAlert(false);
    }

    function clearInput() {
        setNewTaskInput("");
    }

    function addTaskHandler() {
        if (newTaskInput.trim() === "") {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
            return;
        }
        addTask(newTaskInput, clearInput);
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function openDeleteModal() {
        setShowDeleteModal(true);

    }
    function closeDeleteModal() {
        setShowDeleteModal(false);
    }

    function deleteHandler() {
        deleteProject(project.title);
        closeDeleteModal();
    }

    const deleteModal = (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50" onClick={closeDeleteModal}>
            <dialog open={showDeleteModal} className="rounded-lg p-6 bg-white shadow-md w-1/4 m-auto z-50" onClick={e => e.stopPropagation()} onClose={closeDeleteModal}>
                <h3 className="text-xl font-bold text-gray-800">Confirm Deletion</h3>
                <p className="text-md text-gray-600 my-4">Are you sure you want to delete this project?</p>
                <div className="flex justify-end mt-4">
                    <button onClick={closeDeleteModal} className="bg-stone-700 hover:bg-stone-600 text-white font-semibold py-2 px-4 rounded transition duration-300 mr-2">
                        Cancel
                    </button>
                    <button onClick={deleteHandler} className="bg-stone-800 hover:bg-stone-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
                        Delete
                    </button>
                </div>
            </dialog>
        </div>
    )

    function handleDescriptionChange(e) {
        setEditableDescription(e.target.value);
    }

    function toggleEdit() {
        if (isEditable) {
            // When saving, call updateDescription to update the selected project
            updateDescription(editableDescription, project.title);
        } else {
            // When switching to edit mode, update the local state to the current description
            setEditableDescription(project.description);
        }
        setIsEditable(!isEditable);
    }

    useEffect(() => {
        // Update the editableDescription whenever the project prop changes
        setEditableDescription(project.description);
        setIsEditable(false); // Reset the edit state
    }, [project]);

    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-3/5 lg:w-2/5">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{project.title}</h2>
                    <button
                        className="bg-stone-800 hover:bg-stone-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                        onClick={openDeleteModal}
                    >
                        Delete
                    </button>

                </div>
                <p className="text-md text-gray-600 mb-4">{project.date}</p>
                <textarea
                    className="bg-gray-100 border border-gray-300 rounded w-full h-40 p-2 resize-none focus:outline-none focus:border-blue-500"
                    id="description"
                    readOnly={!isEditable}
                    value={editableDescription}
                    onChange={handleDescriptionChange}
                ></textarea>

                <div className="flex justify-end">
                    <button
                        className="bg-stone-700 hover:bg-stone-600 text-white font-semibold py-2 px-5 rounded transition duration-300 whitespace-nowrap"
                        onClick={toggleEdit}
                    >{isEditable ? "Save" : "Edit"}</button>
                </div>

                <h3 className="text-xl font-bold mt-6 mb-4">Tasks</h3>

                {showAlert && (
                    <div className="text-red-600 text-sm my-2">
                        Please enter a task before adding.
                    </div>
                )}
                <div className="flex items-center mb-4">
                    <input
                        className="bg-gray-100 border border-gray-300 focus:border-blue-500 rounded w-full py-2 px-3 mr-4 focus:outline-none"
                        type="text"
                        value={newTaskInput}
                        onChange={changeHandler}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        className="bg-stone-700 hover:bg-stone-600 text-white font-semibold py-2 px-7 rounded transition duration-300 whitespace-nowrap"
                        onClick={addTaskHandler}
                    >
                        Add Task
                    </button>
                </div>

                <div className="space-y-2">
                    {project.tasks.map((task, index) => (
                        <div className="flex justify-between items-center bg-gray-50 p-2 rounded" key={index}>
                            <p>{task}</p>
                            <button
                                className="bg-stone-800 hover:bg-stone-700 text-white font-semibold py-1 px-3 rounded transition duration-300"
                                onClick={() => removeTask(index)}
                            >
                                Clear
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {showDeleteModal && ReactDOM.createPortal(
                deleteModal,
                document.getElementById('modal-root')
            )}
        </>
    );
}