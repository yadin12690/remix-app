import { Link, useLoaderData, redirect } from 'remix'
import { db } from '~/utils/db.server'

export const loader = async ({ params }) => {
    // Here we fetch spesific post when user click in the posts list.
    const post = await db.post.findUnique({
        where: { id: params.postId }
    })

    if (!post) throw new Error('Post not found :(');

    const data = { post };
    return data;
}

export const action = async ({ request, params }) => {
    const form = await request.formData();
    if (form.get('_method') === 'delete') {
        const post = await db.post.findUnique({
            where: { id: params.postId }
        })

        if (!post) throw new Error('Post not found :(');

        await db.post.delete({ where: { id: params.postId } });
        return redirect('/posts');
    }
}


// We get to this route if the user enter URL like http://192.168.1.10:3000/posts/random123
// Notice we declare dynamic routes with dollar sign
export default function Post() {
    const { post } = useLoaderData();
    return (
        <div>
            <div className='page-header'>
                <h1>{post.title}</h1>
                <Link to='/posts' className='btn btn-reverse'>Back to posts list</Link>
            </div>
            <div className="page-content">
                {post.body}
            </div>
            <div className="page-footer">
                <form method='POST'>
                    <input type='hidden' name='_method' value='delete' />
                    <button className="btn btn-delete">Delete post</button>
                </form>
            </div>
        </div>
    )
}