import pasteleria from "../assets/ded249ac27d6056cd3d951830b0cbdf1.jpg"
import torta2Chocolate from "../assets/torta cuadrada chocolate.jpg"
import torta2Frutas from "../assets/torta cuadrada de frutas.jpg"
import tortaOVainilla from "../assets/torta circular de vainilla.jpg"
import mousseChoco from "../assets/Triple Chocolate Mousse Cake – A Chocolate Lover’s Dream Come True!.jpg"
import tortaManjarO from "../assets/torta circular de manjar.jpg"
import tiramisuClasico from "../assets/Tiramisu Classique _ Recette Originale.jpg"
import tortaSinAzucarnaranja from "../assets/Orange Cake with Zesty Cream Cheese Frosting.jpg"
import cheesecakeSinAzucar from "../assets/Cheesecake Factory Cheesecake.jpg"
import { Link, NavLink } from 'react-router-dom';

function Main() {
    return <main>
        <div className="hero">
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
                                <NavLink to = "/productos" className="btn">Ver Productos</NavLink>
                        </div>
                        <img src={pasteleria} width="40%" height="100%" alt="Pasteleria" />
                    </div>
                </div>
                <div className="productos">
                    <article className="unidad">
                        <img src={torta2Chocolate} width="40%" height="50%" alt="Torta cuadrada de chocolate" />
                        <h2>Torta Cuadrada de Chocolate</h2>
                        <p>Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.</p>
                        <p>$45.000 CLP</p>
                    </article>
                    <article className="unidad">
                        <img src={torta2Frutas} width="40%" height="50%" alt="Torta Cuadrada de Frutas" />
                        <h2>Torta Cuadrada de Frutas</h2>
                        <p>Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.</p>
                        <p>$50.000 CLP</p>
                    </article>
                    <article className="unidad">
                        <img src={tortaOVainilla} width="40%" height="50%" alt="Torta Circular de Vainilla" />
                        <h2>Torta Circular de Vainilla</h2>
                        <p>Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.</p>
                        <p>$40.000 CLP</p>
                    </article>
                    <article className="unidad">
                        <img src={tortaManjarO} width="40%" height="50%" alt="Torta Circular de Manjar" />
                        <h2>Torta Circular de Manjar</h2>
                        <p>Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.</p>
                        <p>$42.000 CLP</p>
                    </article>
                </div>
                <div className="productos">
                    <article className="unidad">
                        <img src={mousseChoco} width="40%" height="50%" alt="Mousse de Chocolate" />
                        <h2>Mousse de Chocolate</h2>
                        <p>Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.</p>
                        <p>$5.000 CLP</p>
                    </article>
                    <article className="unidad">
                        <img src={tiramisuClasico} width="40%" height="50%" alt="Tiramisú Clásico" />
                        <h2>Tiramisú Clásico</h2>
                        <p>Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.</p>
                        <p>$5.500 CLP</p>
                    </article>
                    <article className="unidad">
                        <img src={tortaSinAzucarnaranja} width="40%" height="50%" alt="Torta Sin Azúcar de Naranja" />
                        <h2>Torta Sin Azúcar de Naranja</h2>
                        <p>Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.</p>
                        <p>$48.000 CLP</p>
                    </article>
                    <article className="unidad">
                        <img src={cheesecakeSinAzucar} width="40%" height="50%" alt="Cheesecake Sin Azúcar" />
                        <h2>Cheesecake Sin Azúcar</h2>
                        <p>Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.</p>
                        <p>$47.000 CLP</p>
                    </article>
                </div>
            </div>
        </div>
    </main>



}

export default Main;