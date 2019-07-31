import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { refKpi } from './firebase/db';

const INITIAL_STATE = {
    nombre: '',
    descripcion: '',
    valInicial: '',
    valActual: '',
    valTarget: '',
    rc: '',
    items: []
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class editaKpi extends Component{
    constructor(props){
        super(props);

        this.state = {
            INITIAL_STATE
        };

        this.componentDidMount = this.componentDidMount.bind(this);
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
            console.log("Edicion de KPI");
            console.log(newState);
        });

        refRc.on('value', (snapshot) => {
            const items2 = snapshot.val();
            const newState = [];
            for(const item2 in items2){
                newState.push({
                   id: item2, 
                   nombre: items2[item2].nombre,
                });
            }
            this.setState({
                items2:newState
            });
            console.log("Resultado Clave en KPI");
            console.log(newState);
        });
    }

    render(){

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
                                value={nombre} onChange={event => this.setState(byPropKey('nombre', event.target.value))}
                                />
                            </div>
                            <div>
                                <label>Descripcion</label>
                                <input type="text" 
                                value={descripcion} onChange={event => this.setState(byPropKey('descripcion', event.target.value))}
                                />
                            </div>
                            <div>
                                <label>Valor inicial</label>
                                <input type="text" 
                                value={valInicial} onChange={event => this.setState(byPropKey('valInicial', event.target.value))}
                                />
                            </div>
                            <div>
                                <label>Valor actual</label>
                                <input type="text" 
                                value={valActual} onChange={event => this.setState(byPropKey('valActual', event.target.value))}
                                />
                            </div>
                            <div>
                                <label>Valor target</label>
                                <input type="text" 
                                value={valTarget} onChange={event => this.setState(byPropKey('valTarget', event.target.value))}
                                />
                            </div>
                            <div>
                                <label>Resultado Clave</label>
                                <select value={rc} onChange={event => this.setState(byPropKey('rc', event.target.value))}>
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
}



export default editaKpi;