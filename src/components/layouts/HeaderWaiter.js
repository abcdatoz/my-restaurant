import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/authWaiters'


class HeaderWaiter extends Component {
    render () {
        const {wAuthenticated, nameWaiter } = this.props.authWaiter

        const authLinks = (
            <ul className="mainnav">
                <li><span><strong>{nameWaiter ? `User:  ${nameWaiter}` : ""}</strong></span></li>
                <li>                                                                              
                    <a href="#" onClick={this.props.logout }>Salir </a>                    
                </li>   
            </ul>
        )

        return (
            <nav>
                { wAuthenticated 
                    ? authLinks
                    : null
                }
            </nav>  
        )
    }
}

const mapState = state => ({ auth: state.authWaiter })

export default connect(mapState, {logout}) (HeaderWaiter)