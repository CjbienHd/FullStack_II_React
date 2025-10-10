import logo from "../assets/icono_PMS-removebg-preview.png"
import carritoImg from "../assets/Carrito-removebg-preview.png"
import { Link, NavLink } from 'react-router-dom';


function Nav() {
    return <nav className="navbar">
        <img src={logo} width="80px" alt="Logo" />
        <h2>Pasteleria Mil Sabores</h2>
        <ul className="nav_links">
            <li><NavLink to = "/home">Home</NavLink> |</li>
            <li><NavLink to = "/productos">Productos</NavLink> |</li>
            <li><a>Nosotros</a> |</li>
            <li><a>Blogs</a> |</li>
            <li><a>Contacto</a></li>
        </ul>
        <button className="btn"><img src={carritoImg} width="30px" alt="Carrito" /></button>
    </nav>
}

export default Nav;