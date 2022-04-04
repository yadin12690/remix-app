import { useLoaderData, Link } from 'remix'
import { db } from '~/utils/db.server'

//This funciton come from the server and we can fetch data or something that we want from the server.
export const loader = async () => {
    const data = {
        posts: await db.post.findMany({
            take: 20, // Will take only 20 posts.
            select: { id: true, title: true, createdAt: true }, // This will specify which fields to get.
            orderBy: { createdAt: 'desc' } // This will set the data we get in desc order.
        })
    }
    return data;
}
function PostItems() {
    const { posts } = useLoaderData();
    return (
        <>
            <div className='page-header'>
                <h1>This is post items route(index)</h1>
                <Link to='/posts/new' className='btn'>New Post</Link>
            </div>
            <ul className='posts-list'>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={post.id}>
                            <h3>{post.title}</h3>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </Link>
                    </li>
                ))}
            </ul>

        </>
    )
}

export default PostItems