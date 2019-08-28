import React, {Component} from 'react';
import {db} from './firebase';
//import firebase from './firebase';
import firebase from 'firebase/app';
import 'firebase/database';
import {refOkr, refRc} from './firebase/db';
import './ConsultaOkr.css';
import {ProgressBar} from 'react-bootstrap';
//import ProgressBar from '@bit/react-bootstrap.react-bootstrap.progress-bar';

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

class ConsultaGlobal extends Component{
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

        refRc.on('value', (snapshot) => {
            const datos = snapshot.val();
            const newState = [];
            for(const dato in datos){
                newState.push({
                   id: dato,
                   nombre: datos[dato].nombre,
                   inicial: datos[dato].inicial,
                   actual: datos[dato].actual,
                   esperado: datos[dato].esperado,
                   target: datos[dato].target,
                   inicio: datos[dato].inicio,
                   termino: datos[dato].termino,
                   okr: datos[dato].okr 
                });
            }
            this.setState({
                datos:newState
            });
            console.log("Resultados clave");
            console.log(datos);
        });
    }


    render(){
        return(
            <div>
                <section>
                    <div className="wrapper">
                        <table>
                            <tr>
                                <th className="nombre">Nombre</th>
                                <th className="equipo">Equipo</th>
                                <th className="prioridad">prioridad</th>
                                <th className="progreso">Progreso</th>
                                <th className="Elimina"></th>
                                <th className="Edita"></th>
                                </tr>
                            {this.state.items && this.state.items.map((item) => {
                                return(
                                        <tr>
                                            <td className="nombre">{item.nombre}</td>
                                            <td className="equipo">{item.equipo}</td>
                                            <td className="prioridad">{item.prioridad}</td>
                                            <td className="progreso"><ProgressBar now={30} /></td>
                                            <td className="Elimina"><button onClick={() => this.removeOkr(item.id)}>Eliminar</button></td>
                                            <td className="Edita"><button>Editar</button></td>
                                        </tr>
                                );
                            })}
                        </table>
                    </div>
                </section>
                {this.state.datos && this.state.datos.map((dato) => {
                    return(
                        <div>
                            <label>{dato.nombre}</label><br />
                            <label>{dato.inicial}</label><br />
                            <label><ProgressBar now={50} /></label><br />
                            <label>{dato.esperado}</label><br />
                            <label>{dato.target}</label><br /><br />
                            <label>{dato.inicio}</label><br />
                            <label>{dato.termino}</label><br />
                            <label>{dato.okr}</label><br />
                        </div>
                    );
                })};

                <h3>Separador</h3>

                {this.state.items && this.state.items.map && this.state.datos && this.state.datos.map((item, dato) =>{
                    return(<div>
                        <div>
                        <h2>OKR</h2>
                        <label>{item.nombre}</label>
                        <br />
                        </div>
                        <h2>RC</h2>
                        <label>{dato.nombre}</label><br />
                        </div>);
                })}
            </div>
        );
    }
}

export default ConsultaGlobal;