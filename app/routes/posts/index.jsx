import { useLoaderData, Link } from 'remix'

//This funciton come from the server and we can fetch data or something that we want from the server.
export const loader = () => {
    const data = {
        posts: [
            { id: 1, title: 'Post 1', body: 'This is the body post 1' },
            { id: 2, title: 'Post 2', body: 'This is the body post 2' },
            { id: 3, title: 'Post 3', body: 'This is the body post 3' },
        ]
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
                        </Link>
                    </li>
                ))}
            </ul>

        </>
    )
}

export default PostItems