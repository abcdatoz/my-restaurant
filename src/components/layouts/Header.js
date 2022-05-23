import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'


class Header extends Component {
    render () {
        const {isAuthenticated, username } = this.props.auth

        const authLinks = (
            <div className='mainnav'>
                <div className='card'>
                    <div className='card-details'>
                        <p className='text-title-card'>Restaurantes</p>
                    </div>
                    <li><Link className='card-button'  to="/Restaurantes">Ingresar</Link></li>                
                </div>
                <br></br>
                <div className='card'>
                    <div className='card-details'>
                        <p className='text-title-card'>Categorias</p>
                    </div>
                    <li><Link className='card-button'  to="/Categorias">Ingresar</Link></li>
                </div>

                <div className='card'>
                    <div className='card-details'>
                        <p className='text-title-card'>Productos</p>
                    </div>
                    <li><Link className='card-button' to="/Productos">Ingresar</Link></li>                
                </div>

                <div className='card'>
                    <div className='card-details'>
                        <p className='text-title-card'>Mesas</p>
                    </div>
                    <li><Link className='card-button' to="/Mesas">Ingresar</Link></li>
                </div>

                <div className='card'>
                    <div className='card-details'>
                        <p className='text-title-card'>Meseros</p>
                    </div>
                    <li><Link className='card-button' to="/Meseros">Ingresar</Link></li>               
                </div>
            </div>           
        )
        


        const guestLinks = (
            <ul>                 
                <li><Link  to="/login">Login</Link></li>                
                {/* <li><Link  to="/register">Register</Link></li> */}
                {/* <li><Link  to="/laCarta">La Carta</Link></li> */}
            </ul>            
        )
        return (
            <nav>
                {isAuthenticated 
                    ? authLinks
                    : guestLinks
                }
            </nav>  
        )
    }
}
const mapState = state => ({ auth: state.auth })

export default connect(mapState, {logout}) (Header)