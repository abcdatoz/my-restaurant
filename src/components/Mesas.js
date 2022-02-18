import React, {useState,  useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getMesas,addMesa,editMesa,deleteMesa } from '../actions/MesaAction'
 
import Header from '../components/layouts/Header'

import Modal from './common/Modal'

const Mesas = () => {

    //useStates
    const [myRest, setMyRest] = useState('')
    const [showModal, setShowModal] = useState(false)

    const [mode, setMode] = useState('new')
    const [idx, setIdx] = useState('')
    const [nombre, setNombre] = useState('')
    const [status, setStatus] = useState('')


    //use Selectors
    const restaurantes = useSelector(state => state.restaurantes.lista)
    const mesas = useSelector(state => state.mesas.lista)
    const theOwner =  useSelector(state => state.auth.owner)
     

    
    const dispatch = useDispatch()

    //useEffect
    useEffect(() => {       

        dispatch(getMesas())

        if (restaurantes.length > 0){
            setMyRest(restaurantes[0].id)
        }
        
    }, [])




    const editar = (item) => {
        setShowModal(true)

        
        setIdx(item.id)
        setNombre(item.nombre)
        setStatus(item.status)
          
        setMode('edit')
    }


    const eliminar = (item) => {
        // let lista = productos.filter(x => x.categoria === item.id)

        // if (lista.length > 0){
        //     alert('No se puede eliminar esta categoria porque tiene productos relacionados')
        //     return
        // }

        
        dispatch(deleteMesa(item.id))   
    }
    
    const guardar = (e) => {
        e.preventDefault()

        
        if ( nombre === '' ) {
            alert('No ha capturado todos los campos')
            return
        }


          
        //validations
        let arr = mesas.filter(x =>  x.id !== idx && x.restaurant === myRest &&  x.nombre.toUpperCase() === nombre.toUpperCase()) 

        if (arr.length > 0){
            alert('Ya existe una mesa registrada con ese nombre en este restaurant')
            return
        }
 

        ///endvalidations

        let data = {
            restaurant : myRest,
            nombre,    
            status,
        }

        if (mode === 'new') dispatch(addMesa(data))       
        if (mode === 'edit') dispatch(editMesa(data, idx))       
                   

        setNombre('')
        setShowModal(false)
        
    }
    


    const SeleccionaRestaurant = (
        <div className='card-group'>            
            {
                    restaurantes
                    .filter( p => p.user_owner === theOwner)
                    .map (item => (
                        <div className="card-item" key={item.id}>
                            <img src={item.logo}  alt="imagen" width="70px" height="70px"/> 
                            <h3>{item.nombre} </h3>
                            {
                                item.id === myRest
                                    ? null
                                    : (<button onClick={() =>{ setMyRest(item.id)} }>Seleccionar</button>)
                            }
                            
                        </div>
                    ))
                }

            </div>
    )

    const Listado = (
        <table>
        <thead>
            
            <th width="50%">Nombre</th>                                
            <th width="20%">Status</th>                
            <th width="20%"> acciones </th>
        </thead>     
        <tbody>
        {
                mesas
                .filter( p => p.restaurant === myRest)
                .map (item => (
                    <tr key={item.id}>                            
                        <td>{item.nombre}</td>
                        <td>{item.status }</td>                            
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
                    <label>Nombre</label>
                    <input 
                        type="text"
                        placeholder='Capture el nombre de la mesa'
                        name="nombre"
                        onChange= { e => setNombre(e.target.value) }                            
                        value= { nombre }
                        />
                </div>               


                <div className='form-input'>
                    <label>Status</label>
                    <select 
                            name="status"
                            value={status}
                            onChange={ e=> setStatus (e.target.value) } >
                            <option value="En Servicio">En servicio</option>                                
                            <option value="Fuera de Servicio">Fuera de servicio</option>      
                        </select>
                </div>   



                <div className="form-buttons">
                    <button type="button" onClick={guardar}>Guardar</button>                        
                </div>

            </form>
            
        </Modal>
    )









    return (
        <div>
            <Header />

            


            
            {SeleccionaRestaurant}

            {Listado}
           

            <button type="button" onClick={ () => { setShowModal(true); setMode('new') }}>
                + Agregar 
            </button>

           {Formulario}



        </div>
    )
}

export default Mesas
        