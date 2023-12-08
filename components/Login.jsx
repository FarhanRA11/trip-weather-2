import { useAuth } from "@/firebase/auth";
import { useState } from "react";
import Loader from "./Loader";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [loading, setLoading] = useState(false)

    function handleSubmit() {
        setLoading(true)
        if (email && password) {
            login(email, password)
                .then(() => {
                    alert('LOGIN SUCCESS');
                })
                .catch(error => alert(`${error.code}`.replaceAll('auth/', '').replaceAll('-', ' ')))
                .finally(() => setLoading(false))
        };
    };

    return <>
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required className="m-1" />
            <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="email" required className="m-1" />
            <button type="submit">LOGIN</button>
            {loading && <Loader />}
        </form>
    </>
}