import { useForm } from 'react-hook-form';

import image from '../assets/images/lumber_image_2.png';

export default function Contact() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {

        console.log(data);

        // TODO: Send email
        reset();
    }

    return (
        <div className="contact" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <h2 className="contact-title">Contact Us</h2>

            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                autoFocus={true}
                                {...register("name")}
                            />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email*</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="error">This field is required</span>}
                        </div>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="message">Message*</label>
                    <textarea
                        id="message"
                        className="form-control"
                        rows="5"
                        {...register("message", { required: true })}
                    />
                    {errors.message && <span className="error">This field is required</span>}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}