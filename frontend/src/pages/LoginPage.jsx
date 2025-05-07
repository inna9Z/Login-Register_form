import { Link } from "react-router-dom"
import { useState } from "react";

import './SignPage.css'
import useLogin from "../hooks/useLogin";

const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login, loading } = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)

    }
    return (
        <div>
            <form className='form' onSubmit={handleSubmit} >

                <h3>Login</h3>

                <div>
                    <span className='span'>Email</span>
                    <input className="input" type="text" placeholder="Enter user Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <span className='span'>Password</span>
                    <input className="input" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <Link to="/signup">
                    {"Don't"} have en account ?
                </Link>
                <div>
                    <button className='button' type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;
