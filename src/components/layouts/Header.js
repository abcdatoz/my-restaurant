import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'


class Header extends Component {
    render () {
        const {isAuthenticated, username } = this.props.auth

        const authLinks = (
            <ul className="mainnav">
                <li><Link  to="/Restaurantes">Restaurantes</Link></li>
                <li><Link  to="/Categorias">Categorias</Link></li>
                <li><Link  to="/Productos">Productos</Link></li>                
                <li><Link  to="/Mesas">Mesas</Link></li>
                <li><Link  to="/Meseros">Meseros</Link></li>                

                <li><span><strong>{username ? `Usuario:  ${username}` : ""}</strong></span></li>


                <li>                   
                                                           
                    <a href="/#" onClick={this.props.logout }>Salir </a>                    
                </li>   
            </ul>
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