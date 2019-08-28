import React, {Component} from 'react';
import AltaEquipo from './AltaEquipo';

class Equipos extends Component{
    render(){
        return(
            <div>
                <h1>Equipos</h1>
                    <p>Escuadron alpha lobo</p>
                    <p>Equipo Dinamita</p>
                    <p>Equipo Maravilla</p>
                    <p>Pandilla buena onda</p>
                <AltaEquipo />
            </div>
        );
    }
}

export default Equipos;