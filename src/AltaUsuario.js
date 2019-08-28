import React, {Component} from 'react';
import {db, auth} from './firebase';
import {refArea, refEquipo} from './firebase/db';
import * as routes from './constants/routes';

const INITIAL_STATE = {
    nombre: '',
    apellido: '',
    email: '',
    pass1: '',
    pass2: '',
    tel: '',
    equipo: '',
    area: '',
    error: null,
    areas: [],
    equipos: [],
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class AltaUsuario extends Component{
    constructor(props){
        super(props);

        this.state={
            ...INITIAL_STATE
        };

        this.onSubmit = this.onSubmit.bind(this);
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
                areas:newState
            });
            console.log("Areas Creadas");
            console.log(newState);
        });


        /*refEquipo.on('value', (snapshot) => {
            const equipos = snapshot.val();
            const newState = [];
            for(const equipo in equipos){
                newState.push({
                    id: equipo,
                    nombre: equipos[equipo].nombre,
                });
            }
            this.setState({
                equipos: newState
            });
            console.log("datos de equipos");
            console.log(newState);
        });*/
    }

    onSubmit = (event) => {
    event.preventDefault();
    console.log("Datos de usuario");
    console.log(this.state);

    const{
        nombre,
        apellido,
        email,
        pass1,
        tel,
        equipo,
        area
    } = this.state;

    const{
        history,
    } = this.props;

    db.doCreateUser(nombre, apellido, email, pass1, tel, equipo, area)
        .then(() => {
           this.setState({...INITIAL_STATE});
           console.log("Se ha creado el usuario");
           history.push(routes.USUARIOS);
        })
        .catch(error => {
           this.setState(byPropKey('error', error))
        });

    /*auth.doCreateUserWithEmailAndPassword(email, pass1)
    .then(authUser =>{
        db.doCreateUser(nombre, apellido, email, pass1, tel, equipo, area)
        .then(() => {
           this.setState({...INITIAL_STATE});
           console.log("Se ha creado el usuario");
        })
        .catch(error => {
           this.setState(byPropKey('error', error))
        });
    })
    .catch(error => {
        this.setState(byPropKey('error', error))
    });*/
    }


    render(){

        const {
            nombre,
            apellido,
            email,
            pass1,
            pass2,
            tel,
            equipo,
            area
        } = this.state;

        const IsInvalid = pass1 !== pass2 || 
        pass1 === '' || 
        nombre === '' || 
        apellido === '' ||
        email === '' ||
        tel === '' ||
        equipo === ''  ||
        area === '';
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
                        <label>Apellido</label>
                        <input type="text" 
                        value={apellido} onChange={event => this.setState(byPropKey('apellido', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Correo</label>
                        <input type="text" 
                        value={email} onChange={event => this.setState(byPropKey('email', event.target.value))}
                        />
                    </div>
                    
                    <div>
                        <label>Contraseña</label>
                        <input type="text" 
                        value={pass1} onChange={event => this.setState(byPropKey('pass1', event.target.value))}
                        />
                    </div>
                    
                    <div>
                        <label>Volver a escribir la Contraseña</label>
                        <input type="text" 
                        value={pass2} onChange={event => this.setState(byPropKey('pass2', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Telefono</label>
                        <input type="text" 
                        value={tel} onChange={event => this.setState(byPropKey('tel', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Equipo</label>
                        <select value={equipo} onChange={event=> this.setState(byPropKey('equipo', event.target.value))}>
                            <option value="ninguno">Ninguno</option>
                            <option value="nasa">NASA</option>
                            <option value="jpl">JPL</option>
                            <option value="cia">CIA</option>
                        </select>       
                    </div>
                    <div>
                        <label>Area</label>
                        <select value={area} onChange={event=> this.setState(byPropKey('area', event.target.value))}>
                            <option value="ninguno">Ninguno</option>
                            {this.state.areas && this.state.areas.map((area) => {return(<option value={area.nombre}>{area.nombre}</option>)})}
                        </select>       
                    </div>
                <button disabled={IsInvalid} type="submit" color="dark" value="crear">Crear Usuario</button>
                </form>
            </div>
        );
    }
}

export default AltaUsuario;