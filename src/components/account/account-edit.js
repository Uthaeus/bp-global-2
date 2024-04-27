import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";

import { UserContext } from "../../store/user-context";

export default function AccountEdit() {
    const { user } = useContext(UserContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    const onSubmit = async (data) => {

        console.log(data);
    }

    return (
        <div className="auth">
            <h2 className="auth-title">Edit Account</h2>

            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input
                        className="form-control"
                        type="text"
                        id="name"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <p className="error-message">Name is required</p>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        id="email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <p className="error-message">Email is required</p>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        {...register("password")}
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        className="form-control"
                        type="password"
                        id="confirmPassword"
                        {...register("confirmPassword")}
                    />
                </div>

                <button className="account-edit-submit" type="submit">Submit</button>
            </form>
        </div>
    )
}