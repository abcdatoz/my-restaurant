import React, {useState,  useEffect} from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { getRestaurants } from '../actions/RestaurantActions'
import { getMesas } from '../actions/MesaAction'


import { addPreorden, getOrdenes, getPreordenes } from '../actions/PreordenAction'
import { getOrdenesDetalles, getPreordenesDetalles} from '../actions/PreordenDetalleAction'

import { getProductos } from '../actions/ProductoAction'

 

const Preordenes = () => {
        

    //useState

    const [orden, setOrden] = useState('');


    //use Selectors 
    const waiter =  useSelector(state => state.authWaiter)
    const restaurantes = useSelector(state => state.restaurantes.lista)
    const productos = useSelector(state => state.productos.lista)
    const mesas = useSelector(state => state.mesas.lista)
    const preordenes = useSelector(state => state.preordenes.lista)    
    const preordenesdetalles = useSelector(state => state.preordenesDetalles.lista)
    

    const dispatch = useDispatch()

    //useEffect
    useEffect(() => {            

        dispatch(getRestaurants())        
        dispatch(getProductos())
        dispatch(getMesas())
        dispatch(getPreordenes())
        dispatch(getPreordenesDetalles())        
    }, [])


    const cerrarServicio = () => {

        let data = {
            orden: 1,
            status: 2,            
            detalles: []
        }

        dispatch( addPreorden(data))            
        

    }



  return (
    <> 

        {
            waiter.wAuthenticated
                ? (

                    <>
                        
                        <ul>
                            <li>{waiter.nameWaiter}</li>            
                            <li><Link  to="/Servicio"> Regresar</Link></li>            
                            <li>Salir()</li>                        
                        </ul>


                    
                            { preordenes
                                .filter(p => p.restaurant === waiter.idRestaurant && p.status === 1)                      
                                .map (pre => (
                                            <>

                                            { pre.nombreCliente }
                                            <table>
                                            <thead>
                                                
                                                
                                                <th align='center'>Cantidad</th>                
                                                <th align='center'>Nombre</th>                                
                                                <th align='center'>Precio</th>                                
                                                <th align='center'>Subtotal</th>                                                                                
                                            </thead>
                                            <tbody>
                                            {
                                               preordenesdetalles
                                                .filter (x => x.preorden === pre.id)
                                                .map( element => (
                                                    <tr key={element.id} className="detallePedido">                            
                                    
                                                        <td align='center'>{element.cantidad}</td>                        
                                                        <td> { productos.filter(x=>x.id == element.producto)[0].nombre }  </td>
                                                        <td align='right'>${element.precio }</td>                            
                                                        <td align='right'>${element.cantidad  * element.precio}</td>  
                       
                                                    </tr>                    
                                                ))
                                            }
                                            </tbody>
                                            </table>

                                            </>                                        

                            ))}
                    
                    </>
                )
                :
                    null
                  


        }
        

    </>        
    )
};

export default Preordenes;
