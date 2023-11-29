import "./Permission.css";
import { Link } from "react-router-dom";

function Permission() {
    return (
        <>
            <Link to="/CreateFamily">
                <button>Create a new Family</button>
            </Link>
            <Link to="/">
                <button>Join a family</button>
            </Link>
        </>
    )
}
export default Permission;