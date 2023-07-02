import logo from "../img/logo.png"
import styles from "./Navbar.module.css"

function Navbar() {
  return (
    <nav className={styles.Navbar}>
        <div >
            <img src={logo} className={styles.logo} alt="logo" />
        </div>
        <ul >
            <li>
                <a href="">Home</a>
            </li>
            <li>
                <a href="">Médico</a>
            </li>
            <li>
                <a href="">Paciente</a>
            </li>
            <li>
                <a href="">Consulta</a>
            </li>
        </ul>


    </nav>

  )
}

export default Navbar