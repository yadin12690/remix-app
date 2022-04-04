import { Link, redirect } from "remix"
import { db } from '~/utils/db.server'

// In this action method we get when user submit the form, this is Remix hook.
export const action = async ({ request }) => { // In requrest we get can get user data and more.
    const form = await request.formData(); // Here we wait until form is send data to server and than we have the data user sent.
    const title = form.get('title');
    const body = form.get('body');

    const formFields = { title, body };

    const post = await db.post.create({ data: formFields });
    return redirect(`/posts/${post.id}`); // At the end, when post is added we redirect user to Post list using redirect hook from Remix.
}

function NewPost() {
    return (
        <>
            <div className="page-header">
                <h1>New Post</h1>
                <Link to='/posts' className="btn btn-reverse">
                    Back to post list
                </Link>
            </div>

            <div className="page-content">
                <form method='POST'>
                    <div className="form-control">
                        <label htmlFor='title'>Title</label>
                        <input type='text' name='title' id="title"></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor='body'>Body</label>
                        <textarea name='body' id="body"></textarea>
                    </div>
                    <button type='submit' className="btn btn-block">Add Post!</button>
                </form>
            </div>
        </>
    )
}

export default NewPost