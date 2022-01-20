import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRestaurants } from '../actions/RestaurantActions'


const Home = () => {

    

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
            
            
            
            <h3>Restaurantes </h3>
            { restaurantes.map (x => (
                <div key= {x.id}> 
                    <img  src={x.logo} width="100" height="100"/>
                    <h3>{x.nombre} </h3>
                    {x.direccion}
                 </div>
            ))}
        </div>
    )
}

export default Home