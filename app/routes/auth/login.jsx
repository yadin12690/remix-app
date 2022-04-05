import { useActionData, json, redirect } from 'remix'
import { db } from '~/utils/db.server'
import { login, createUserSession } from '~/utils/session.server'

function badRequest(data) {
    return json(data, { status: 400 });
}

const validateusername = (username) => {
    if (typeof username !== 'string' || username.length < 3) {
        return 'User name is too short, needs to be at least 4 characters';
    }
}

const validatePassword = (password) => {
    if (typeof password !== 'string' || password.length < 6) {
        return 'Password too short, needs to be at least 6 characters';
    }
}

export const action = async ({ request }) => {
    const form = await request.formData();

    // That code get the values from the submited form
    const loginType = form.get('loginType');
    const username = form.get('username');
    const password = form.get('password');

    const formFields = { loginType, username, password };

    // Fields to validate
    const fieldErrors = {
        username: validateusername(username),
        password: validatePassword(password),
    }

    // First before submit the form we need to validate the fields.
    // If some of the values change we get and check if there are error so we return 400 code error.
    if (Object.values(fieldErrors).some(Boolean)) {
        console.log(fieldErrors);
        return badRequest({ fieldErrors, formFields })
    }

    switch (loginType) {
        case 'login': {
            // Find user.
            const user = await login({ username, password });

            // Check user.
            if (!user) {
                return badRequest({
                    formFields,
                    fieldErrors: { username: 'Invalid Credentials' },
                })
            }
            // Create user session.
            // If the user session is valid, we send the id and redirect him to posts route (page). 
            return createUserSession(user.id, '/posts');
        }
        case 'register': {
            // Check if user exixts.
            // Create user.
            // Create user session
        }
        default: {
            return badRequest({
                formFields,
                formError: 'Login type is not valid'
            })
        }
    }
}

function Login() {
    const actionData = useActionData();

    return (
        <div className="auth-container">
            <div className="page-container">
                <div className="page-header">
                    <h1>Login</h1>
                </div>

                <div className="page-content">
                    <form method="POST">
                        <fieldset>
                            <legend> Login or Register</legend>
                            <label>
                                <input type='radio' name='loginType' value='login' defaultChecked={
                                    !actionData?.formFields?.loginType ||
                                    actionData?.formFields?.loginType === 'login'}
                                />{' '}
                                Login
                            </label>
                            <label>
                                <input type='radio' name='loginType' value='register' /> Register
                            </label>
                        </fieldset>
                        <div className="form-control">
                            <label htmlFor="username">User Name</label>
                            <input type='text' name='username' id='username' defaultValue={actionData?.formFields?.username} />
                            <div className="error">
                                <p>{actionData?.fieldErrors?.username &&
                                    actionData?.fieldErrors?.username}
                                </p>
                            </div>
                        </div>
                        <div className="form-control">
                            <label htmlFor="password">Password</label>
                            <input type='password' name='password' id='password' defaultValue={actionData?.formFields?.password} />
                            <div className="error">
                                <p>{actionData?.fieldErrors?.password &&
                                    actionData?.fieldErrors?.password}
                                </p>
                            </div>
                        </div>
                        <button className="btn btn-block" type="submit">Submit</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login