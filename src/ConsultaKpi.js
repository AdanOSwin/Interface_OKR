import React, {Component} from 'react';
import {db} from './firebase';
//import firebase from './firebase';
import { refKpi} from './firebase/db';
import firebase from 'firebase/app';
import 'firebase/database';

//const itemKpi = firebase.database().ref(`kpi/${uuid}`);

const INITIAL_STATE = {
    //uuid: uuid.v1(),
    nombre: '',
    descripcion: '',
    valInicial: '',
    valActual: '',
    valTarget: '',
    rc: '',
    error: null,
    items: []
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName] : value
});

class ConsultaKpi extends Component{
    constructor(props){
        super(props);

        this.state={
            INITIAL_STATE
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    removeKpi(uuid){
        const itemKpi = firebase.database().ref(`kpi/${uuid}`);
        itemKpi.remove();
    }

    componentDidMount(){
        refKpi.on('value', (snapshot) => {
            const items = snapshot.val();
            const newState = [];
            for(const item in items){
                newState.push({
                    id:item,
                    nombre: items[item].nombre,
                    descripcion: items[item].descripcion,
                    valInicial: items[item].valInicial,
                    valActual: items[item].valActual,
                    valTarget: items[item].valTarget,
                    rc: items[item].rc
                });
            }
            this.setState({
                items: newState
            });
            console.log("consulta de KPI");
            console.log(newState);
        });
    }

    render(){

        return(
            <div>
                <section>
                    <h3>Cnosulta KPI</h3>
                    <div className="wrapper">
                        <table>
                            <tr>
                                <th>Nombre</th>
                                <th>Valor inicial</th>
                                <th>Valor actual</th>
                                <th>Valor objetivo</th>
                                <th></th>
                                <th></th>
                            </tr>
                            {this.state.items && this.state.items.map((item) => {
                                return(
                                    <tr>
                                        <td>{item.nombre}</td>
                                        <td>{item.valInicial}</td>
                                        <td>{item.valActual}</td>
                                        <td>{item.valTarget}</td>
                                        <td><button onClick={() => this.removeKpi(item.id)}>Eliminar</button></td>
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

export default ConsultaKpi;