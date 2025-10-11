
import Article from "./Article"


function ListaProductos(props) {
    
    return (<div className="productos">
        {props.productos.map((item, index) =>(
            <Article key ={index} productos = {item}></Article>
        ))}
    </div>)

}

export default ListaProductos;