import styles from "./Landing.module.css"
import { Link } from "react-router-dom"

const Landing = () => {
    return (
        <div className={styles.landingContainer} >
            <div className={styles.mapa}>
                <img src="../../img/mapa2.png" alt=""></img>
            </div>            
            <h1 className={styles.titleLanding}>Frogmi - USGS App</h1>            
            <Link to="/home">
                <button className={styles.buttonLanding} >let's see the earthquakes</button> 
            </Link>
            <footer className={styles.footer}>
                <p>By Gomez Ariel - Copryrigth 2024</p>      
            </footer>
        </div>
    )
}

export default Landing