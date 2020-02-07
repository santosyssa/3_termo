import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';

// import { Container } from './styles';

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            lista: [],
        }
    }

    _deslogar() {
        localStorage.removeItem('token')
    }

    _listarPacotes = () => {
        Axios.get('http://192.168.5.158:5000/api/pacotes', {
            headers: { 'Authorization': 'Bearer' + localStorage.getItem('codtur-chave-autenticacao') }
        })
            .then(response => {
                this.setState({ lista: response.data })
            })
            .catch(erro => console.log(erro))
    }

    componentDidMount() {
        this._listarPacotes();
    }

    render() {
        return (
            <div>

                <button>
                    <Link to='/' onClick={this.deslogar}>Sair</Link>
                </button>

                <table className='tabela' >
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Imagem</th>
                            <th>Descrição</th>
                            <th>Data Começo</th>
                            <th>Data Final</th>
                            <th>Pais</th>
                            <th>Status</th>
                            <th>Oferta</th>
                        </tr>
                    </thead>

                    <tbody className='lista'>
                        {this.state.lista.map(element => {
                            return (
                                <tr key={element.id}>
                                    <td>{element.titulo}</td>
                                    <td>{element.imagem}</td>
                                    <td>{element.descricao}</td>
                                    <td>{element.dataInicio}</td>
                                    <td>{element.dataFim}</td>
                                    <td>{element.pais}</td>
                                    <td>{element.status}</td>
                                    <td>{element.oferta}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
