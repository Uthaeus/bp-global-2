import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        
        console.log(data);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="auth">
            <h2 className="auth-title">Log in</h2>

            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        autoFocus={true}
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span className="error">This field is required</span>}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <span className="error">This field is required</span>}
                </div>

                <button type="submit" className="btn btn-primary mb-3">Log in</button>

                <p className="auth-text">Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link></p>
            </form>
        </div>
    );
}