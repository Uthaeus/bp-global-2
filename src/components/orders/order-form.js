import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function OrderForm({ order, customers }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {

        if (order) {
            reset(order);
        }
    }, [order, reset]);

    const onSubmit = (data) => {

        console.log(data);
    }

    return (

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
    )
}

export default OrderForm;