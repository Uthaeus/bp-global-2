import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function Signup() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {

        if (data.password !== data.confirmPassword) {
            console.log("Passwords do not match");
            alert("Passwords do not match");

            reset({ password: "", confirmPassword: "" });
            return;
        }

        console.log(data);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: data.name,
                email: data.email,
                role: "user", 
            });
            
            navigate("/");
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="auth">
            <h2 className="auth-title">Sign up</h2>

            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text"
                                id="name"
                                className="form-control"
                                autoFocus={true}
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <span className="text-danger">This field is required</span>}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        {...register("confirmPassword", { required: true })}
                    />
                    {errors.confirmPassword && <span className="text-danger">This field is required</span>}
                </div>

                <button type="submit" className="btn btn-primary mb-3">Sign up</button>

                <p className="auth-text">Already have an account? <Link to="/login" className="auth-link">Log in</Link></p>
            </form>
        </div>
    );
}