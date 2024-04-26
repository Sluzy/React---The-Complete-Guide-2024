import { Outlet } from "react-router-dom"
import MainNav from "../components/MainNav"


export default function Root() {
    return (
        <>
            <MainNav />
            <main>
                <Outlet />
            </main>
        </>
    )
}