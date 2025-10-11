import { Link, NavLink } from 'react-router-dom';
import pasteleria from "../assets/ded249ac27d6056cd3d951830b0cbdf1.jpg"

function Hero() {
    
    return <div className="hero">
        <ul className="hero_links">
            <li><a href="login/index.html">Inicio de Sesion</a></li>
            <li><a href="registro/index.html">Registro</a> |</li>
        </ul>
        <div className="hero_content">
            <div className="contenedor_cuadrado">
                <div className="cuadrado_principal">
                    <div className="primera_mitad">
                        <h1>Pasteleria Mil Sabores</h1>
                        <p style={{ margin: "10px" }}>Somos una pasteleria que ofrece experiencias dulces y memorables a traves de nuestros productos de reposteria de la mas alta calidad para todo tipo de ocasiones minetras fomentamos nuestras raices historicas y creatividad</p>
                        <NavLink to="/productos" className="btn">Ver Productos</NavLink>
                    </div>
                    <img src={pasteleria} width="40%" height="100%" alt="Pasteleria" />
                </div>
            </div>
        </div>
    </div>
}


export default Hero;