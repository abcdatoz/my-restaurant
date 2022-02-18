import React, {useState,  useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'


import { getRestaurants } from '../actions/RestaurantActions'
import { getMesas } from '../actions/MesaAction'
import { login, logout } from '../actions/authWaiters'

import { getOrdenes,addOrden,editOrden,deleteOrden } from '../actions/OrdenAction'
import { getCategorias } from '../actions/CategoriaAction'
import { getProductos } from '../actions/ProductoAction'


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

    const dispatch = useDispatch()





    //useEffect
    useEffect(() => {            

        dispatch(getRestaurants())
        dispatch(getCategorias())
        dispatch(getProductos())
        dispatch(getMesas())
        dispatch(getOrdenes())
    
        
    }, [])



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

        setMesa(item.id)
        setMesaNombre(item.nombre)
      
        let arr = ordenes.filter(x => x.idMesa === item.id & x.status === 1)

        if (arr.length > 0){
            setOrden(arr[0].id)
        }else{
            setOrden('')
        }

        
    };
    
    const totalPedido = () => {

        let total = 0

        for (let i = 0; i < myOrden.length; i++) {
            total += myOrden[i].precio * myOrden[i].cantidad                     
        }

        return (<span>${total}</span> )
    }
    

    const addIt = (item) =>{

        let obj = {
            mesa: mesa,
            id: item.id,
            nombre: item.nombre,
            precio: item.precio
        }


        let arr = myOrden.filter(x=> mesa === mesa &&  x.id === item.id)
        let arr2 = myOrden.filter(x=> mesa === mesa && x.id !== item.id)
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
        
        let It = true
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
        <div className='tabs-group-vertical'>            
            {
                    categorias                    
                    .filter( p => p.restaurant === waiter.idRestaurant)
                    .map (item => (
                        <div className="tabs-item-vertical" key={item.id}>                            
                            
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

                                myOrden.filter(x=> x.id === prod.id).length
                                ? (
                                    <>
                                        <strong>{myOrden.filter(x=> x.id === prod.id)[0].cantidad}</strong>
                                        
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
        <table>
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
                    <td></td>                                                    
                    <td>
                    <div className='ver_resumen' onClick={() => setVerMiOrden(false) }>                
                        &nbsp;<br />
                        Regresar<br />
                        &nbsp;
                    </div>    
                    </td>
                    <td></td>                                                    
                    <td></td>                                                    
                    <td><button  onClick={() => {  setMyOrden([]) } } >Eliminar Todo</button></td>                                                    
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
                                        <div className='mesa-item' onClick={() => { verDetallesMesa(x) }}>
                                            {x.nombre}
                                        </div>
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
