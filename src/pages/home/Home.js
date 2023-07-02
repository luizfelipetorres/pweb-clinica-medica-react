import styles from "./Home.module.css"
import home from '../../img/home.svg'
import consulta from '../../img/consulta.png'
import medico from '../../img/medico.png'
import paciente from '../../img/paciente.png'


function Home() {
    return (
        <div className={styles.Home}  >

            <div className={styles.HomeLeft}>
                <img src={home} alt="equipe médica" />
            </div>

            <div className={styles.HomeRight}>
                <div>
                    <h2 className={styles.alignCenter}>Escolhar qual seção deseja iniciar:</h2>
                </div>

                <div className={styles.HomeMenu}>
                    <div>
                        <a href=""><img src={medico} alt="médico" /></a>
                        <h3>Médico</h3>
                    </div>
                    <div>
                        <a href=""><img src={paciente} alt="paciente" /></a>
                        <h3>Paciente</h3>
                    </div>
                    <div>
                        <a href=""><img src={consulta} alt="consulta" /></a>
                        <h3>Consulta</h3>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Home