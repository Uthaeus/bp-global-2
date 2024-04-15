import { Link } from "react-router-dom";

export default function Error() {

    return (
        <div className="error">
            <h1 className="error-title">Page not found</h1>
            <Link to="/" className="error-link">Home</Link>
        </div>
    );
}