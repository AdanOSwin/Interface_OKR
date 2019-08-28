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