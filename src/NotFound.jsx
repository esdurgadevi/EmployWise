import { Link } from "react-router-dom";

function NotFound()
{
    return(
        <div className="notfound">
            <h2>Sorry</h2>
            <p>404 Page not found</p>
            <Link to="/">Going back to Home page...</Link>
        </div>
    )
}

export default NotFound;