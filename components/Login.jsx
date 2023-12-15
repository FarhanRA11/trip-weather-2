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
        setLoading(true)

        if (!useEmail) {
            getAllUsername()
                .then(result => {
                    const allEmail = [];
                    const allUsernames = [];
                    result.forEach(doc => {
                        allEmail.push(doc.id);
                        allUsernames.push(doc.data().username);
                    });
                    const userEmail = allEmail[allUsernames.indexOf(username)];

                    if (userEmail && password) {
                        login(userEmail, password)
                            .then(cred => {
                                alert('LOGIN SUCCESS');
                                router.push(`/${cred.user.displayName}`);
                            })
                            .catch(error => setError(error.code))
                            .finally(() => setLoading(false));
                    } else {
                        setError('username not found');
                        setLoading(false);
                    }
                })
        } else {
            if (email && password) {
                login(email, password)
                    .then(cred => {
                        alert('LOGIN SUCCESS');
                        router.push(`/${cred.user.displayName}`)
                    })
                    .catch(error => setError(error.code))
                    .finally(() => setLoading(false));
            } else {
                setLoading(false)
            };
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