import { useContext } from "react"

import SideBar from "./Components/Sidebar";
import NoProject from "./Components/NoProject";
import NewProject from "./Components/NewProject";
import EditProject from "./Components/EditProject";
import { ProjectContext } from "./contexts/ProjectContext";


function App() {

  const { noProject, newProject, editingProject } = useContext(ProjectContext)

  return (
    <>

      <main className="flex">
        <SideBar />
        <section className="flex flex-col items-center w-4/5 h-screen mt-20">
          {noProject && <NoProject />}
          {newProject && <NewProject />}
          {editingProject && <EditProject />}
        </section>
      </main >

    </>
  );
}

export default App;