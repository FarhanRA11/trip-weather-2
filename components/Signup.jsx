import { useAuth } from "@/firebase/auth";
import { useState } from "react";
import Loader from "./Loader";
import { updateProfile } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false)

    function handleSubmit() {
        setLoading(true)
        if (username && email && password) {
            signup(email, password)
                .then(cred => updateProfile(cred.user, { displayName: username })
                    .then(() => alert('SIGNUP SUCCESS'))
                    .catch(error => `${error.code}`.replaceAll('auth/', '').replaceAll('-', ' '))
                )
                .catch(error => `${error.code}`.replaceAll('auth/', '').replaceAll('-', ' '))
                .finally(() => setLoading(false));
        };
    };

    return <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" required className="m-1" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required className="m-1" />
            <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="email" required className="m-1" />
            <button type="submit">LOGIN</button>
            {loading && <Loader />}
        </form>
    </>
}