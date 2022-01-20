import React, {useState,  useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getProductos,addProducto,editProducto,deleteProducto } from '../actions/ProductoAction'

import Header from '../components/layouts/Header'
import Modal from './common/Modal'



const Productos = () => {

    //useStates
    const [myRest, setMyRest] = useState('')
    const [myCategoria, setMyCategoria] = useState('')
    const [showModal, setShowModal] = useState(false)

    const [mode, setMode] = useState('new')
    const [idx, setIdx] = useState('')
    const [clave, setClave] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcionA, setDescripcionA] = useState('')
    const [descripcionB, setDescripcionB] = useState('')
    const [descripcionC, setDescripcionC] = useState('')
    const [precio, setPrecio] = useState('')
    const [calorias, setCalorias] = useState('')
    const [tiempoPreparacion, setTiempoPreparacion] = useState('')

    const [tablaProductos, setTablaProductos] = useState([])

    //use Selectors
    const restaurantes = useSelector(state => state.restaurantes.lista)
    const categorias = useSelector(state => state.categorias.lista)
    const productos = useSelector(state => state.productos.lista)
    const theOwner =  useSelector(state => state.auth.owner)
    // const ordenesdetalles = useSelector(state => state.meseros.lista)


    
    const dispatch = useDispatch()


    const createCategoriasProductosList = (idRestaurant) =>{

        let cats = categorias.filter(x=> x.restaurant === idRestaurant)
        
        let arr = []
        
        cats.forEach(cat => {
                        

            let prods = productos.filter(x => x.categoria == cat.id )
            prods.forEach(pro => {
                
                let obj = {
                    id: pro.id,
                    clave: pro.clave,
                    nombre: pro.nombre,
                    restaurant: cat.restaurant
                }
    
                arr.push(obj)
                

            });

             

            

            
        });

        


        setTablaProductos(arr)

    }




    //useEffect
    useEffect(() => {       

        // dispatch(getProductos())

        dispatch(getProductos())

        if (restaurantes.length > 0){
            setMyRest(restaurantes[0].id)
            createCategoriasProductosList(restaurantes[0].id)
        }
        
    }, [])




    const editar = (item) => {
        setShowModal(true)

        
        setIdx(item.id)
        setClave(item.clave)
        setNombre(item.nombre)
        setDescripcionA(item.descripcionA)
        setDescripcionB(item.descripcionB)
        setDescripcionC(item.descripcionC)
        setPrecio(item.precio)
        setCalorias(item.calorias)
        setTiempoPreparacion(item.tiempoPreparacion)
        
        setMode('edit')
    }


    const eliminar = (item) => {
        // let lista = productos.filter(x => x.categoria === item.id)

        // if (lista.length > 0){
        //     alert('No se puede eliminar esta categoria porque tiene productos relacionados')
        //     return
        // }

        
        dispatch(deleteProducto(item.id))   
    }
    
    const guardar = (e) => {
        e.preventDefault()

        
        if (clave == '' || nombre == '' || descripcionA == '' || precio == '') {
            alert('No ha capturado todos los campos que son requeridos')
            return
        }


          
        //validations
        let arr = tablaProductos.filter(x =>  x.id !== idx && x.restaurant === myRest &&  x.clave.toUpperCase() == clave.toUpperCase()) 

        if (arr.length > 0){
            alert('Ya existe una producto registrado con esa clave')
            return
        }


        arr = tablaProductos.filter(x =>  x.id !== idx && x.restaurant === myRest &&  x.nombre.toUpperCase() == nombre.toUpperCase()) 
        console.log(arr)
        if (arr.length > 0){
            alert('Ya existe un producto registrado con ese nombre en este restaurant')
            return
        }

        ///endvalidations

        let data = {
            categoria : myCategoria,
            clave,
            nombre,
            descripcionA,
            descripcionB,
            descripcionC,
            precio,
            calorias,
            tiempoPreparacion    
        }

        if (mode == 'new') dispatch(addProducto(data))       
        if (mode == 'edit') dispatch(editProducto(data, idx))       
                   

        setClave('')
        setNombre('')
        setDescripcionA('')
        setDescripcionB('')
        setDescripcionC('')
        setPrecio('')
        setCalorias('')
        setTiempoPreparacion('')
        setShowModal(false)
        
    }
    


    const SeleccionaRestaurant = (
        <div className='card-group'>            
            {
                    restaurantes
                    .filter( p => p.user_owner == theOwner)
                    .map (item => (
                        <div className="card-item" key={item.id}>
                            <img src={item.logo}  alt="imagen" width="70px" height="70px"/> 
                            <h3>{item.nombre} </h3>
                            {
                                item.id === myRest
                                    ? null
                                    : (<button onClick={() => { 
                                            setMyRest(item.id);  
                                            setMyCategoria('')
                                            createCategoriasProductosList(item.id)   
                                         } }>Seleccionar</button>)
                            }
                            
                        </div>
                    ))
                }

            </div>
    )


    
    const SeleccionaCategoria = (
        <div className='tabs-group'>            
            {
                    categorias                    
                    .filter( p => p.restaurant == myRest)
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

            </div>
    )


    const Listado = (
        <table>
        <thead>
            
            <th width="10%">clave</th>                
            <th width="20%">Nombre</th>                                
            <th width="20%">descripcionA</th>                                
            <th width="10%">Precio</th>                                
            <th width="10%">Calorias</th>                                
            <th width="10%">Tiempo de Preparación</th>                                
            <th width="20%"> acciones </th>
        </thead>     
        <tbody>
        {
                productos
                .filter( p => p.categoria == myCategoria)
                .map (item => (
                    <tr key={item.id}>                            
                        <td>{item.clave}</td>
                        <td>{item.nombre }</td>                            
                        <td>{item.descripcionA }</td>                            
                        <td>{item.precio }</td>                            
                        <td>{item.calorias }</td>                            
                        <td>{item.tiempoPreparacion }</td>                            
                        <td className='btn-acciones'>

                            <button  onClick={() => editar(item)} >
                                editar
                            </button>
                                 
                            <button  onClick={ ()=>{ eliminar(item)  }} >                                                                
                                eliminar
                            </button>   

                      

                        </td>
                    </tr>
                ))
            }
        </tbody>
        </table>
        
    )


    const Formulario = (
        <Modal 
            show={showModal} 
            handleClose = {() => setShowModal(false) } 
            titulo = {mode} 
        >
        
        
            <form>


                <div className='form-input'>
                    <label>Clave</label>
                    <input 
                        type="text"
                        placeholder='Capture la clave del producto'
                        name="clave"
                        onChange= { e => setClave(e.target.value) }                            
                        value= { clave }
                        />
                </div>


                <div className='form-input'>
                    <label>Nombre</label>
                    <input 
                        type="text"
                        placeholder='Capture el nombre del producto'
                        name="nombre"
                        onChange= { e => setNombre(e.target.value) }                            
                        value= { nombre }
                        />
                </div>                  

                
                <div className='form-input'>
                    <label>Descripción</label>
                    <input 
                        type="text"
                        placeholder='Capture la descripción del producto'
                        name="descripcionA"
                        onChange= { e => setDescripcionA(e.target.value) }                            
                        value= { descripcionA }
                        />
                </div>                  

                <div className='form-input'>
                    <label>Precio</label>
                    <input 
                        type="number"
                        placeholder='Capture el precio del producto'
                        name="precio"
                        onChange= { e => setPrecio(e.target.value) }                            
                        value= { precio }
                        />
                </div>    

                <div className='form-input'>
                    <label>Calorías</label>
                    <input 
                        type="text"
                        placeholder='Capture las calorías que contiene el producto'
                        name="calorias"
                        onChange= { e => setCalorias(e.target.value) }                            
                        value= { calorias }
                        />
                </div>    

                <div className='form-input'>
                    <label>Tiempo de Preparación</label>
                    <input 
                        type="text"
                        placeholder='Capture el tiempo de preparación del producto'
                        name="tiempoPreparacion"
                        onChange= { e => setTiempoPreparacion(e.target.value) }                            
                        value= { tiempoPreparacion }
                        />
                </div>    


                <div className="form-buttons">
                    <button type="button" onClick={guardar}>Guardar </button>                        
                </div>
        
                

            </form>
            
        </Modal>
    )









    return (
        <div>
            <Header />

            


            
            {SeleccionaRestaurant}
            {SeleccionaCategoria}

            {Listado}
           

            {
                myCategoria
                ? (<button type="button" onClick={ () => { setShowModal(true); setMode('new') }}>
                        + Agregar 
                    </button>
                    )
                : null
            }
            


            <br />
            <br />
            <br />
            <br />
            <br />

            {/* <ul>
            {
                tablaProductos                
                .map (item => (
                    <li key={item.id}>                            
                        {item.clave}  {item.nombre } {item.restaurant}                        
                    </li>
                ))
            }
            </ul> */}

           {Formulario}



        </div>
    )
}

export default Productos