import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRestaurants } from '../actions/RestaurantActions'
import Header from '../components/layouts/Header'

const Meseros = () => {

    //use Selectors
    const restaurantes = useSelector(state => state.restaurantes.lista)

    //useDispatch
    const dispatch = useDispatch()

    //useEffect
    useEffect(() => {
        dispatch(getRestaurants())
        
    }, [])

    return (    
        <div>
            <Header />
            <h3>Mis Restaurantes </h3>

            { restaurantes.map (x => (
                <div key= {x.id}>                     
                    <h3>{x.nombre} ({x.direccion}) </h3>                    
                 </div>
            ))}
        </div>
    )
}

export default Meseros