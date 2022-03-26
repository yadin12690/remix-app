import { Outlet } from 'remix'

function Posts() {
    return (
        <>
            {/* This is nested route, everything that have posts/ will be under this route */}
            <Outlet />
        </>
    )
}

export default Posts