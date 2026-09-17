import './AppLink.css'
import { Link } from 'react-router-dom';

export default function AppLink({
    to,
    className,
    label,
    onClick}){

    return(
        <Link
            to={to}
            className={`app-link ${className || ""}`}
            onClick={onClick}
            >
            {label}
        </Link>
    );
    }
