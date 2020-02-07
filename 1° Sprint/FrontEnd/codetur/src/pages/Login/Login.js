import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            senha: "",
            erro: "",
        }
    }

    _emailUsuario = (event) => {
        this.setState({ email: event.target.value })
        
    }

    _senhaUsuario = (event) => {
        this.setState({ senha: event.target.value })
        
    }

    _fazerLogin = (event) => {
        event.preventDefault()

        Axios.post('http://192.168.5.158:5000/api/usuarios/login', {
            email: this.state.email,
            senha: this.state.senha
        })

            .then(data => {
                if (data.status === 200) {
                    localStorage.setItem('codtur-chave-autenticacao', data.data.token);
                    this.props.history.push('/administrador')
                    console.log('FUCK')
                } else {
                    console.log('Algo deu errado')
                }
            })
            .catch(erro => {
                this.setState({ erro: 'Email ou senha ivalido.' })
                console.log(erro)
            })
    }

    render() {
        return (
            <div className='pagLogin'>
                <div>
                    <h1>Login</h1>
                    <div className='formLogin'>
                        <form>

                            <div className='item'>
                                <input className='input'
                                    placeholder='Email'
                                    type='text'
                                    onChange={this._emailUsuario}
                                    value={this.state.email}
                                />
                            </div>

                            <div className='item'>
                                <input className='input'
                                    placeholder='Senha'
                                    type='password'
                                    onChange={this._senhaUsuario}
                                    value={this.state.senha}
                                />
                            </div>
                        </form>

                    </div>

                    <div className='buttonLogin'>
                        <button onClick={this._fazerLogin} className='button'>Login</button>
                    </div>

                </div>
            </div>
        )
    }
}