import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function OrderForm({ order, customers }) {
    const [images, setImages] = useState([]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {

        if (order) {
            setImages([...order.images]);
            reset(order);
        }
    }, [order, reset]);

    const onSubmit = (data) => {

        console.log(data);
    }

    return (
        <div className="order-form-container">
            <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="customer">Customer</label>
                            <select className="form-control" id="customer" {...register("customer", { required: true })}>
                                <option value="">Select customer</option>
                            </select>
                            {errors.name && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="order_number">Order number</label>
                            <input 
                                type="text"
                                id="order_number"
                                className="form-control"
                                {...register("order_number", { required: true })}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div className="order-image-preview-container">
                {images.length === 0 && <p>No images</p>}
                {images.length > 0 && <p>Image Preview</p>}
                {images.map((image, index) => (
                    <div className="order-image-preview" key={index}>
                        <img src={image} alt="image" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrderForm;