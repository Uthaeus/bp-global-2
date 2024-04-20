import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";

import { storage } from "../../firebase";
import { db } from "../../firebase";

function OrderForm({ order, customers }) {
    const [images, setImages] = useState([]);
    const [customer, setCustomer] = useState("");

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {

        if (order) {
            if (order.images) {
                setImages([...order.images]);
            }

            reset(order);
        }
    }, [order, reset]);

    const imagePreviewHandler = (event) => {

        const file = event.target.files[0];

        const storageRef = ref(storage, `images`);

        uploadBytes(storageRef, file).then(() => {

            getDownloadURL(storageRef).then((url) => {
                setImages([...images, url]);
            });
        })
        .catch((error) => {

            console.log(error);
        });

        reset({
            image: null
        })
    }

    const removeImageHandler = (url) => {

        setImages(images.filter(image => image !== url));

        const storageRef = ref(storage, url);

        deleteObject(storageRef).then(() => {
            
            console.log('image deleted');

        })
        .catch((error) => {

            console.log(error);
        });

    }

    const onSubmit = (data) => {

        console.log('order form submit data',data);

        if (order) {

            updateDoc(doc(db, "orders", order.id), {
                ...data,
                images
            });
        } else {

            setDoc(doc(db, "orders"), {
                ...data,
                images
            });

            const userRef = doc(db, "users", data.customer);

            updateDoc(userRef, {
                orders: arrayUnion({
                    order_number: data.order_number,
                    images
                })
            })
        }

        reset();
        setImages([]);
    }

    return (
        <div className="order-form-container">
            <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="customer">Customer</label>
                            <select className="form-control" id="customer" {...register("customer", { required: true })} onChange={(event) => setCustomer(event.target.value)}>
                                <option value="">Select customer</option>
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                ))}
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

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="image">Image</label>
                            <input 
                                type="file"
                                id="image"
                                disabled={customer === ""}
                                className="form-control"
                                onChange={imagePreviewHandler}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">

                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div className="order-image-preview-container">
                {images.length === 0 && <p>No images</p>}
                {images.length > 0 && <p>Image Preview</p>}
                {images.map((image, index) => (
                    <div className="order-image-preview" key={index}>
                        <img src={image.url} alt="image" />
                        <button type="button" className="btn btn-danger" onClick={(url) => removeImageHandler(url)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrderForm;