import React, {useState,  useEffect} from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { getRestaurants } from '../actions/RestaurantActions'
import { getMesas } from '../actions/MesaAction'
import { login } from '../actions/authWaiters'

import { getOrdenes,addOrden,editOrden } from '../actions/OrdenAction'
import { getOrdenesDetalles  } from '../actions/OrdenDetalleAction'
import { getCategorias } from '../actions/CategoriaAction'
import { getProductos } from '../actions/ProductoAction'
import imagen from '../images/BackgroundMenu.png';


// import useFetch from './common/useFetch';

const Servicio = () => {
        

    //useState
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [rest, setRest] = useState('');
    const [mesa, setMesa] = useState('');
    const [mesaNombre, setMesaNombre] = useState('');
    
    const [myOrden, setMyOrden] = useState([]);
    const [verMiOrden, setVerMiOrden] = useState(false);  


    const [orden, setOrden] = useState('');

    const [myCategoria, setMyCategoria] = useState('')


    //use Selectors 
    const waiter =  useSelector(state => state.authWaiter)
    const restaurantes = useSelector(state => state.restaurantes.lista)
    const categorias = useSelector(state => state.categorias.lista)
    const productos = useSelector(state => state.productos.lista)
    const mesas = useSelector(state => state.mesas.lista)
    const ordenes = useSelector(state => state.ordenes.lista)    
    // const ordenNewId = useSelector(state => state.ordenes.newId)    
    const ordenesdetalles = useSelector(state => state.ordenesDetalles.lista)
    

    const dispatch = useDispatch()





    //useEffect
    useEffect(() => {            

        dispatch(getRestaurants())
        dispatch(getCategorias())
        dispatch(getProductos())
        dispatch(getMesas())
        dispatch(getOrdenes())
        dispatch(getOrdenesDetalles())        
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    //useFetch
    // const  [ordenState, postOrden] = useFetch();



    const entrar = () => {
      
        if (rest === '') {
            alert('No ha capturado el restaurant al que se quiere loguear')
            return
        }

        if (usuario === '' || password === '') {
            alert('Noha capturado el usuario y contraseña')
            return
        }

        
        dispatch(login(usuario, password, rest)    )
    };
    





    const verDetallesMesa = (item) => {

        dispatch(getOrdenesDetalles())
        
        let arrMesas = mesas.filter(x => x.id === item)


        setMesa(item)
        setMesaNombre(arrMesas[0].nombre)
        setVerMiOrden(false)
      
        let arr = ordenes.filter(x => x.mesa === item & x.status === 1)   

        if (arr.length > 0){
            setOrden(arr[0].id)            
        }else{
            setOrden('')
        }

        
        
    };
    
    const totalPedido = () => {

        let total = 0


        let arr =  ordenesdetalles.filter (x => x.orden === orden)

        for (let i = 0; i < arr.length; i++) {            
            total += arr[i].subtotal            
        }

        for (let i = 0; i < myOrden.length; i++) {
            if  (myOrden[i].mesa === mesa) {
                total += myOrden[i].precio * myOrden[i].cantidad                     
            }
        }

        return (<span>${total}</span> )
    }
    

    const addIt = (item) =>{

      
        let arr  = myOrden.filter(x=> x.mesa === mesa & x.id === item.id)
        let arr2 = myOrden.filter(x=> x.mesa === mesa & x.id !== item.id)
        let arr3 = myOrden.filter(x=> x.mesa !== mesa)


        arr2 = [...arr2, ...arr3]
        arr3 = []

        if (arr.length > 0){

            let obj = {
                id: item.id,
                mesa: mesa,
                nombre: item.nombre,
                precio: item.precio,
                cantidad: arr[0].cantidad + 1
            }

            arr3 = [...arr2, obj]
            

        }else{

            let newobj = {
                id: item.id,
                mesa: mesa,
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

            if (myOrden[i].id === item.id && myOrden[i].mesa === mesa){
                
                if (myOrden[i].cantidad > 1){
                    
                    let obj = {
                        id : myOrden[i].id,
                        mesa: mesa,
                        nombre: myOrden[i].nombre,
                        precio: myOrden[i].precio,
                        cantidad: myOrden[i].cantidad - 1
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

    const removeAll = () =>{
      
        let arr = myOrden.filter(x=> x.mesa !== mesa)
        setMyOrden(arr)        
        dispatch(getOrdenesDetalles())
    }

 

    const generarOrden = () => {


        if (orden === ''){

            
            let data = {
                restaurant: waiter.idRestaurant,
                mesero: waiter.idWaiter,
                mesa: mesa,
                detalles: myOrden.filter(x=> x.mesa === mesa)
            }

            dispatch(addOrden(data) )


        }else{

            let arr =  ordenesdetalles
                        .filter( p => p.orden === orden)
                        .map( x => { return x.ronda })
            let lastRonda = Math.max(...arr) 
            

            let datax = {
                orden: orden,
                status: 1,
                lastRonda: lastRonda,
                detalles: myOrden.filter(x=>x.mesa === mesa)
            }

            dispatch(editOrden(datax,orden))            
        
        }

        removeAll()
        setMesa('')
        setMesaNombre('')
        setOrden('')


        
        
        

    }


    const cerrarServicio = () => {

        let data = {
            orden: orden,
            status: 2,            
            detalles: []
        }

        dispatch(editOrden(data,orden))            
        removeAll()
        setMesa('')
        setMesaNombre('')
        setOrden('')

    }


    const FormLogin = (
        <div className='modal_menu'>
        <div className='modal__container'>
            <div className='modal__featured'>
            <div class="modal__circle"></div>
                <img src={imagen} class="modal__product" />
            </div>

            <div className='modal__content'>
            <h2>Login</h2>
            
        <form>

            <div className='form-input'>
                <label>Restaurante </label>
                <select  
                    name="rest"
                    value={rest}
                    onChange={ e=> setRest (e.target.value) } >
                    <option value="null" className='dropdown-list_item'>Seleccione el restaurante</option>                                
                    {restaurantes.map(x => (
                        <option key={x.id} value={x.id}>
                            {x.nombre}
                        </option>
                ))}
                </select>
            </div>

            <ul className='form-list'>
                <li className='form-list_row'>
                    <label>Usuario</label>
                    <input 
                    type="text"
                    name="usuario"
                    onChange= { e => setUsuario(e.target.value) }                            
                    value= { usuario }
                    />
                </li>
            </ul>

            <ul className='form-list'>
                <li className='form-list_row'>
                    <label>Contraseña</label>
                    <input 
                    type="password"
                    name="password"
                    onChange= { e => setPassword(e.target.value) }                            
                    value= { password }
                    />
                </li>                            
            </ul>

            <br></br>
            <div>
                <button type="button" className='button' onClick={entrar}>Entrar </button>                        
            </div>
    </form>
</div>



        </div>
      
</div>

    )

    const SeleccionaCategoria = (
        <div>
            <div className='tabs-group-vertical'>            
            {
                    categorias                    
                    .filter( p => p.restaurant === waiter.idRestaurant)
                    .map (item => (
                        <div className="tabs-item-vertical" key={item.id}>                            
                            
                            {
                                item.id === myCategoria
                                    ? (<span className='tab-item-selected-vertical'> {item.nombre}  </span>)
                                    : (<span className='tab-item-vertical' onClick= { () => setMyCategoria(item.id) }> {item.nombre}  </span>)
                            }
                            
                        </div>
                ))
                
            }

            </div>  

            <div className='pp'>
                <div className='ver_resumen' onClick={() => setVerMiOrden(true) }>                
                    <div className='resumen_orden'>Resumen Orden</div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className='resumen_pre-orden'>
                        <div className='pre-orden'>Visualizar pre-orden</div>
                    </div>
                </div>
            </div>
        </div>
    )



    const listaProductos = (
        <>
    <br></br>
    <div className='ListaProductos'>
    <table>
            { productos
                .filter(p => p.categoria === myCategoria)
                .map(prod => (
                    <tr  key={prod.id}>                        

                        <td>{prod.nombre}</td>
                        <td>${prod.precio}</td>
                        <td>
                            
                            <button className='icon-btn add-btn' onClick={() => {  addIt(prod) } } >
                                <div className='add-icon'></div>
                                <div className='btn-txt'>Add</div>
                            </button>
                            
                            {

                                myOrden.filter(x=> x.id === prod.id && x.mesa === mesa).length
                                ? (
                                    <>                                        
                                        <strong className='colorTextoVertical'>{myOrden.filter(x=> x.id === prod.id && x.mesa === mesa)[0].cantidad}</strong>
                                        
                                        
                                        <button className='icon-btn add-btn' onClick={() => {  removeIt(prod) } } >                                        
                                            <div className='btn-txt'>Remove</div>
                                        </button>

                                    </>
                                )
                                : null

                            }
                        </td>
                    </tr>
                ))
            }
            </table>
    </div>
            
            


        </>
    )



    const miPedido = (
        <>
            <h2 className='miorden'>Mi orden</h2>
            {
                ordenesdetalles.filter (x => x.orden === orden).length > 0
                ? (
                    <button className='cerrarPedido' onClick={() => {  cerrarServicio() } } >
                        cerrar servicio en esta mesa
                    </button>
                )
                : null
            }

    <div className='table_responsive'>
    <table className='formato'>
        <thead>
            
            <th align='center'></th>
            <th align='center'>Cantidad</th>                
            <th align='center'>Nombre</th>                                
            <th align='center'>Precio</th>                                
            <th align='center'>Subtotal</th>                               
            

            {
                ordenesdetalles
                    .filter (x => x.orden === orden)
                    .map( element => (
                    <tr key={element.id} className="detallePedido">                            
                        <td align='center'>
                            Ronda: {element.ronda}
                        </td>
                        <td align='center'>{element.cantidad}</td>                        
                        <td> { productos.filter(x=>x.id === element.producto)[0].nombre }  </td>
                        <td align='right'>${element.precio }</td>                            
                        <td align='right'>${element.cantidad  * element.precio}</td>  
                       
                    </tr>                    
                ))
            }


            {
                myOrden
                    .filter (x => x.mesa === mesa)
                    .map( element => (
                    <tr key={element.id} >                            
                        <td align='center'>
                            <button className='boton-' onClick={() => {  removeIt(element) } } >-</button>
                        </td>
                        <td align='center'>{element.cantidad}</td>
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
                        <td>Total</td>                            
                        <td></td>             
                        <td align='right'>{totalPedido()} </td>  
                    </tr>     

                    <br></br>

                    <div className='ver_resumen' onClick={() => setVerMiOrden(false) }>
                          
                          <a className='btns'>
                              <div className='arrow'></div>
                          </a>                       
                      </div>  

                {
                        myOrden.filter (x => x.mesa === mesa).length > 0
                        ? (
                            <>
                            <button className='eliminarTodo' onClick={() => {  removeAll() } } >
                            ✘
                            </button>

                            <div className='EnviarPedidoServicio' onClick={() => generarOrden() }>                
                            ✔
                            </div> 

                            </>
                            
                        )
                        : null
                    }   
                    

                        
                

        </thead>     
        <tbody>

        </tbody>
        </table>
    </div>
                                       

        </>
    ) 


      



  return (
    <> 

        {
            waiter.wAuthenticated
                ? (

                    <>
                    <div>
                        <ul>
                            <li>{waiter.nameWaiter}</li>            
                            <li><Link  to="/Preordenes">Pre-Ordenes</Link></li>            
                            <li>Salir()</li>                        
                        </ul>
                    </div>
                    {
                        mesa
                            ? (
                                <>
                                    
                                    <div className='mesa-item' onClick={() => {  setMesa(''); setMesaNombre(''); setOrden('') }}>
                                        {mesaNombre}  
                                    </div>

                                    <div className='card-group'>                                   

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

                                    </div>


                                </>
                            )
                            : (
                                <div className='mesas-group'>
                                {mesas
                                .filter(p => p.restaurant === waiter.idRestaurant)                      
                                .map (x => (
                                    <>

                                    { ordenes.filter(ord => ord.mesa === x.id & ord.status === 1).length > 0

                                        ? ( 
                                            <div key={x.id} className='mesa-item' onClick={() => { verDetallesMesa(x.id) }}>
                                                {x.nombre} <div className='working'>En Servicio</div> 
                                            </div>                                           
                                        )
                                        :( 

                                            <div key={x.id} className='mesa-item' onClick={() => { verDetallesMesa(x.id) }}>
                                                {x.nombre} <div className='libre'>Disponible</div> 
                                            </div>  
                                        
                                        )
                                    }

                                    </>                                        

                                ))}
                                </div>        
                            )
                    }
                    
                    



                    </>
                )
                :
                        FormLogin
                  


        }
        

    </>        
    )
};

export default Servicio;
