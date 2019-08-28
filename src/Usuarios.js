import React, {Component} from 'react';
import AltaUsuario from './AltaUsuario';
class Usuarios extends Component{
    render(){
        return(
            <div>
                <h3>Companions</h3>
                    <p>Clara Oswald</p>
                    <p>Amelia Pond</p>
                    <p>Rose Tyler</p>
                    <p>Donna Noble</p>
                    <p>Martha Jones</p>

                <AltaUsuario />
            </div>
        );
    }
}

export default Usuarios;