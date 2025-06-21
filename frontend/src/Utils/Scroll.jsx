import React, { useEffect, useState } from "react";
import "./Scroll.css";//

const ScrollTop = () => {
  const [visivel, setVisivel] = useState(false);

  const verificarScroll = () => {
    if (window.scrollY > 200) {
      setVisivel(true);
    } else {
      setVisivel(false);
    }
  };

  const subir = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", verificarScroll);
    return () => window.removeEventListener("scroll", verificarScroll);
  }, []);

  return visivel ? (

    <button className="scroll-top" onClick={subir} aria-label="Voltar ao topo">
      ↑
    </button>
  ) : null;
};

export default ScrollTop;
