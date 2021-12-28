import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCategorias } from '../actions/CategoriaAction'
import { getProductos } from '../actions/ProductoAction'
import { getProductoImagenes } from '../actions/ProductoImagenAction'

const LaCarta = () => {
    
  //use Selectors
  const categorias = useSelector(state => state.categorias.lista)
  const productos = useSelector(state => state.productos.lista)
  const productosImagenes = useSelector(state => state.productosImagenes.lista)

  //useDispatch
  const dispatch = useDispatch()

  //useEffect
  useEffect(() => {
      dispatch(getCategorias())
      dispatch(getProductos())
      dispatch(getProductoImagenes())
      
  }, [])

    return (
    <div>
        <h2>this is la carta</h2>

        { categorias.map (cat => (
                <div key= {cat.id}> 
                     
                    <h3>{cat.clave} {cat.nombre} </h3>


                    { productos
                        .filter(p => p.categoria == cat.id)
                        .map(prod => (
                            <div  key={prod.id}>
                                 {prod.nombre} 
                                <ul>
                                    <li>{prod.descripcionA}</li>
                                    <li>Calorias: {prod.calorias}</li>
                                    <li>Precio: {prod.precio}</li>
                                </ul>
                                
                                {
                                    productosImagenes
                                        .filter(x => x.producto == prod.id)
                                        .map (prodimagen => (
                                            <>                                           
                                                 <img  src={prodimagen.imagen} width="100" height="100"/>
                                            </>
                                        ))
                                }


                                <br/>
                            </div>
                        ))
                     }
                   
                 </div>
            ))}
    </div>
    )
}

export default LaCarta
