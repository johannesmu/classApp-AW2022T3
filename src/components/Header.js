import { Link } from "react-router-dom"
export function Header(props) {
    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{ props.title }</Link>
            </div>
        </nav>
    )
}