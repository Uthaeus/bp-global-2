import { useForm } from "react-hook-form";
import { useContext } from "react";

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
        <div className="account-edit">
            <h2 className="account-edit-title">Edit Account</h2>

            <form className="account-edit-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        id="name"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <p className="error-message">Name is required</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        id="email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <p className="error-message">Email is required</p>}
                </div>

                <button className="account-edit-submit" type="submit">Submit</button>
            </form>
        </div>
    )
}