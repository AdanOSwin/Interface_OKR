import React, {Component} from 'react';
import {db} from './firebase';
import * as routes from './constants/routes';


const INITIAL_STATE = {
    nombre: '',
    descripcion: '',
    jefe: ''

};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
});

class AltaArea extends Component{
    constructor(props){
        super(props);

        this.state = {
            INITIAL_STATE,
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log("Datos de Area");
        console.log(this.state);

        const{
            nombre,
            descripcion,
            jefe
        } = this.state;

        const {
            history,
        } = this.props;

        db.doCreateArea(nombre, descripcion, jefe)
        .then(() => {
            this.setState({...INITIAL_STATE});
            console.log("Se ha creado el KPI");
            history.push(routes.AREAS);
        })
        .catch(error => {
            this.setState(byPropKey('error', error))
        });
    }


    render(){
        const{
            nombre,
            descripcion,
            jefe
        } = this.state;

        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Nombre</label>
                        <input type="text"
                        value={nombre} onChange={event => this.setState(byPropKey('nombre', event.target.value))}     
                        />
                    </div>
                    <div>
                        <label>Descripcion</label>
                        <input type="textarea" 
                        value={descripcion} onChange={event => this.setState(byPropKey('descripcion', event.target.value))} />
                    </div>
                    <div>
                        <label>Encargado</label>
                        <select value={jefe} onChange={event => this.setState(byPropKey('jefe', event.target.value))}>
                            <option value="1">Clara</option>
                            <option value="2">Amy</option>
                        </select>
                    </div>
                    <button value="submit" type="submit">Crear</button>
                </form>
            </div>
        );
    }
}

export default AltaArea;