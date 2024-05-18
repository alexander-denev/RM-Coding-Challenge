import { Outlet } from "react-router-dom"

export default function MainLayout() {
    return (
        <>
            <h1>This is the main layout in action!</h1>
            <Outlet />
        </>
    )
}
