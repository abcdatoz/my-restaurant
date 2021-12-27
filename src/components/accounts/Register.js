import React, { Component} from 'react'
import { Link, Navigate } from 'react-router-dom'
import  { connect } from 'react-redux'
import { register } from '../../actions/auth'


export class Register extends Component {
    state = {
        username:'',
        email: '',
        password: '',
        password2:'',

    }


    onSubmit = e => {
        e.preventDefault()

        const { username, email, password, password2} = this.state

        if  (password !== password2){
            console.log('el password no coinciden')
        }else{
            const newuser = {username, email, password  }
            this.props.register(newuser)
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render (){

        if (this.props.isAuthenticated){
            return <Navigate to='/' />
        }


        const { username, email, password, password2} = this.state 

        return(
            <>

                <h2>Register</h2>
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
                        <label>email</label>
                        <input 
                            type = "email"
                            className = "form-control"
                            name = "email"
                            onChange = {this.onChange}
                            value = {email}
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
                        <label>Confirm Password</label>
                        <input 
                            type = "password"
                            className = "form-control"
                            name = "password2"
                            onChange = {this.onChange}
                            value = {password2}
                         />
                    </div>

                    <div className="form-group">
                        <button type="submit" >
                            Register
                        </button>
                    </div>
                    <p>
                        ¿Ya tienes una cuenta?<Link to="/login">Entrar</Link>
                    </p>
                </form>

            </>
        )
    }
}


const mapState = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapState, {register})(Register)