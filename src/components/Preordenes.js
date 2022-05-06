import React, {useState,  useEffect} from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { getRestaurants } from '../actions/RestaurantActions'
import { getMesas } from '../actions/MesaAction'
import Modal from './common/Modal'

import { getOrdenes,addOrden } from '../actions/OrdenAction'
import { getPreordenes, editPreorden    } from '../actions/PreordenAction'
import {  getPreordenesDetalles} from '../actions/PreordenDetalleAction'

import { getProductos } from '../actions/ProductoAction'

 

const Preordenes = () => {
        

    //useState

    // const [orden, setOrden] = useState('');
    const [mesa, setMesa] = useState('')
    const [preorden, setPreorden] = useState('')
    const [showModalOrden, setShowModalOrden] = useState(false)


    //use Selectors 
    const waiter =  useSelector(state => state.authWaiter)
    // const restaurantes = useSelector(state => state.restaurantes.lista)
    const productos = useSelector(state => state.productos.lista)
    const mesas = useSelector(state => state.mesas.lista)
    const preordenes = useSelector(state => state.preordenes.lista)    
    const preordenesdetalles = useSelector(state => state.preordenesDetalles.lista)
    const ordenes = useSelector(state => state.ordenes.lista)    

    

    const dispatch = useDispatch()

    //useEffect
    useEffect(() => {            

        dispatch(getRestaurants())        
        dispatch(getProductos())
        dispatch(getMesas())
        dispatch(getOrdenes())
        dispatch(getPreordenes())
        dispatch(getPreordenesDetalles())        

    }, [])// eslint-disable-line react-hooks/exhaustive-deps


   


    const seleccionarMesa = (idPreorden) => {
        setPreorden(idPreorden)
        setShowModalOrden(true)

    }


    const crearOrden = () => {



        

        
        let detalles = []


        preordenesdetalles
        .filter (x=> x.preorden === preorden)
        .forEach(element => {

            let newobj = {
                id: element.producto,                               
                precio: element.precio,
                cantidad: element.cantidad
            }

            detalles = [...detalles, newobj]
    
        });


        let data = {
            restaurant: waiter.idRestaurant,
            mesero: waiter.idWaiter,
            mesa: mesa,
            detalles:detalles
        }

        

        dispatch(addOrden(data) )


        let dataPreorden = {
            status: 2
        }

        dispatch(editPreorden(dataPreorden, preorden))

        setShowModalOrden(false)
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

                                            

                                            <table className='formato'>
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
                                                        <td> { productos.filter(x=>x.id === element.producto)[0].nombre }  </td>
                                                        <td align='right'>${element.precio }</td>                            
                                                        <td align='right'>${element.cantidad  * element.precio}</td>  
                       
                                                    </tr>                    
                                                ))
                                            }
                                            </tbody>
                                            </table>

                                            <button className='GenerarOrden'  onClick={() => {  seleccionarMesa(pre.id) } } >
                                                Generar Orden de { pre.nombreCliente }
                                            </button>

                                            </>                                        

                            ))}



                            <Modal 
                                show={showModalOrden} 
                                handleClose = {() => setShowModalOrden(false) } 
                                titulo = "Enviar Orden" 
                            >

                            <div className='photo'>
                                {
                                    preordenes.filter(p => p.id === preorden).length === 0
                                    ? null
                                    :(
                                        <>
                                            <h3>Orden de { preordenes.filter(p => p.id === preorden)[0].nombreCliente}</h3>                                                
                                        </>
                                    )
                                }


                            
                                

                                <br />


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
                                        .filter (x => x.preorden === preorden)
                                        .map( element => (
                                            <tr key={element.id} className="detallePedido">                                                                                    
                                                <td align='center'>{element.cantidad}</td>                        
                                                <td> { productos.filter(x=>x.id === element.producto)[0].nombre }  </td>
                                                <td align='right'>${element.precio }</td>                            
                                                <td align='right'>${element.cantidad  * element.precio}</td>  
                
                                            </tr>                    
                                        ))
                                    }
                                    </tbody>
                                </table>

                                <br />

                            
                                <form>
                                    <div className='form-input'>
                                        <strong>Seleccione la Mesa</strong><br />
                                        <select 
                                            name="mesa"
                                            value={mesa}
                                            onChange={ e=> setMesa (e.target.value) } >
                                            <option value="null">Seleccione la mesa</option>                           
                                            {
                                                mesas
                                                    .filter(p => p.restaurant === waiter.idRestaurant)                      
                                                    .map (x => (
                                                        <>

                                                        { ordenes.filter(ord => ord.mesa === x.id & ord.status === 1).length > 0

                                                            ? null
                                                            :( 

                                                                <option key={x.id} value={x.id}>
                                                                    {x.nombre}
                                                                </option>                                                        
                                                            )
                                                        }

                                                        </>                                                
                                                ))
                                            }
                                        </select>
                                        <br />
                                        <button className='SeleccionarMesa' type="button" onClick={() => { crearOrden() }}>Agregar Mesa </button>                        
                                    </div>
                                </form>
                            </div>            

                            </Modal>

                           


                    
                    </>
                )
                :
                    null
                  


        }
        

    </>        
    )
};

export default Preordenes;
