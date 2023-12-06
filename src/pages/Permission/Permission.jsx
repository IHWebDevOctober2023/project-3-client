/* THIS CAN BE DELETED */

import "./Permission.css";
import { Link } from "react-router-dom";

function Permission() {
    return (
        <div className="form-createtask-container">
            <Link to="/CreateFamily">
                <button>Create a newnbbbb Family</button>
            </Link>
            <Link to="/">
                <button>Join a family</button>
            </Link>
        </div>
    )
}
export default Permission;