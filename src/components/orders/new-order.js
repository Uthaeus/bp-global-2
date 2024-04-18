import { useForm } from "react-hook-form";
import { useState } from "react";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "../../firebase";

function NewOrder({ customers }) {
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        console.log(data);
    }

    return (
        <div className="new-order">

            <h2 className="new-order-title">New order</h2>

            <form className="new-order-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="customer">Customer</label>
                            <select id="customer" className="form-control" {...register("customer", { required: true })}>
                                <option value="">Select customer</option>
                                {customers.map((customer, index) => <option key={index} value={customer.id}>{customer.name}</option>)}
                            </select>
                            {errors.customer && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>
                    <div className="col-md-6">

                        <div className="form-group mb-3">
                            <label htmlFor="order_number">Order number</label>
                            <input type="text" id="order_number" className="form-control" {...register("order_number", { required: true })} />
                            {errors.order_number && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                </div>

                <button type="submit" className="btn btn-primary">Add order</button>
            </form>

            <div className="image-preview-container">
                <h3 className="image-preview-title">Images preview</h3>

                {images.length > 0 && images.map((image, index) => <img key={index} src={image} width='25%' />)}
            </div>
        </div>
    )
}

export default NewOrder;