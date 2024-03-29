import React, {useState,  useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getProductos,addProducto,editProducto,deleteProducto } from '../actions/ProductoAction'
import { getProductoImagenes,addProductoImagen } from '../actions/ProductoImagenAction'

import Header from '../components/layouts/Header'
import Modal from './common/Modal';


import edit from '../images/edit_48px.png';
import deletes from '../images/Delete_48px.png';
import image from '../images/image_48px.png';



const Productos = () => {


    const urlImages = require('../config/url.config').resources

    //useStates
    const [myRest, setMyRest] = useState('')
    const [myCategoria, setMyCategoria] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showModalImagen, setShowModalImagen] = useState(false)

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

    const [imagen, setImagen] = useState('');
 

    //use Selectors
    const restaurantes = useSelector(state => state.restaurantes.lista)
    const categorias = useSelector(state => state.categorias.lista)
    const productos = useSelector(state => state.productos.lista)
    const productoImagenes = useSelector(state => state.productoImagenes.lista)
    const theOwner =  useSelector(state => state.auth.owner)
    // const ordenesdetalles = useSelector(state => state.meseros.lista)


    
    const dispatch = useDispatch()


    //useEffect
    useEffect(() => {       

        dispatch(getProductos())
        dispatch(getProductoImagenes())
        
    }, [])// eslint-disable-line react-hooks/exhaustive-deps




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

        
        if (clave === '' || nombre === '' || descripcionA === '' || precio === '') {
            alert('No ha capturado todos los campos que son requeridos')
            return
        }


          
        //validations
        let arr = productos.filter(x =>  x.id !== idx && x.restaurantId === myRest &&  x.clave.toUpperCase() === clave.toUpperCase()) 

        if (arr.length > 0){
            alert('Ya existe una producto registrado con esa clave')
            return
        }


        arr = productos.filter(x =>  x.id !== idx && x.restaurantId === myRest &&  x.nombre.toUpperCase() === nombre.toUpperCase()) 
        
        if (arr.length > 0){
            alert('Ya existe un producto registrado con ese nombre en este restaurant')
            return
        }

        ///endvalidations

        
        let data = {
            restaurant: myRest,
            categoria : myCategoria,
            clave,
            nombre,
            descripcionA,            
            precio,
            calorias,
            tiempoPreparacion    
        }
        
        if (mode === 'new')  dispatch(addProducto(data))       
        if (mode === 'edit') dispatch(editProducto(data, idx));
        
        
        
        setClave('')
        setNombre('')
        setDescripcionA('')
        setDescripcionB('')
        setDescripcionC('')
        setPrecio('')
        setCalorias('')
        setTiempoPreparacion('')
        setShowModal(false)
                
        dispatch(getProductos())        
        
    }
    

    const guardarImagen = (e) => {
      e.preventDefault();

      if (imagen ==='') {
        alert('No ha seleccionado la imagen del producto')
        return
    }
 


    let formdata = new FormData()

    
    formdata.append('restaurant', myRest)
    formdata.append('producto', idx)
    formdata.append('imagen', imagen, imagen.name)
    
    
    dispatch(addProductoImagen (formdata))            
     
    setShowModalImagen(false)
    setIdx('')

    }
    


    const SeleccionaRestaurant = (
        <>
        <h5> </h5>
        <div className='tabs-group'>                  
            {
                    restaurantes
                    .filter( p => p.owner === theOwner)
                    .map (item => (
                        <div className="tabs-item" key={item.id}>
                            <div>
                                                                                          
                                <span className='tab-item btn-icon' onClick={() => { 
                                                setMyRest(item.id);  
                                                setMyCategoria('')
                                            
                                            }}>{item.nombre} <img src={urlImages + item.logo} className="logoAdmin" alt="imagen"/> </span> 
                                            {
                                item.id === myRest
                                    ? null
                                    : (<button className='botonmas' onClick={() => { 
                                            setMyRest(item.id);  
                                            setMyCategoria('')
                                        
                                         } }>
                                             <img className='iconEdit' src={edit}  alt="imagen" />
                                         </button>)
                            }
                            </div>
                             
                            <br></br>
                            <br></br><br></br>
                            
                        </div>
                    ))
                }

            </div>
        </>
            
    )


    
    const SeleccionaCategoria = (
        <div className='tabs-group'>            
            {
                    categorias                    
                    .filter( p => p.restaurantId === myRest)
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

            </div>
    )


    const Listado = (

        <>
       
        <table className='styled-table'>
        <thead>            
            <th width="10%">Clave</th>                
            <th width="20%">Nombre</th>                                
            <th width="20%">Descripcion</th>                                
            <th width="10%">Precio</th>                                
            <th width="10%">Calorias</th>                                
            <th width="10%">Tiempo de Preparación</th>    
            <th width="10%">¿Tiene Imagen?</th>    

            <th width="20%"> ACCIONES </th>
        </thead>     
        <tbody>
        {
                productos
                .filter( p => p.categoriaId === myCategoria)
                .map (item => (
                    <tr key={item.id}>                            
                        <td>{item.clave}</td>
                        <td>{item.nombre }</td>                            
                        <td>{item.descripcionA }</td>                            
                        <td className='currency'>{item.precio }</td>                            
                        <td>{item.calorias }</td>                            
                        <td>{item.tiempoPreparacion }</td>                            
                        <td>{
                             productoImagenes.filter(x => x.productoId === item.id).length > 0 
                                ? (<span>si</span>)
                                : (<span>no</span>)
                        }</td>                            
                        <td className='btn-acciones'>

                            <button className='buttonAcciones' onClick={() => { setShowModalImagen(true); setIdx(item.id) } } >
                                <img className='iconEdit' src={image}  alt="imagen"/>
                            </button>

                            <button className='buttonAcciones'  onClick={() => editar(item)} >
                                <img className='iconEdit' src={edit}  alt="imagen"/> 
                            </button>
                                 
                            <button  className='buttonAcciones'  onClick={ ()=>{ eliminar(item)  }} >                                                                
                                <img className='iconEdit' src={deletes}  alt="imagen"/> 
                            </button>   

                      

                        </td>
                    </tr>
                ))
            }
        </tbody>
        </table>
        

        <Modal 
        show={showModalImagen} 
        handleClose = {() => setShowModalImagen(false) } 
        titulo = "Agregar imagen al producto"
    >
            
        <form>


            
        <div className="input-modal-content">                    
                    <input 
                        className="form-control"
                        type="file"
                        name="imagen"
                        accept="image/png, image/jpeg"
                        onChange = { e => setImagen(e.target.files[0])}
                        required
                    />
                    <label>Imagen</label>
                </div> 

            <br></br><br></br>
            <div className="form-buttons">
                <button className='EnviarPedido' type="button" onClick={guardarImagen}> ✔ Guardar </button>                        
            </div>
    
            

        </form>
        
        </Modal>

        </>
    )


    const Formulario = (
        <Modal 
            show={showModal} 
            handleClose = {() => setShowModal(false) } 
            titulo = {mode === 'new' ? 'Agregar producto' : ' Editar producto' } 
        >
        
        <strong>Proporcione información del nuevo producto: </strong>  
        <br></br>
        
            <form>


                <div className='input-modal-content'>                    
                    <input 
                        type="text"
                        required=""
                        name="clave"
                        onChange= { e => setClave(e.target.value) }                            
                        value= { clave }
                    />
                    <label>Clave</label>
                </div>
                <br></br>

                <div className='input-modal-content'>                    
                    <input 
                        type="text"
                        required=""
                        name="nombre"
                        onChange= { e => setNombre(e.target.value) }                            
                        value= { nombre }
                    />
                    <label>Nombre</label>
                </div>                  
                <br></br>
                
                <div className='input-modal-content'>                    
                    <input 
                        type="text"
                        required=""
                        name="descripcionA"
                        onChange= { e => setDescripcionA(e.target.value) }                            
                        value= { descripcionA }
                    />
                    <label>Descripción</label>
                </div>                  
                <br></br>    

                <div className='input-modal-content'>                    
                    <input 
                        type="number"
                        required=""
                        name="precio"
                        onChange= { e => setPrecio(e.target.value) }                            
                        value= { precio }
                    />
                    <label>Precio</label>
                </div>    
                <br></br>

                <div className='input-modal-content'>                    
                    <input 
                        type="text"
                        required=""
                        name="calorias"
                        onChange= { e => setCalorias(e.target.value) }                            
                        value= { calorias }
                    />
                    <label>Calorías</label>
                </div>    
                <br></br>

                <div className='input-modal-content'>                    
                    <input 
                        type="text"
                        required=""
                        name="tiempoPreparacion"
                        onChange= { e => setTiempoPreparacion(e.target.value) }                            
                        value= { tiempoPreparacion }
                    />
                    <label>Tiempo de Preparación</label>
                </div>    
                <br></br><br></br>

                <div className="form-buttons">
                    <button className='EnviarPedido' type="button" onClick={guardar}>✔ Guardar </button>                        
                </div>
        
                

            </form>
            
        </Modal>
    )


    





    return (
        <div>
            <Header />
            
            {SeleccionaRestaurant}

            {SeleccionaCategoria}


            {
                myCategoria === ''
                    ? null
                    : Listado
            }
           

            {
                myCategoria
                ? (<button className='button admin' type="button" onClick={ () => { setShowModal(true); setMode('new') }}>
                        + Agregar 
                    </button>
                    )
                : null
            }
            

 
            <br />
            
            

           {Formulario}



        </div>
    )
}

export default Productos
