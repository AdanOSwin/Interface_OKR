import React, {Component} from 'react';
import {db} from './firebase';
//import firebase from './firebase';
import { refKpi} from './firebase/db';
import editaKpi from './EditaKpi';
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

    editaKpi(uuid, name, description, inicial, actual, target, resclave){
//        <EditaKpi/>
        console.log("Edita KPI")
        console.log("id: " + uuid + " " + "Nombre: " +  name + " " + "Descripcion: " + description + " " + " Inicial: " +  inicial + " " + "Actual: " + actual + " " + "Objetivo: " + target + " " + " " + "Resultado Clave: " + resclave);
        const{
            nombre, 
            descripcion,
            valInicial,
            valActual,
            valTarget,
            rc
        } = this.state;

        return(
        <div>
        {this.state.items && this.state.items.map((item) => {
            return(
                <form onSubmit={this.onEdit}>
                    <h2>Edicion de KPI</h2>
                    <div>
                        <label>Nombre</label>
                        <input type="text"
                        value={nombre} placeholder="${name}" onChange={event => this.setState(byPropKey('nombre', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Descripcion</label>
                        <input type="text" 
                        value={descripcion} placeholder={description} onChange={event => this.setState(byPropKey('descripcion', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Valor inicial</label>
                        <input type="text" 
                        value={valInicial} placeholder={inicial} onChange={event => this.setState(byPropKey('valInicial', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Valor actual</label>
                        <input type="text" 
                        value={valActual} placeholder={actual} onChange={event => this.setState(byPropKey('valActual', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Valor target</label>
                        <input type="text" 
                        value={valTarget} placeholder={target} onChange={event => this.setState(byPropKey('valTarget', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Resultado Clave</label>
                        <select value={rc} placeholder={resclave} onChange={event => this.setState(byPropKey('rc', event.target.value))}>
                            <option>Ninguno</option>
                            {this.state.items && this.state.items.map((item) => {return(<option>{item.nombre}</option>);})}
                        </select>
                    </div>
                    <input type="submit" className="feedback-button" value="Editar" />
                </form>
                
                );
            })}
            </div>
            );
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
                                        <td><button onClick={() => this.editaKpi(item.id, item.nombre, item.descripcion, item.valInicial, item.valActual, item.valTarget, item.rc)}>Editar</button></td>
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