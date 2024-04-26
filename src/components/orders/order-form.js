import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { updateDoc, doc, addDoc, collection, arrayUnion } from "firebase/firestore";

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
        const file = e.target.files[0];
        const fileName = file.name + Date.now();

        const storageRef = ref(storage, `images/${fileName}`);

        const blob = new Blob([file], {
            type: file.type
        });

        await uploadBytes(storageRef, blob);

        const url = await getDownloadURL(storageRef);

        setImages([...images, url]);
    };
    
    const removeImageHandler = async (img) => {
        const storageRef = ref(storage, img);
        await deleteObject(storageRef);
        setImages(images.filter((image) => image !== img));
    }

    const onSubmit = async (data) => {

        console.log('order form submit data',data);

        if (order) {
            try {
                await updateDoc(doc(db, "orders", order.id), {
                    customer: data.customer,
                    order_number: data.order_number,
                    images: images,
                    updated_at: Date.now(),
                });
            } catch (error) {
                console.log('update order error: ', error);
            }
        } else {
            try {
                await addDoc(collection(db, "orders"), {
                    customer: data.customer,
                    order_number: data.order_number,
                    images: images,
                    created_at: Date.now(),
                });
            } catch (error) {
                console.log('new order error: ', error);
            }
        }

        reset();
        setImages([]);
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
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <div className="col-6" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div className="d-flex order-form-images-container">
                {images.map(image => (
                    
                    <div key={image} className="order-form-image" style={{ width: "25%", height: "100px"}}>
                        <img src={image} alt=""/>
                        <p>url: {image}</p>
                        <button className="btn btn-danger" onClick={() => removeImageHandler(image)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrderForm;