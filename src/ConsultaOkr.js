import React, {Component} from 'react';
import {db} from './firebase';
//import firebase from './firebase';
import firebase from 'firebase/app';
import 'firebase/database';
import {refOkr} from './firebase/db';
import './ConsultaOkr.css';

const INITIAL_STATE = {
    nombre: '',
    descripcion: '',
    equipo: '',
    prioridad: '',
    tipo: '',
    progreso: '',
    padre: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class ConsultaOkr extends Component{
    constructor(props){
        super(props);

        this.state = {
            INITIAL_STATE
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.removeOkr = this.removeOkr.bind(this);
    }

    removeOkr(uuid){
        console.log("Madison");
        const itemOkr = firebase.database().ref(`okr/${uuid}`);
        console.log("Davenport");
        itemOkr.remove();
    }

    componentDidMount(){
        refOkr.on('value', (snapshot) => {
            const items = snapshot.val();
            const newState = [];
            for(const item in items){
                newState.push({
                   id: item, 
                   nombre: items[item].nombre,
                   descripcion: items[item].descripcion,
                   equipo: items[item].equipo,
                   prioridad: items[item].prioridad,
                   tipo: items[item].tipo,
                   progreso: items[item].progreso,
                   padre: items[item].padre 
                });
            }
            this.setState({
                items:newState
            });
            console.log("OKR");
            console.log(newState);
        });
    }


    render(){
        return(
            <div>
                <section>
                    <h2>
                        Consulta OKR
                    </h2>
                    <div className="wrapper">
                        <table>
                            
                        <tr>
                                            <th>Nombre</th>
                                            <th>Equipo</th>
                                            <th>prioridad</th>
                                            <th>Progreso</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                            {this.state.items && this.state.items.map((item) => {
                                return(
                                        <tr>
                                            <td>{item.nombre}</td>
                                            <td>{item.equipo}</td>
                                            <td>{item.prioridad}</td>
                                            <td>{item.progreso}</td>
                                            <td><button onClick={() => this.removeOkr(item.id)}>Eliminar</button></td>
                                            <td><button>Editar</button></td>
                                        </tr>
                                );
                            })}
                        </table>
                    </div>
                </section>
            </div>
        );
    }
}

export default ConsultaOkr;