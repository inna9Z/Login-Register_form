import { useState } from 'react'
import './SignPage.css'
import { Link } from 'react-router-dom'
import useSignUp from '../hooks/useSignUp'

const SignUpPage = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const { signup, loading } = useSignUp()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(inputs)

    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);  // Toggle password visibility
    };
    return (
        <div>

            <form className='form' onSubmit={handleSubmit}>

                <h3>Register Here</h3>

                <div>
                    <span className='span'>User name</span>
                    <input className="input" type="text" placeholder="Enter full Name" value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
                </div>
                <div>
                    <span className='span'>Email</span>
                    <input className="input" type="text" placeholder="Enter user Name" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                </div>
                <div className='password-container'>
                    <span className='span'>Password</span>
                    <input className="input" type={showPassword ? "text" : "password"} placeholder="Enter Password" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                    <span className="eye-icon" onClick={togglePasswordVisibility}>
                        {showPassword ? "👁️" : "🙈"}
                    </span>
                </div>
                <div className='password-container'>
                    <span className="span">Confirm Password</span>
                    <input className="input" type={showPassword ? "text" : "password"} placeholder="Confirm Password" value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} />
                    <span className="eye-icon" onClick={togglePasswordVisibility}>
                        {showPassword ? "👁️" : "🙈"}
                    </span>
                </div>
                <Link to="/login" className='link'>
                    Have en account ?
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

export default SignUpPage
