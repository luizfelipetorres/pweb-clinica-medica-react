import React from "react";
import "./Footer.css";

export default () => {
  return (
    <footer className="Footer">
      <section className="developers">
        Desenvolvido por :
        <ul>
          <li>
            <a href="https://github.com/DS-DIEGOSANTOS">Diego Santos</a>
          </li>
          <li>
            <a href="https://github.com/nando-cezar">Luis Fernando</a>
          </li>
          <li>
            <a href="https://github.com/luizfelipetorres">Luiz Felipe</a>
          </li>
        </ul>
      </section >
      <section className="rights">
        <p>&copy; Todos os direitos reservados</p>
      </section>
    </footer>
  );
};
