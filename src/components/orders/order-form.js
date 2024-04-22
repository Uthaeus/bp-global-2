import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { ref, uploadString, getDownloadURL } from "firebase/storage";

import { db, storage } from "../../firebase";

function OrderForm({ order, customers }) {
    const [customer, setCustomer] = useState("");
    const [images, setImages] = useState([]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {

        if (order) {
            if (order.images) {
                setImages(order.images);
            }
            reset(order);
        }
    }, [order, reset]);

    const handleImageChange = async (e) => {
        const imageFiles = Array.from(e.target.files);
        const imageUrls = [];

        for (const file of imageFiles) {
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadString(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            imageUrls.push(downloadURL);
        }

        setImages(imageUrls);
    };
    

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

                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="images">Images</label>
                            <input
                                type="file"
                                id="images"
                                className="form-control"
                                multiple
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <div className="col-6" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default OrderForm;