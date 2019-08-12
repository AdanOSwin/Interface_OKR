import React, {Component} from 'react';
//import firebase from './firebase/firebase';
import 'firebase/firestore';
import {db} from './firebase';
import firestore from 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import {refRc} from './firebase/db';
require('firebase/firestore');


//const datos = firebase.database();
//var uuid = require('uuid');
//const ruta = firebase.firestore().collection('kpi/');

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
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


class Altakpi extends Component{
    constructor(props){
        super(props);

        this.state={
            INITIAL_STATE
        };


        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        refRc.on('value', (snapshot) => {
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
            console.log("Resultado Clave en KPI");
            console.log(newState);
        });
    }


    onSubmit = (event) => {
        event.preventDefault();
        console.log("Datos KPI");
        console.log(this.state);

        const {
      //      uuid,
            nombre,
            descripcion,
            valInicial,
            valActual,
            valTarget,
            rc,
        } = this.state;

        console.log("Setea el estado");
    
        db.doCreateKpi(nombre, descripcion, valInicial, valActual, valTarget, rc)
        .then(() => {
            this.setState({...INITIAL_STATE});
            console.log("Se ha creado el KPI");
        })
        .catch(error => {
            this.setState(byPropKey('error', error))
        });

        
        //event.preventDefault();
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

        //const isInvalid =
        //nombre === '' || descripcion=== '' || valInicial === '' || valActual === '' || valTarget === '' || rc === '';
 
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <h2>Creacion de KPI</h2>
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
                        <label>Valor Inicial</label>
                        <input type="number"  
                        value={valInicial} onChange={event => this.setState(byPropKey('valInicial', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Valor Actual</label>
                        <input type="number" 
                        value={valActual} onChange={event => this.setState(byPropKey('valActual', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Valor Objetivo</label>
                        <input type="number" 
                        value={valTarget} onChange={event => this.setState(byPropKey('valTarget', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Resultado Clave</label>
                        <select value={rc} onChange={event => this.setState(byPropKey('rc', event.target.value))}>
                            <option value="ninguno">Ninguno</option>
                            {this.state.items && this.state.items.map((item) => {return(<option>{item.nombre}</option>);})}
                        </select>
                    </div>
                    <input type="submit" className="feedback-button" value="submit" />
                </form>
            </div>
        );
    }
}

export default Altakpi;