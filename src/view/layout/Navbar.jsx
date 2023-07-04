import logo from "../../assets/img/logo.png";
import styles from "./Navbar.css";
import { Link } from "react-router-dom";

export default () => {
  return (
    <nav className={"nav-header"}>
      <div>
        <Link to="/">
          <img src={logo} className={"logo"} alt="logo" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/medic">Médico</Link>
        </li>
        <li>
          <Link to="/patient">Paciente</Link>
        </li>
        <li>
          <Link to="/appointment">Consulta</Link>
        </li>
      </ul>
    </nav>
  );
};
