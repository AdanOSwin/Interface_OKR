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
        
    render(){
        return (<div></div>);
        
    }
}



export default editaKpi;