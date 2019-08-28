import React, {Component} from 'react';
import {db} from './firebase';
import {refArea, refUsers} from './firebase/db';
import * as routes from './constants/routes';

const INITIAL_STATE = {
    nombre: '',
    descrpcion: '',
    area: '',
    encargado: '',
    error: null,
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


class AltaEquipo extends Component{
    constructor(props){
        super(props);

        this.state ={
            ...INITIAL_STATE
        };
    }

    componentDidMount(){
        refArea.on('value', (snapshot) => {
            const areas = snapshot.val();
            const newState = [];
            for(const area in areas){
                newState.push({
                    id:area,
                    nombre: areas[area].nombre
                });
            }
            this.setState({
                areas: newState
            });
            console.log("Area en Alta de Equipo");
            console.log(newState);
        });

        refUsers.on('value', (snapshot) =>{
            const users = snapshot.val();
            const newState = [];
            for(const user in users){
                newState.push({
                    id: user,
                    nombre: users[user].nombre,
                });
            }
            this.setState({
                users: newState
            });
            console.log("Usuarios en la creacion de equipo");
            console.log(newState);
        });
    }

    onSbmit(event){
        console.log("Datos de Equipo");
        console.log(this.state);
        event.preventDefault();

        const{
            nombre,
            descripcion,
            area,
            jefe
        } = this.state;

        const {
            history,
        } = this.props

        db.doCreateEquipo(nombre, descripcion, area, jefe)
        .then(() => {
            this.setState({...INITIAL_STATE});
            console.log("Se ha creado el equipo");
            history.push(routes.EQUIPOS);
        })
        .catch((error) => {
            this.setState(byPropKey('error', error));
        })

    }

    render(){
        const{
            nombre,
            descripcion,
            area,
            jefe
        } = this.state;
        const isInvalid = nombre === '' ||
        descripcion === '' ||
        area === '' ||
        jefe === '';

        return(
          <div>
            <form onSubmit={this.onSbmit}>
            <div>
                <label>Nombre</label>
                <input type="text" 
                value={nombre} onChange={event => this.setState(byPropKey('nombre', event.target.value))}
                />
            </div>
            <div>
            <label>Descrpcion</label>
            <input type="text" 
            value={descripcion} onChange={event => this.setState(byPropKey('descripcion', event.target.value))}
            />
            </div>
            <div>
                <label>Area</label>
                <select value={area} onChange={event => this.setState(byPropKey('area', event.target.value))}>
                    <option value="ninguna">Ninguna</option>
                    {this.state.areas && this.state.areas.map((area) => {return(
                        <option value={area.nombre}>{area.nombre}</option>
                    );})}
                </select>
            </div>
            <div>
                <label>Responsable</label>
                <select value={jefe} onChange={event => this.setState(byPropKey('jefe', event.target.value))}>
                    <option value="ninguno">Ninguno</option>
                    {this.state.users && this.state.users.map((user) => {
                        return(
                            <option value={user.nombre}>{user.nombre}</option>
                        );
                    })}
                </select>
            </div>
            <button value="crear" disabled={isInvalid} type="submit">Crear equipo</button>
            </form>
          </div>
        );
    }
}

export default AltaEquipo;