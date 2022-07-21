import React, { Component } from 'react'
import {Link, Navigate} from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'



export class Login extends Component {

    state = {
        username:'',
        password:''
    }


    onSubmit = e => {
        e.preventDefault()
        
        const {username, password} = this.state
        const {login } = this.props
        
        
        
        login(username, password)
        
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    render() {
        if (this.props.isAuthenticated){
            return <Navigate to='/Administracion' />
        }


        const {username, password} = this.state

        return(
            <>
            <div className='modal_menu'>
                <div className='modal__container'>
                    <div className='modal__featured'>
                        <div className='modal__content'>
                            <h2>Login</h2>
                            <form onSubmit={this.onSubmit}>

                                <div className="form-list">
                                    <label>Usuario</label>
                                    <input 
                                        type = "text"                                        
                                        name = "username"
                                        onChange = {this.onChange}
                                        value = {username}
                                    />
                                </div>

                                <div className="form-list">
                                    <label>Contraseña</label>
                                    <input 
                                        type = "password"                                        
                                        name = "password"
                                        onChange = {this.onChange}
                                        value = {password}
                                    />
                                </div>
                                <br></br>

                                <div>
                                        <button type="submit" className='button'>
                                            Entrar
                                        </button>
                                </div>

                            <p><Link to="/">home</Link> </p>
                        </form>

                        </div>
                    </div>
                </div>
            </div>

                
            </>
        )

    }

}


const mapState = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapState, {login}) (Login)