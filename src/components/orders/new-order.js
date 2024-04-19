
import { useState } from "react";

// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// import { storage } from "../../firebase";

import OrderForm from "./order-form";

function NewOrder({ customers }) {

    return (
        <div className="new-order">

            <h2 className="new-order-title">New order</h2>

            <OrderForm customers={customers} />
        </div>
    )
}

export default NewOrder;