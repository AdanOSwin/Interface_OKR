import React, {Component} from 'react';
import {db} from './firebase';
import {refOkr} from './firebase/db';
import firebase from './firebase';
import 'firebase/database';
import {Button} from 'reactstrap';

const INITIAL_STATE = {
    nombre: '',
    descripcion: '',
    equipo: '',
    prioridad: '',
    tipo: '',
    progreso: '',
    padre: '',
    error: null,
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class AltaOkr extends Component{
    constructor(props){
        super(props);

        this.state={
            INITIAL_STATE
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        refOkr.on('value', (snapshot) => {
            const items = snapshot.val();
            const newState = [];
            for(const item in items){
                newState.push({
                   id: item, 
                   nombre: items[item].nombre,
                });
            }
            this.setState({
                items:newState
            });
            console.log("OKR en OKR");
            console.log(newState);
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log("DATOS OKR");
        console.log(this.state);

        const{
            nombre,
            descripcion,
            equipo,
            prioridad,
            tipo,
            progreso,
            padre
        } = this.state;

        db.doCreateOkr(nombre, descripcion, equipo, prioridad, tipo, progreso, padre)
        .then(() => {
            this.setState({...INITIAL_STATE});
            console.log("Se ha creado el OKR");
        })
        .catch(error => {
            this.setState(byPropKey('error', error))
        });
    }

    render(){

        const{
            nombre, 
            descripcion,
            equipo,
            prioridad,
            tipo,
            progreso,
            padre
        } = this.state;

        return(
            <div>
                <h2>Creacion de Objetivo</h2>
                <form className="formulario" onSubmit={this.onSubmit}>
                    <div>
                        <label>Nombre</label>
                        <input type="text" 
                        value={nombre} onChange={event=> this.setState(byPropKey('nombre', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Descripcion</label>
                        <input type="text" 
                        value={descripcion}  onChange={event => this.setState(byPropKey('descripcion', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Equipo</label>
                        <input type="text" 
                        value={equipo} onChange={event => this.setState(byPropKey('equipo', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Prioridad</label>
                        <select value={prioridad} onChange={event => this.setState(byPropKey('prioridad', event.target.value ))}>
                            <option value="baja">Baja</option>
                            <option value="media">Media</option>
                            <option value="alta">Alta</option>
                            <option value="critica">Critica</option>
                        </select>
                    </div>
                    <div>
                        <label>
                            Tipo
                        </label>
                        <select value={tipo} onChange={event => this.setState(byPropKey('tipo', event.target.value))}>
                            <option value="global">Global</option>
                            <option value="secundario">Secundario</option>
                        </select>
                    </div>
                    <div>
                        <label>Progreso</label>
                        <input type="text" 
                        value={progreso} onChange={event => this.setState(byPropKey('progreso', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>OKR global</label>
                        <select value={padre} onChange={event => this.setState(byPropKey('padre', event.target.value))}>
                            <option value="ninguno">Ninguno</option>
                            {this.state.items && this.state.items.map((item) => {return(<option value={item.nombre}>{item.nombre}</option>);})}
                        </select>
                    </div>
                    <button type="submit" color="dark" value="Crear">
                        Crear
                    </button>
                </form>
            </div>
        );
    }
}

export default AltaOkr;