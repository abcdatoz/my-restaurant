import React, {useState,  useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCategorias,addCategoria,editCategoria,deleteCategoria } from '../actions/CategoriaAction'
import { getProductos } from '../actions/ProductoAction'

import Header from '../components/layouts/Header'

import Modal from './common/Modal'



const Categorias = () => {

    //useStates
    const [myRest, setMyRest] = useState('')
    const [showModal, setShowModal] = useState(false)

    const [mode, setMode] = useState('new')
    const [idx, setIdx] = useState('')
    const [clave, setClave] = useState('')
    const [nombre, setNombre] = useState('')

    //use Selectors
    const restaurantes = useSelector(state => state.restaurantes.lista)
    const categorias = useSelector(state => state.categorias.lista)
    const productos = useSelector(state => state.productos.lista)
    const theOwner =  useSelector(state => state.auth.owner)
    // const meseros = useSelector(state => state.meseros.lista)


    
    const dispatch = useDispatch()

    //useEffect
    useEffect(() => {       

        dispatch(getProductos())

        if (restaurantes.length > 0){
            setMyRest(restaurantes[0].id)
        }
        
    }, [])




    const editar = (item) => {
        setShowModal(true)

        
        setIdx(item.id)
        setClave(item.clave)
        setNombre(item.nombre)
        
        setMode('edit')
    }


    const eliminar = (item) => {
        let lista = productos.filter(x => x.categoria === item.id)

        if (lista.length > 0){
            alert('No se puede eliminar esta categoria porque tiene productos relacionados')
            return
        }

        
        dispatch(deleteCategoria(item.id))   
    }
    
    const guardar = (e) => {
        e.preventDefault()

        
        if (clave == '' || nombre == '' ) {
            alert('No ha capturado todos los campos')
            return
        }


          
        //validations
        let arr = categorias.filter(x =>  x.id !== idx && x.restaurant === myRest &&  x.clave.toUpperCase() == clave.toUpperCase()) 

        if (arr.length > 0){
            alert('Ya existe una categoria registrada con esa clave en este restaurant')
            return
        }


        arr = categorias.filter(x =>  x.id !== idx && x.restaurant === myRest &&  x.nombre.toUpperCase() == nombre.toUpperCase()) 
        console.log(arr)
        if (arr.length > 0){
            alert('Ya existe una categoria registrada con ese nombre en esta restaurant')
            return
        }

        ///endvalidations

        let data = {
            restaurant : myRest,
            clave,
            nombre    
        }

        if (mode == 'new') dispatch(addCategoria(data))       
        if (mode == 'edit') dispatch(editCategoria(data, idx))       
                   

        setClave('')
        setNombre('')
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
            
            <th width="20%">clave</th>                
            <th width="50%">Nombre</th>                                
            <th width="20%"> acciones </th>
        </thead>     
        <tbody>
        {
                categorias
                .filter( p => p.restaurant == myRest)
                .map (item => (
                    <tr key={item.id}>                            
                        <td>{item.clave}</td>
                        <td>{item.nombre }</td>                            
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
                        placeholder='Capture la clave de la categoria'
                        name="clave"
                        onChange= { e => setClave(e.target.value) }                            
                        value= { clave }
                        />
                </div>


                <div className='form-input'>
                    <label>Nombre</label>
                    <input 
                        type="text"
                        placeholder='Capture el nombre de la categoria'
                        name="nombre"
                        onChange= { e => setNombre(e.target.value) }                            
                        value= { nombre }
                        />
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

export default Categorias
