import React, {useState,  useEffect} from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { getRestaurants } from '../actions/RestaurantActions'
import { getMesas } from '../actions/MesaAction'
import { login, logout } from '../actions/authWaiters'

import { getOrdenes,addOrden,editOrden,deleteOrden } from '../actions/OrdenAction'
import { getOrdenesDetalles,addOrdenDetalle,editOrdenDetalle,deleteOrdenDetalle } from '../actions/OrdenDetalleAction'
import { getCategorias } from '../actions/CategoriaAction'
import { getProductos } from '../actions/ProductoAction'


import useFetch from './common/useFetch';

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
    const ordenNewId = useSelector(state => state.ordenes.newId)    
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
    }, [])


    //useFetch
    const  [ordenState, postOrden] = useFetch();



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
        <div>
                
            <strong>
                LOGIN
            </strong>
        
            <form>

                <div className='form-input'>
                    <label>Restaurant</label>
                    <select 
                        name="rest"
                        value={rest}
                        onChange={ e=> setRest (e.target.value) } >
                        <option value="null">Seleccione el restaurant</option>                                
                        {restaurantes.map(x => (
                            <option key={x.id} value={x.id}>
                                {x.nombre}
                            </option>
                    ))}
                    </select>
                </div>


                <div className='form-input'>
                    <label>Usuario</label>
                    <input 
                        type="text"
                        name="usuario"
                        onChange= { e => setUsuario(e.target.value) }                            
                        value= { usuario }
                        />
                </div>


                <div className='form-input'>
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password"
                        onChange= { e => setPassword(e.target.value) }                            
                        value= { password }
                        />
                </div>                  



                <div className="form-buttons">
                    <button type="button" onClick={entrar}>Entrar </button>                        
                </div>



            </form>
          
                

        </div>

    )

    const SeleccionaCategoria = (
        <div className='tabs-group'>            
            {
                    categorias                    
                    .filter( p => p.restaurant === waiter.idRestaurant)
                    .map (item => (
                        <div className="tabs-item" key={item.id}>                            
                            
                            {
                                item.id === myCategoria
                                    ? (<span className='tab-item-selected'> {item.nombre}  </span>)
                                    : (<span className='tab-item' onClick= { () => setMyCategoria(item.id) }> {item.nombre}  </span>)
                            }
                            
                        </div>
                ))
                
            }

            <div className='ver_resumen' onClick={() => setVerMiOrden(true) }>                
                ver <br />
                pre-orden<br />
                {totalPedido()}
            </div>


        </div>
    )



    const listaProductos = (
        <>

            <table>
            { productos
                .filter(p => p.categoria === myCategoria)
                .map(prod => (
                    <tr  key={prod.id}>                        

                        <td>{prod.nombre}</td>
                        <td>${prod.precio}</td>
                        <td>
                            <button  onClick={() => {  addIt(prod) } } >
                                + add 
                            </button>
                            
                            {

                                myOrden.filter(x=> x.id === prod.id && x.mesa === mesa).length
                                ? (
                                    <>
                                        <strong>{myOrden.filter(x=> x.id === prod.id && x.mesa === mesa)[0].cantidad}</strong>
                                        
                                        <button  onClick={() => {  removeIt(prod) } } >
                                            - remove
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
            


        </>
    )



    const miPedido = (
        <>


            <h2>Mi orden</h2>
            {
                ordenesdetalles.filter (x => x.orden === orden).length > 0
                ? (
                    <button  onClick={() => {  cerrarServicio() } } >
                        cerrar servicio en esta mesa
                    </button>
                )
                : null
            }
            
            
 
        



        <table>
        <thead>
            
            <th align='center'></th>
            <th align='center'>Cantidad</th>                
            <th align='center'>Nombre</th>                                
            <th align='center'>Precio</th>                                
            <th align='center'>Subtotal</th>                                
            <th align='center'></th>

            {
                ordenesdetalles
                    .filter (x => x.orden === orden)
                    .map( element => (
                    <tr key={element.id} className="detallePedido">                            
                        <td align='center'>
                            Ronda: {element.ronda}
                        </td>
                        <td align='center'>{element.cantidad}</td>                        
                        <td> { productos.filter(x=>x.id == element.producto)[0].nombre }  </td>
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
                            <button  onClick={() => {  removeIt(element) } } >- remove</button>
                        </td>
                        <td align='center'>{element.cantidad}</td>
                        <td>{element.nombre }</td>                                                    
                        <td align='right'>${element.precio }</td>                            
                        <td align='right'>${element.cantidad  * element.precio}</td>  
                        <td align='center'>
                            <button  onClick={() => {  addIt(element) } } >
                                + add 
                            </button>
                        </td>
                    </tr>                    
                ))
            }
                <tr><td>&nbsp;</td></tr>
                <tr>                            
                    <td></td>
                    <td></td>                                                    
                    <td>Total</td>                            
                    <td></td>             
                    <td align='right'>{totalPedido()} </td>  
                </tr>     

                <tr><td>&nbsp;</td></tr>

                <tr>

                    <td>

                    {
                        myOrden.filter (x => x.mesa === mesa).length > 0
                        ? (
                            <div className='ver_resumen' onClick={() => {removeAll() } }>                
                                &nbsp;<br />
                                Limpiar <br />
                                &nbsp;
                            </div>
                            
                        )
                        : null
                    }                       

                    </td>                                                    


                    <td></td>

                    <td>

                        

                        {
                            myOrden.filter (x => x.mesa === mesa).length > 0
                            ? (
                                <div className='ver_resumen' onClick={() => generarOrden() }>                
                                    &nbsp;<br />
                                    agregar a la ORDEN<br />
                                    &nbsp;
                                </div> 
                            )
                            : null
                        }
                        </td>
                      
                      
                    <td></td>

                    <td>
                        <div className='ver_resumen' onClick={() => setVerMiOrden(false) }>                
                            &nbsp;<br />
                            Regresar<br />
                            &nbsp;
                        </div>       
                    </td>                                                    

                    

                </tr>

        </thead>     
        <tbody>

        </tbody>
        </table>
         
        
                                        

        </>
    ) 


      



  return (
    <> 

        {
            waiter.wAuthenticated
                ? (

                    <>
                    
                    <ul>
                        <li>{waiter.nameWaiter}</li>            
                        <li><Link  to="/Preordenes">Pre-Ordenes</Link></li>            
                        <li>Salir()</li>                        
                    </ul>




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

                                    { ordenes.filter(ord => ord.mesa === x.id & ord.status == 1).length > 0

                                        ? ( 
                                            <div key={x.id} className='mesa-item working' onClick={() => { verDetallesMesa(x.id) }}>
                                                {x.nombre} atendiendose
                                            </div>                                           
                                        )
                                        :( 

                                            <div key={x.id} className='mesa-item working' onClick={() => { verDetallesMesa(x.id) }}>
                                                {x.nombre} --libre
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
