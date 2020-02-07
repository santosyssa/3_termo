import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';

export default class Administrador extends Component {

    constructor() {
        super();
        this.state = {
            lista: [],

            titulo: '',
            imagem: '',
            descricao: '',
            dataInicio: '',
            dataFim: '',
            pais: '',
            status: false,
            oferta: false
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

    _cadastrarPacote = () => {
        Axios.post('http://192.168.5.158:5000/api/pacotes', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                titulo: this.state.titulo,
                imagem: this.state.imagem,
                descricao: this.state.descricao,
                dataInicio: this.state.dataInicio,
                dataFim: this.state.dataFim,
                pais: this.state.pais,
                status: this.state.status,
                oferta: this.state.oferta
            })
        })
            .then(response => response.json)
            .catch(erro => console.log(erro))
    }

    _tituloPacote = (event) => {
        this.setState({ titulo: event.target.value });
    }

    _imagemPacote = (event) => {
        this.setState({ imagem: event.imagem.value });
    }

    _descricaoPacote = (event) => {
        this.setState({ descricao: event.descricao.value });
    }

    _dataIncioPacote = (event) => {
        this.setState({ dataInicio: event.dataInicio.value });
    }

    _dataFimPacote = (event) => {
        this.setState({ dataFim: event.dataFim.value });
    }

    _paisPacote = (event) => {
        this.setState({ pais: event.pais.value });
    }

    _statusPacote = (event) => {
        this.setState({ status: event.status.value });
    }

    _ofertaPacote = (event) => {
        this.setState({ oferta: event.oferta.value });
    }

    componentDidMount() {
        this._listarPacotes();
        this._cadastrarPacote();
    }

    render() {
        return (
            <div className='pagAdm'>
                <button>
                    <Link to='/' onClick={this.deslogar}>Sair</Link>
                </button>

                <h1>Administrador</h1>

                <table className='tabela' >
                    <thead>
                        <tr>
                            <th>Id</th>
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
                                    <td>{element.id}</td>
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

                <div>
                    <h2>Cadastrar Pacote</h2>

                    <form>
                        <input className="input" placeholder= "Titulo" type="text" onChange={this._tituloPacote} value={this.state.titulo} />
                        <input className="input" placeholder= "Imagem" type="text" onChange={this._imagemPacote} value={this.state.imagem} />
                        <input className="input" placeholder= "Descrição" type="text" onChange={this._descricaoPacote} value={this.state.descricao} />
                        <input className="input" placeholder= "Data Inicio" type="date" onChange={this._dataIncioPacote} value={this.state.dataInicio} />
                        <input className="input" placeholder= "Data FIm" type="date" onChange={this._dataFimPacote} value={this.state.dataFim} />
                        <input className="input" placeholder= "Pais" type="text" onChange={this._paisPacote} value={this.state.pais} />
                        <input className="input" placeholder= "Ativo" type="checkbox" onChange={this._statusPacote} value={this.state.status} />
                        <input className="input" placeholder= "Oferta" type="checkbox" onChange={this._ofertaPacote} value={this.state.oferta} />
                    
                        <button className='buttoCadastro' onClick={this._cadastrarPacote}>Cadastrar</button>
                    </form>

                </div>
            </div>
        )
    }
}
