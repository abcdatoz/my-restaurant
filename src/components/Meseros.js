import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getMeseros, addMesero,editMesero,deleteMesero } from '../actions/MeseroAction'

import Header from '../components/layouts/Header'

import Modal from './common/Modal';

import edit from '../images/edit_48px.png';
import deletes from '../images/Delete_48px.png';

const Meseros = () => { 

   //useStates
   const [myRest, setMyRest] = useState('')
   const [showModal, setShowModal] = useState(false)

   const [mode, setMode] = useState('new')
   const [idx, setIdx] = useState('')
   const [nombre, setNombre] = useState('')
   const [password, setPassword] = useState('')
   const [nombreCompleto, setNombreCompleto] = useState('')
//    const [status, setStatus] = useState('')
   

   //use Selectors
   const restaurantes = useSelector(state => state.restaurantes.lista)
   const meseros = useSelector(state => state.meseros.lista)
   const theOwner =  useSelector(state => state.auth.owner)
    

    //useDispatch
    const dispatch = useDispatch()

    //useEffect
    useEffect(() => {
        dispatch(getMeseros())   
        
        if (restaurantes.length > 0){
            setMyRest(restaurantes[0].id)
        }

    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    
    const editar = (item) => {
        setShowModal(true)

        
        setIdx(item.id)
        setNombre(item.nombre)
        setPassword(item.password)
        setNombreCompleto(item.nombre_completo)
        
          
        setMode('edit')
    }


    const eliminar = (item) => {
        // let lista = productos.filter(x => x.categoria === item.id)

        // if (lista.length > 0){
        //     alert('No se puede eliminar esta categoria porque tiene productos relacionados')
        //     return
        // }

        
        dispatch(deleteMesero(item.id))   
    }
    
    const guardar = (e) => {
        e.preventDefault()

        
        if ( nombre === '' || nombreCompleto === '' || password === '') {
            alert('No ha capturado todos los campos')
            return
        }


          
        //validations
        let arr = meseros.filter(x =>  x.id !== idx 
                                && x.restaurant === myRest 
                                &&  x.nombre.toUpperCase() === nombre.toUpperCase()
                            ) 

        if (arr.length > 0){
            alert('Ya existe una mesero(a) registrado(a) con ese nombre en este restaurant')
            return
        }
 

        ///endvalidations

        let data = {
            restaurant : myRest,
            nombre,    
            password,    
            nombre_completo: nombreCompleto                
        }

        if (mode === 'new') dispatch(addMesero(data))       
        if (mode === 'edit') dispatch(editMesero(data, idx))       
                   

        setNombre('')
        setPassword('')
        setNombreCompleto('')
        setShowModal(false)
        
    }
    
    


    const SeleccionaRestaurant = (
        <div className='card-group'>            
            {
                    restaurantes
                    .filter( p => p.user_owner === theOwner)
                    .map (item => (
                        <div className="mensajes" key={item.id}>
                            <br></br>
                            <img className='logoAdmin' src={item.logo}  alt="imagen"/> 
                            <span>{item.nombre} </span>
                            {
                                item.id === myRest
                                    ? null
                                    : (<button className='botonmas' onClick={() =>{ setMyRest(item.id)} }>
                                       <img className='iconEdit' src={edit}  alt="imagen"/>  
                                    </button>)
                            }
                            
                        </div>
                    ))
                }

            </div>
    )

    const Listado = (
        <table className='styled-table'>
        <thead>
            
            <th width="50%">Nombre Completo</th>                                
            <th width="50%">Usuario</th>                                
            <th width="20%">Status</th>                
            <th width="20%">acciones </th>
        </thead>     
        <tbody>
        {
                meseros
                .filter( p => p.restaurant === myRest)
                .map (item => (
                    <tr key={item.id}>                            
                        <td>{item.nombre_completo}</td>
                        <td>{item.nombre}</td>
                        <td>{item.status }</td>                            
                        <td className='btn-acciones'>

                            <button className='buttonAcciones' onClick={() => editar(item)} >
                                <img className='iconEdit' src={edit}  alt="imagen"/> 
                            </button>
                                 
                            <button className='buttonAcciones' onClick={ ()=>{ eliminar(item)  }} >                                                                
                                <img className='iconEdit' src={deletes}  alt="imagen"/> 
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
                    <label>Nombre Completo</label>
                    <input 
                        type="text"
                        placeholder='introduzca el nombre del mesero'
                        name="nombreCompleto"
                        onChange= { e => setNombreCompleto(e.target.value) }                            
                        value= { nombreCompleto }
                        />
                </div>        



                <div className='form-input'>
                    <label>usuario</label>
                    <input 
                        type="text"
                        placeholder='nombre de usuario'
                        name="nombre"
                        onChange= { e => setNombre(e.target.value) }                            
                        value= { nombre }
                        />
                </div>

                <div className='form-input'>
                    <label>contraseña</label>
                    <input 
                        type="text"
                        placeholder='introduzca la contraseña'
                        name="password"
                        onChange= { e => setPassword(e.target.value) }                            
                        value= { password }
                        />
                </div>

                <div className="form-buttons">
                    <button className='EnviarPedido' type="button" onClick={guardar}>✔ Guardar</button>                        
                </div>

            </form>
            
        </Modal>
    )



    return (    
        <div>
            <Header />
            {SeleccionaRestaurant}

            {Listado}

            <button className='button admin' type="button" onClick={ () => { setShowModal(true); setMode('new') }}>
                + Agregar 
            </button>

           {Formulario}
        </div>
    )
}

export default Meseros