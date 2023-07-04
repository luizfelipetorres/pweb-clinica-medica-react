import styles from "./Home.module.css";
import home from "../../../assets/img/home.svg";
import consulta from "../../../assets/img/consulta.png";
import medico from "../../../assets/img/medico.png";
import paciente from "../../../assets/img/paciente.png";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className={styles.Home}>
      <div className={styles.HomeLeft}>
        <img src={home} alt="equipe médica" />
      </div>

      <div className={styles.HomeRight}>
        <div>
          <h2 className={styles.alignCenter}>
            Escolhar qual seção deseja iniciar:
          </h2>
        </div>

        <div className={styles.HomeMenu}>
          <Link to="/medic">
            <img src={medico} alt="médico" />
            <h3>Médico</h3>
          </Link>
          <Link to="/patient">
            <img src={paciente} alt="paciente" />
            <h3>Paciente</h3>
          </Link>
          <Link to="/appointment">
            <img src={consulta} alt="consulta" />
            <h3>Consulta</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};
