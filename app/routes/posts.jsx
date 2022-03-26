import { Outlet, Links } from 'remix'
import globalStyleURL from '~/styles/global.css'

export const links = () => {
    return [{ rel: 'stylesheet', href: globalStyleURL }]
}
//This is our parent route so if user enter URL of http://192.168.1.10:3000/posts - he gets here
export default function posts() {
    return (
        <div>
            <h1>This is a parent route for posts</h1>
            <Outlet />
        </div>
    )
}