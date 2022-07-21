import React, {useState,  useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRestaurants, addRestaurant, editRestaurant, deleteRestaurant } from '../actions/RestaurantActions'
import { getCategorias } from '../actions/CategoriaAction'
// import { getMeseros } from '../actions/MeseroActions'

import Header from '../components/layouts/Header'

import Modal from './common/Modal';

import edit from '../images/edit_48px.png';
import deletes from '../images/Delete_48px.png';


// import Form from './common/Form'
// import FormInput from './common/FormInput'

const HomeAdministracion = () => {


    const urlImages = require('../config/url.config').resources

    //useState
    const [showModal, setShowModal] = useState(false)
    // const [showModalDelete, setShowModalDelete] = useState(false)

    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [logo, setLogo] = useState('')
    const [mode, setMode] = useState('new')
    const [id, setId] = useState('')

    //use Selectors
    const restaurantes = useSelector(state => state.restaurantes.lista)
    const categorias = useSelector(state => state.categorias.lista)
    const theOwner =  useSelector(state => state.auth.owner)
    // const meseros = useSelector(state => state.meseros.lista)


    //useDispatch
    const dispatch = useDispatch()

    //useEffect
    useEffect(() => {
        dispatch(getRestaurants())
        dispatch(getCategorias())
        // dispatch(getMeseros())
        
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const nuevoRegistro = () => {
        setMode('new')
        
        
        setId('')        
        setNombre('')
        setDireccion('')        
        
        setShowModal(true)
    }
    

    const editar = (item) => {
        setMode('edit')
        
        
        setId(item.id)        
        setNombre(item.nombre)
        setDireccion(item.direccion)        
        
        setShowModal(true)


    }
    

    // const ConfirmaEliminar = (item) => {

    //     setId(item.id)
    //      setShowModalDelete(true)
    // }
    

    const eliminar = (item) => {

        let lista = categorias.filter(x => x.restaurant === item.id)

        if (lista.length > 0){
            alert('No se puede eliminar este restaurant porque tiene categorias registradas')
            return
        }

        // lista = meseros.filter(x => x.restaurant === item.id)
        // if (lista.length > 0){
        //     alert('No se puede eliminar este restaurant porque tiene meseros(as) registrados(as)')
        //     return
        // }

        // faltaria un modal para los avisos y mensajes para no usar alert
        // faltaria un modal para confirmar eliminacion
        dispatch(deleteRestaurant(item.id))
 
    
    }

    const guardar = (e) =>{
        e.preventDefault()

        
        if (nombre === '' || direccion === '' || logo === '') {
            alert('No ha capturado todos los campos')
            return
        }


        if (mode === 'new') {            
            let arr = restaurantes.filter(x => x.nombre.toUpperCase() === nombre.toUpperCase()) 

            if (arr.length > 0){
                alert('Ya existe un restaurante registrado con ese nombre en esta aplicacion')
                return
            }
        }     

        if (mode === 'edit') {            
            let arr = restaurantes.filter(x =>  x.id !== id &&  x.nombre.toUpperCase() === nombre.toUpperCase()) 

            if (arr.length > 0){
                alert('Ya existe un restaurante registrado con ese nombre en esta aplicacion')
                return
            }
        }     

 

        let formdata = new FormData()

        
        formdata.append('nombre', nombre)
        formdata.append('direccion', direccion)
        formdata.append('logo', logo, logo.name)
        formdata.append('user', theOwner)
        
        if (mode === 'new'){
            
            dispatch(addRestaurant (formdata))            
        }                      
            
        
        if(mode === 'edit')
            dispatch(editRestaurant(formdata, id))
        
            dispatch(getRestaurants())
        setShowModal(false)

    }
    


    const ListaRestaurantes = (
        <>
         <h5>Mis Restaurantes </h5>

            <button type="button" className='button admin' onClick={nuevoRegistro}>
                Agregar Nuevo Restaurant
            </button>      

            <table className='styled-table'>
            <thead>                
                <th width="10%">Logo</th>                
                <th width="30%">Nombre</th>
                <th width="30%">Dirección</th>
                <th width="10%">status</th>
                <th width="10%"> acciones </th>
            </thead>     
            <tbody>
                {
                    restaurantes
                    .filter( p => p.owner === theOwner)
                    .map (item => (
                        <tr key={item.id}>
                            <td> <img className='logoAdmin' src={urlImages + item.logo}  alt="imagen"/> </td>
                            <td><strong>{item.nombre}</strong></td>
                            <td>{item.direccion }</td>
                            <td><strong>{item.status}</strong></td>
                            <td>
                                <button className='buttonAcciones' onClick={() => editar(item)} >
                                    <img className='iconEdit' src={edit}  alt="imagen"/>
                                </button>
                                     <br></br>
                                <button className='buttonAcciones' onClick={ ()=>{ eliminar(item)  }} >                                                                
                                    <img className='iconEdit' src={deletes}  alt="imagen"/>     
                                </button>   

                                {/* <button  onClick={ ()=>{ setId(item.id); setShowModalDelete(true)  }} >                                                                
                                    eliminar
                                </button>    */}
                            </td>
                        </tr>
                    ))
                }                            
            </tbody>
            </table>




            

            <Modal 
                show={showModal} 
                handleClose = {() => setShowModal(false) } 
                titulo = 'Nuevo Restaurante'
            >
            
            <strong>Proporcione información del nuevo Restaurant: </strong>

            <div className='modal-content'>

                <form>
                    <div className='input-modal-content'>                            
                        <input 
                            required=""
                            type="text"                                
                            name="nombre"
                            onChange= { e => setNombre(e.target.value) }                            
                            value= { nombre }
                        />
                        <label>Nombre del Restaurant</label>
                    </div>
                    <br></br>

                    <div className='input-modal-content'>                    
                        <input 
                            type="text"
                            required=""
                            name="direccion"
                            onChange= { e => setDireccion(e.target.value) }                            
                            value= { direccion }
                        />
                        <label>Dirección del Restaurant</label>
                    </div> 
                    <br></br>  

                    <div className='input-modal-content'>                        
                        <input                             
                            type="file"
                            name="logo"
                            accept="image/png, image/jpeg"
                            onChange = { e => setLogo(e.target.files[0])}
                            required
                        />
                        <label>Logo del Restaurant</label>
                    </div>

                    <br></br>

                    <div className="form-buttons">
                        <button type="button" className='EnviarPedido' onClick={guardar}>✔ Guardar</button>                        
                    </div>

                </form>

            </div>
                
            </Modal>




            


            
        </>
    )

    return (    
        <div>
            <Header />                        
            <br />
            {
                theOwner  
                    ? ListaRestaurantes
                    : null
            }
           
           


        </div>
    )
}

export default HomeAdministracion