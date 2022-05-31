import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRestaurants } from '../actions/RestaurantActions'
import { getCategorias } from '../actions/CategoriaAction'
import { getProductos } from '../actions/ProductoAction'
import { getProductoImagenes } from '../actions/ProductoImagenAction'
import Modal from './common/Modal';
import portada from '../images/sushiMakizushi.jpg';

import { addPreorden } from '../actions/PreordenAction'

const LaCarta = () => {


    //useState
    const [myRest, setMyRest] = useState('')
    const [myCategoria, setMyCategoria] = useState('')
   
    const [nombreRestaurant, setNombreRestaurant] = useState('')
    const [logo, setLogo] = useState('');
  
    const [verMiOrden, setVerMiOrden] = useState(false);  
    const [myOrden, setMyOrden] = useState([]);
    const [showModal, setShowModal] = useState(false)
    
    const [showModalOrden, setShowModalOrden] = useState(false)
    const [nombreCliente, setNombreCliente] = useState('')

    const [producto, setProducto] = useState({});
    const [imgProd, setimgProd] = useState('');

        
    //use Selectors
    const restaurantes = useSelector(state => state.restaurantes.lista)
    const categorias = useSelector(state => state.categorias.lista)
    const productos = useSelector(state => state.productos.lista)
    const productosImagenes = useSelector(state => state.productoImagenes.lista)
    
    

    //useDispatch
    const dispatch = useDispatch()

    //useEffect
    useEffect(() => {
        dispatch(getRestaurants())
        dispatch(getCategorias())
        dispatch(getProductos())
        dispatch(getProductoImagenes())      
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const welcomeTo = () =>{

        let siteurl = window.location.href

        let nombreRestaurant = siteurl.indexOf('?id=',0)
            
        if (nombreRestaurant !== -1){

            nombreRestaurant = siteurl.substring(nombreRestaurant + 4)        
            
            let arr = restaurantes.filter(x=>x.nombre.toUpperCase() === nombreRestaurant.toUpperCase())

            if (arr.length === 0){

                return (
                    <>
                        Page no Found!
                    </>
                )

            }else{

                return (
                    <>
                    <div className='portada' >
                        <div className='banner-img-wp'>
                            <img className='banner-img' src={portada}></img>
                        </div>   
                        <div className='mensajes'>
                            <h1 className='h1-title'>Bienvenidos</h1>
                            <h2>Restaurant <span>{nombreRestaurant}</span> </h2>
                            <button onClick={()=> setIdRestaurant(nombreRestaurant)}>Ver Menú</button>
                        </div>                                             
                    </div>
                    </>
                )

            }
             

        }else{

            
            return (
                <>
                    Page no Found!
                </>
            )

        }
    }

    const setIdRestaurant = (filtro) =>{

        let arr = restaurantes.filter( p => p.nombre.toUpperCase() === filtro.toUpperCase())  
        setMyRest(arr[0].id)
        setNombreRestaurant(arr[0].nombre)
        setLogo(arr[0].logo)
    }

    const totalPedido = () => {

        let total = 0

        for (let i = 0; i < myOrden.length; i++) {
            total += myOrden[i].precio * myOrden[i].cantidad                     
        }

        return (<span>${total}</span> )
    }



    const addIt = (item) =>{

        // let obj = {
        //     id: item.id,
        //     nombre: item.nombre,
        //     precio: item.precio
        // }


        let arr = myOrden.filter(x=> x.id === item.id)
        let arr2 = myOrden.filter(x=> x.id !== item.id)
        let arr3=[]

        if (arr.length > 0){

            let obj = {
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
                cantidad: arr[0].cantidad + 1
            }

            arr3 = [...arr2, obj]
            

        }else{

            let newobj = {
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
                cantidad: 1
            }

            arr3 = [...arr2, newobj]
            

        }

        

        arr = arr3.sort((a,b) => a.precio - b.precio) 
        
        setMyOrden(arr)        

        
    }

    const removeIt = (item) => {
        
        
        let arr = []


        for (let i = 0; i < myOrden.length; i++) {

            if (myOrden[i].id === item.id){
                
                if (myOrden[i].cantidad > 1){
                    
                    let obj = {
                        id : myOrden[i].id,
                        nombre: myOrden[i].nombre,
                        precio: myOrden[i].precio,
                        cantidad: myOrden[i].cantidad -1
                    }
                    arr.push(obj)
                }

            }else{
                arr.push(myOrden[i])
            }
        }
 

        arr.sort((a,b) => a.precio - b.precio) 


        setMyOrden(arr)
        
    };


    const enviarOrden = (e) => {
        e.preventDefault()

        
        if (nombreCliente === '' ) {
            alert('No ha capturado todos los campos que son requeridos')
            return
        }
        
        if (myOrden.length === 0){
            alert('No ha detallado su orden')
            return
        }

        let data = {
            restaurant: myRest,
            nombreCliente: nombreCliente,            
            detalles: myOrden
        }

        dispatch(addPreorden(data) )
        
        setShowModalOrden(false)
        setMyOrden([])
        setNombreCliente('')
        
        
    }
    
    const SeleccionaCategoria = (
        <div className='tabs-group'>
            {
                        categorias                    
                        .filter( p => p.restaurant === myRest)
                        .map (item => (
                            <div className="tabs-item" key={item.id}>                                                            
                                {
                                    item.id === myCategoria
                                    ? (<span className='tab-item-selected btn-icon'> {item.nombre}  </span>)
                                    : (<span className='tab-item btn-icon' onClick= { () => setMyCategoria(item.id) }> {item.nombre}  </span>)
                                }
                            
                            </div>
                ))                
            }

            <div className='header-btn header-cart' onClick={() => setVerMiOrden(true) }>                
                <i className='uil uil-shopping-bag'>Orden {totalPedido()}</i>  
            </div>           
            
        </div>
    )
 
    const listaProductos = (
        <>            
            { productos
                .filter(p => p.categoria === myCategoria)
                .map(prod => (
                    <div  key={prod.id} className='course'>

                        <div className='course-preview'>
                            {
                            productosImagenes
                                .filter(x => x.producto == prod.id)
                                .map (prodimagen => (
                                    <div key={prodimagen.id} onClick={() => { setShowModal(true); 
                                        setProducto(prod); 
                                        setimgProd(prodimagen.imagen)  } }   
                                    >   
                                        <img  src={prodimagen.imagen} />
                                    </div>
                                ))                            }
                        </div>

                        <div className='course-info'>
                                <h5>{prod.nombre} <span>(${prod.precio})</span></h5>
                                <p>{prod.descripcionA}</p>
                        </div>  

                        <div>
                            <button className='icon-btn add-btn' onClick={() => {  addIt(prod) } } >
                                <div className='add-icon'></div>
                                <div className='btn-txt'>Add</div>
                            </button>
                            
                            {
                                myOrden.filter(x=> x.id === prod.id).length
                                ? (
                                    <>
                                        <div className='colorText'>
                                            <h3>{myOrden.filter(x=> x.id === prod.id)[0].cantidad}</h3>    
                                        </div>                                        
                                        
                                        <button className='icon-btn add-btn' onClick={() => {  removeIt(prod) } } >                                        
                                            <div className='btn-txt'>Remove</div>
                                        </button>

                                    </>
                                )
                                : null

                            }                            
                        </div>                        
                    </div>                    
                ))
            }

        <Modal
            show={showModal} 
            handleClose = {() => setShowModal(false) } 
            titulo = { producto.nombre  } 
        >        
        <div class="modal-content">                                
            <hr /> 
            <div className='photo'>
                <img src={imgProd}/>                
                <div>
                    <strong>Descripción:</strong>
                    <p>{producto.descripcionA}</p>
                    <p>{producto.descripcionB}</p>
                    <p>{producto.descripcionC}</p>

                    <div className='contenido_modal'>
                        <strong>Precio:</strong> ${producto.precio} <br />
                        <strong>Calorias:</strong> {producto.calorias} <br />
                        <strong>tiempo de preparación:</strong> {producto.tiempoPreparacion}
                    </div> 
                </div>            
            </div>                                           
        </div>   
        </Modal>
        </>
    )

    const miPedido = (
        <>        
        <h2 className='miorden'>Mi orden</h2>

        <a className='btns' onClick={() => setVerMiOrden(false) }>
            <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            <span>Back</span>
        </a> 

        <div className='table_responsive'>
        <table className='formato'>
            <thead>                
                <th align='center'></th>
                <th align='center'>Cantidad</th>                
                <th align='center'>Nombre</th>                                
                <th align='center'>Precio</th>                                
                <th align='center'>Subtotal</th>                                
                <th align='center'></th>
                {
                    myOrden.map( element => (
                        <tr key={element.id}>                            
                            <td align='center'>
                                <button className='boton-' onClick={() => {  removeIt(element) } } >-</button>
                            </td>
                            <td align='center'><strong>{element.cantidad}</strong></td>
                            <td>{element.nombre }</td>                                                    
                            <td align='right'>${element.precio }</td>                            
                            <td align='right'>${element.cantidad  * element.precio}</td>  
                            <td align='center'>
                                <button className='botonmas'  onClick={() => {  addIt(element) } } >
                                    +
                                </button>
                            </td>
                        </tr>                    
                    ))
                }
                    <br></br>
                    <tr>                            
                        <td></td>
                        <td></td>                                                    
                        <td><strong>Total</strong></td>                            
                        <td></td>             
                        <td align='right'><strong>{totalPedido()}</strong></td>  
                        <td></td>  
                    </tr>  
            </thead>  
        <tbody>
        </tbody>
        </table>

        <br></br>
        {
            myOrden.length > 0
            ? (
            <>
            <div className='padre'>
                <div className='eliminarTodo' onClick={() => {  setMyOrden([]) } }>
                    ✘ Eliminar Orden
                </div> 

                <div className='generaOrdenstyle' onClick={ () => { setShowModalOrden(true);  }}>
                    ✔ Generar Orden
                </div> 
            </div>
             
            </>
                                    
            )
            : null
        } 
        </div>

        <Modal 
            show={showModalOrden} 
            handleClose = {() => setShowModalOrden(false) } 
            titulo = "Enviar Orden" 
        >
        
        <div class="modal-content">                                
            <hr />  
            <strong>A nombre de:</strong> <br /><br />
            <input 
                className='inputNombrede'
                type="text"
                placeholder='Nombre del cliente'
                name="nombreCliente"
                onChange= { e => setNombreCliente(e.target.value) }                            
                value= { nombreCliente }
            />   
            <br /><br /> 
            <button type="button" className='EnviarPedido' onClick={enviarOrden}>✔ Enviar Orden </button>                                                 
                                                               
        </div>
        </Modal>
        </>
    ) 

  

    return (
    <div>        
        {
            myRest === ''
                ? welcomeTo()
                : (
                    <>
                        <div className="sec-title text-center mb-5" >  
                            <p className='sec-sub-title mb-3'>our menu</p>                                
                        </div>   


                        {
                            verMiOrden
                                ? null
                                : SeleccionaCategoria
                                
                        }                        

                        {
                            verMiOrden
                                ? miPedido
                                : listaProductos
                                
                        }

                        

                        
                    </>
                ) 
        }          
              
    </div>
    )
}

export default LaCarta
