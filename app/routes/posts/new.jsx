import { Link, redirect } from "remix"

// In this action method we get when user submit the form, this is Remix hook.
export const action = async ({ request }) => { // In requrest we get can get user data and more.
    const form = await request.formData(); // Here we wait until form is send data to server and than we have the data user sent.

    console.log(form); // This console log the form data in the console of the IDE because is server side!

    return redirect('/posts'); // At the end, when post is added we redirect user to Post list using redirect hook from Remix.
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
                        <input type='text' name='postTitle' id="title"></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor='body'>Body</label>
                        <textarea name='postBody' id="body"></textarea>
                    </div>
                    <button type='submit' className="btn btn-block">Add Post!</button>
                </form>
            </div>
        </>
    )
}

export default NewPost