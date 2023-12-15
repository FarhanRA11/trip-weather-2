import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { useState } from "react";

export default function SignIn() {
    const [isLogin, setisLogin] = useState(true)

    return <>
        {isLogin
            ? <>
                <Login />
                <button onClick={() => setisLogin(false)}>Dont have an account</button>
            </>

            : <>
                <Signup />
                <button onClick={() => setisLogin(true)}>Have an account</button>
            </>
        }
    </>
}