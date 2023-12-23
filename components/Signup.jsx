import Loader from "./Loader";
import { useState } from "react";
import { useAuth } from "@/firebase/auth";
import { updateProfile } from "firebase/auth";
import { useDatabase } from "@/firebase/database";

export default function Signup() {
    const { getAllUsername, createUser, createDatabase } = useDatabase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function checkUsername(input) {
        const allUsernames = [];
        getAllUsername().then(result => {
            result.forEach(doc => allUsernames.push(doc.data().username))
            if (allUsernames.includes(input)) setError('Username has been used');
            else setError('');
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (username && email && password && !error) {
            setLoading(true)
            try {
                const cred = await signup(email, password);
                await updateProfile(cred.user, { displayName: username });
                await createUser(email, username);
                await createDatabase(username, email, cred.user.uid)
                alert('SIGN UP SUCCESS');
            } catch (error) {
                setError(error.code);
            } finally {
                setLoading(false);
            }
        };
    };

    return <form onSubmit={handleSubmit} className="flex flex-row">
        <input type="text" value={username} onChange={e => {
            setUsername(e.target.value);
            checkUsername(e.target.value);
        }} pattern="^[^\s]+$" title="Spaces are not allowed" placeholder="username" required className="m-1" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" pattern=".+@.+\..{2,}" required className="m-1" />
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" minLength="8" required className="m-1" />

        {error && <div>{error}</div>}
        <button type="submit">SIGN UP</button>
        {loading && <Loader />}
    </form>
}