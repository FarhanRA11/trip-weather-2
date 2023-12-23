import Loader from "./Loader";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/firebase/auth";
import { useDatabase } from "@/firebase/database";

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const { getAllUsername } = useDatabase();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [useEmail, setUseEmail] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            if (useEmail) {
                if (email && password) {
                    const cred = await login(email, password);
                    alert('LOGIN SUCCESS');
                    router.push(`/${cred.user.displayName}`);
                }
            } else {
                const result = await getAllUsername();
                const allEmails = [];
                const allUsernames = [];
                result.forEach(doc => {
                    allEmails.push(doc.id);
                    allUsernames.push(doc.data().username);
                });
                const userEmail = allEmails[allUsernames.indexOf(username)];

                if (allUsernames.indexOf(username) == -1) {
                    throw { code: 'username not found' }
                } else if (userEmail && password) {
                    const cred = await login(userEmail, password);
                    alert('LOGIN SUCCESS');
                    router.push(`/${cred.user.displayName}`);
                }
            }
        } catch (error) {
            setError(error.code);
        } finally {
            setLoading(false);
        };
    };

    return <form onSubmit={handleSubmit} className="flex flex-col">
        {useEmail
            ? <div>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required className="m-1" />
                <div onClick={() => setUseEmail(false)} className="cursor-pointer">login with username instead</div>
            </div>
            : <div>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" required className="m-1" />
                <div onClick={() => setUseEmail(true)} className="cursor-pointer">login with email instead</div>
            </div>
        }
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" required className="m-1" />

        {error && <div>{error}</div>}
        <button type="submit">LOGIN</button>
        {loading && <Loader />}
    </form >
}