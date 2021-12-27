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
        
        
        console.log('a')
        login(username, password)
        console.log('b')
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    render() {
        if (this.props.isAuthenticated){
            return <Navigate to='/' />
        }


        const {username, password} = this.state

        return(
            <>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>username</label>
                        <input 
                            type = "text"
                            className = "form-control"
                            name = "username"
                            onChange = {this.onChange}
                            value = {username}
                         />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type = "password"
                            className = "form-control"
                            name = "password"
                            onChange = {this.onChange}
                            value = {password}
                         />
                    </div>

                    <div className="form-group">
                            <button type="submit">
                                Login
                            </button>
                        </div>

                        <p> ¿No tienes cuenta?<Link to="/register">Registrate...</Link> </p>
                </form>

            </>
        )

    }

}


const mapState = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapState, {login}) (Login)