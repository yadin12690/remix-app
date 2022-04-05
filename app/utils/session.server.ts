import bcrypt from 'bcrypt'
import { db } from '~/utils/db.server'
import { createCookieSessionStorage, redirect } from 'remix'

export async function login({ username, password }) {
    const user = await (db as any).user.findUnique({
        where: {
            username
        }
    })

    // If username dosenot extists we return null.
    if (!user) return null;


    // Check password - we get here so username is exticts in our DB.
    // Here we compare user plain password with bcrypt hash and see if they match.

    const isCorrectPasswpord = await bcrypt.compare(password, user.passwordHash);

    // If password is not match and not correct we return null.
    if (!isCorrectPasswpord) return null;

    // So, if everthing is Ok (username and password) we can return user.
    return user;
}

// Get session secret.
const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
    throw new Error('No secret session');
}

// Create session storage.
const storage = createCookieSessionStorage({
    cookie: {
        name: 'remixblog_session',
        secure: process.env.NODE_ENV === 'production', // We wannt make sure secure is true when we in production enviorment.
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/', // The root.
        maxAge: 60 * 60 * 24 * 60, // Cookie lifetime.
        httpOnly: true,
    }
})

// Create user session
export async function createUserSession(userId: string, redirectTo: string) {
    const session = await storage.getSession();
    session.set('userId', userId);
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        }
    })
}

// Get user session.
export function getUserSession(request: Request) {
    return storage.getSession(request.headers.get('Cookie'));
}

// Get logged in user.
export async function getUser(request: Request) {
    const session = await getUserSession(request);
    const userId = session.get('userId');

    if (!userId || typeof userId !== 'string') {
        return null;
    }

    try {
        const user = await (db as any).user.findUnique({
            where: {
                id: userId,
            },
        })

        return user;
    } catch (error) {
        return null;
    }
}