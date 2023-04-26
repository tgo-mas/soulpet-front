import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";

export function Root() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}