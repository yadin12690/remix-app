import { useParams } from 'remix'

// We get to this route if the user enter URL like http://192.168.1.10:3000/posts/random123
// Notice we declare dynamic routes with dollar sign
export default function Post() {
    const params = useParams()

    return (
        <div>
            <h2>You are currently accessing {params.postId} post</h2>
        </div>
    )
}