import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Signup() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {

        console.log(data);
    }

    return (
        <div className="auth">
            <h2 className="auth-title">Sign up</h2>

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

                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <span className="error">This field is required</span>}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        {...register("confirmPassword", { required: true })}
                    />
                    {errors.confirmPassword && <span className="error">This field is required</span>}
                </div>

                <button type="submit" className="btn btn-primary mb-3">Sign up</button>

                <p className="auth-text">Already have an account? <Link to="/login" className="auth-link">Log in</Link></p>
            </form>
        </div>
    );
}