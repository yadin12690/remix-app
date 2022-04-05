import { useActionData, json, redirect } from 'remix'
import { db } from '~/utils/db.server'

function badRequest(data) {
    return json(data, { status: 400 });
}

export const action = async ({ request }) => {
    const form = await request.formData();

    // That code get the values from the submited form
    const loginType = form.get('loginType');
    const userName = form.get('userName');
    const pswrd = form.get('password');

    const formFields = { loginType, userName, pswrd };

    // Fields to validate
    const fieldErrors = {
        userName: validateUserName(userName),
        pswrd: validatePassword(pswrd),
    }

    // First before submit the form we need to validate the fields.
    // If some of the values change we get and check if there are error so we return 400 code error.
    if (Object.values(fieldErrors).some(Boolean)) {
        console.log(fieldErrors);
        return badRequest({ fieldErrors, formFields })
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
                            <input type='text' name='username' id='username' />
                            <div className="error"></div>
                        </div>
                        <div className="form-control">
                            <label htmlFor="password">Password</label>
                            <input type='password' name='password' id='password' />
                            <div className="error"></div>
                        </div>
                        <button className="btn btn-block" type="submit">Submit</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login