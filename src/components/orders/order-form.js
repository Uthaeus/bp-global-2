import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { setDoc, doc, updateDoc, collection, arrayUnion, addDoc } from "firebase/firestore";

import { storage } from "../../firebase";
import { db } from "../../firebase";

function OrderForm({ order, customers }) {
    // const [images, setImages] = useState([]);
    const [customer, setCustomer] = useState("");

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {

        if (order) {
            if (order.images) {
                // setImages(order.images);
            }

            reset(order);
        }
    }, [order, reset]);

    

    

    const onSubmit = (data) => {

        console.log('order form submit data',data);

        if (order) {

            updateDoc(doc(db, "orders", order.id), {
                ...data
            });
        } else {
            const userRef = doc(db, "users", data.customer);

            updateDoc(userRef, {
                orders: arrayUnion({
                    order_number: data.order_number,
                }),
            });

            addDoc(collection(db, "orders"), {
                ...data
            })
        }

        reset();
        
    }

    return (
        <div className="order-form-container">
            
            <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="customer">Customer</label>
                            <select id="customer" className="form-select" {...register("customer", { required: true })} onChange={(e) => setCustomer(e.target.value)}>
                                <option value="">Select customer</option>
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                ))}
                            </select>
                            {errors.customer && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="order_number">Order number</label>
                            <input 
                                type="text"
                                id="order_number"
                                className="form-control"
                                {...register("order_number", { required: true })}
                            />
                            {errors.order_number && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default OrderForm;