import React, {Component} from 'react';
import AltaArea from './AltaArea';

class Areas extends Component{
    render(){
        return(
            <div>
                <h1>Areas del trabajo</h1>
                    <p>RH</p>
                    <p>ventas</p>
                    <p>Produccion</p>
 
                <AltaArea />
            </div>
        );
    }
}

export default Areas;