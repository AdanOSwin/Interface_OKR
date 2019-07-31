import React, {Component} from 'react';
import './Toggle.css';
import firebase from 'firebase/app';
import {refOkr } from './firebase/db';
import 'firebase/database';

const INITIAL_STATE = {
    nombre: '',
    descripcion: '',
    equipo: '',
    prioridad: '',
    tipo: '',
    progreso: '',
    padre: '',
    error: null,
    items: [],
    on: false,
}

class Toggle extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            INITIAL_STATE
        };

        //this.componentDidMount = this.componentDidMount.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    /*removeOkr(uuid){
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
*/
    toggle = () => {
        this.setState({
            on: !this.state.on
        });
    }


    render(){
        return(
            <div>
            <button onClick={this.toggle}>Desplegar</button>
                {this.state.on && this.props.children
                }
            </div>

        );
    }
}

export default Toggle;