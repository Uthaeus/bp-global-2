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

    

    

    const onSubmit = (data) => {

        console.log('order form submit data',data);

        
    }

    return (
        <div className="order-form-container">
            
        </div>
    )
}

export default OrderForm;