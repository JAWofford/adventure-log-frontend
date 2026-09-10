import './AppLink.css'
import { Link } from 'react-router-dom';

export default function AppLink({
    to,
    className,
    label}){

    return(
        <Link
            to={to}
            className={`app-link ${className || ""}`}>
            {label}
        </Link>
    );
    }
