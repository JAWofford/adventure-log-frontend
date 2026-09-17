import AppLink from "./AppLink"
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
        <AppLink
                        to="/about"
                        className="cancel-button"
                        label="About Adventure Log" />
    </div>
    
  )
}
