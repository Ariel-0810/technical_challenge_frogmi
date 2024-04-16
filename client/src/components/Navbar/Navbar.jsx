import { Link, useLocation } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
import styles from "./Navbar.module.css"

const NavBar = ({ onSearch, id }) => {

    const location = useLocation()

    return (
        <div className={styles.NavBar}>
            {location.pathname === "/home" &&
                <SearchBar onSearch={onSearch}></SearchBar>
            }
            
            {location.pathname === `/home/${id}` && (
                <button className={styles.link}>
                    <Link to="/home">Pagina principal</Link>
                </button>
            )}
        </div>
    )
}

export default NavBar