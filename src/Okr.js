import React, {Component} from 'react';
import Toggle from './Toggle';
import AltaOkr from './AltaOkr';
import AltaRc from './AltaRc';
import ConsultaRc from './ConsultaRc';
import ConsultaOkr from './ConsultaOkr';
import ConsultaGlobal from './ConsultaGeneral';
import './App.css';
import './ConsultaOkr.css'

class Okr extends Component{
    render(){
        return(
            <div className="despliegue">
                <div className="CrearOkr">
                    <label>Crear OKR</label>
                    <Toggle><AltaOkr /></Toggle>
                </div>
                <div className="CrearRc">
                    <label>Crear RC</label>
                    <Toggle><AltaRc /></Toggle>
                </div>
                <br />
                <br />
                <br />
                <br />
            <div className="consulta">
            <label>Directorio de Objetivos</label>
            <Toggle>
                <div className="ConOkr">
                    <ConsultaOkr />
                <div className="ConRc">
                    <Toggle>
                        <ConsultaRc />
                    </Toggle>
                </div>
            </div>
            </Toggle>
            </div>
            <div className="general">
                <ConsultaGlobal />
            </div>
            <div> 

            </div>
            </div>
        );
    }
}


export default Okr;