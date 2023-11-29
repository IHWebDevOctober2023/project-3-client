import "./Permission.css";
import { Link } from "react-router-dom";

function Permission() {
    return (
        <div className="Permission-buttons-container">
            <Link to="/CreateFamily">
                <button>Create a new Family</button>
            </Link>
            <br/>
            <Link to="/">
                <button>Join a family</button>
            </Link>
        </div>
    )
}
export default Permission;