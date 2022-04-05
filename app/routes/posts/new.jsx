import { Link, redirect, useActionData, json } from "remix"
import { db } from '~/utils/db.server'


const validateTitle = (title) => {
    if (typeof title !== 'string' || title.length < 3) {
        return 'Title to short, needs to be at least 4 characters';
    }
}

const validateBody = (body) => {
    if (typeof body !== 'string' || body.length < 10) {
        return 'Body to short, needs to be at least 10 characters';
    }
}

function badRequest(data) {
    return json(data, { status: 400 });
}

// In this action method we get when user submit the form, this is Remix hook.
export const action = async ({ request }) => { // In requrest we get can get user data and more.
    const form = await request.formData(); // Here we wait until form is send data to server and than we have the data user sent.

    // That code get the values from the submited form
    const title = form.get('title');
    const body = form.get('body');

    const formFields = { title, body };

    // Fields to validate
    const fieldErrors = {
        title: validateTitle(title),
        body: validateBody(body),
    }

    // First before submit the form we need to validate the fields.
    // If some of the values change we get and check if there are error so we return 400 code error.
    if (Object.values(fieldErrors).some(Boolean)) {
        console.log(fieldErrors);
        return badRequest({ fieldErrors, formFields });
    }

    const post = await db.post.create({ data: formFields });
    return redirect(`/posts/${post.id}`); // At the end, when post is added we redirect user to Post list using redirect hook from Remix.
}

function NewPost() {
    const actionData = useActionData();

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
                        <input type='text' name='title' id="title" defaultValue={actionData?.formFields?.title}></input>
                        <div className="error">
                            <p>{actionData?.fieldErrors?.title &&
                                actionData?.fieldErrors?.title}</p>
                        </div>
                    </div>
                    <div className="form-control">
                        <label htmlFor='body'>Body</label>
                        <textarea name='body' id="body" defaultValue={actionData?.formFields?.body}></textarea>
                        <div className="error">
                            <p>{actionData?.fieldErrors?.body &&
                                actionData?.fieldErrors?.body}</p>
                        </div>
                    </div>
                    <button type='submit' className="btn btn-block">Add Post!</button>
                </form>
            </div>
        </>
    )
}

export default NewPost