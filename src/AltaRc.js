import React, {Component} from 'react';
import {db} from './firebase';
import { refOkr } from './firebase/db';

const INITIAL_STATE = {
    nombre: '',
    inicial: '',
    actual: '',
    esperado: '',
    target: '',
    inicio: '',
    termino: '',
    okr: '',
    error: null
};

const byPropKey = (propertyName, value) => () =>({
    [propertyName] : value,
});

class AltaRc extends Component{
    constructor(props){
        super(props);

        this.state={
            INITIAL_STATE
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        refOkr.on('value', (snapshot) => {
            const items = snapshot.val();
            const newState = [];
            for(const item in items){
                newState.push({
                   id: item, 
                   nombre: items[item].nombre,
                });
            }
            this.setState({
                items:newState
            });
            console.log("OKR en resultado clave");
            console.log(newState);
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const{
            nombre,
            inicial,
            actual,
            esperado,
            target,
            inicio,
            termino,
            okr
        } = this.state;
        console.log("RESULTADO CLAVE");
        console.log(this.state);

        db.doCreateRc(nombre, inicial, actual, esperado, target, inicio, termino, okr)
        .then(() =>{
            this.setState({...INITIAL_STATE});
            console.log("Se ha Creado el Resultado clave");
        })
        .catch(error => {
            this.setState(byPropKey('error', error))
        });
    }

    render(){

        const{
            nombre,
            inicial,
            actual,
            esperado,
            target,
            inicio,
            termino,
            okr
        } = this.state;

        return(
            <div>
                <h2>Creacion de Resultado Clave</h2>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Nombre</label>
                        <input type="text" 
                        value={nombre} onChange={event => this.setState(byPropKey('nombre', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Valor de inicio</label>
                        <input type="text"
                        value={inicial} onChange={event=> this.setState(byPropKey('inicial', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Valor Actual</label>
                        <input type="text"
                        value={actual} onChange={event => this.setState(byPropKey('actual', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Valor esperado</label>
                        <input type="text" 
                        value={esperado} onChange={event => this.setState(byPropKey('esperado', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Valor Objetivo</label>
                        <input type="text" 
                        value={target} onChange={event => this.setState(byPropKey('target', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Fecha de inicio de captura</label>
                        <input type="date" 
                        value={inicio} onChange={event => this.setState(byPropKey('inicio', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>Fecha de termino de captura</label>
                        <input type="date" 
                        value={termino} onChange={event => this.setState(byPropKey('termino', event.target.value))}
                        />
                    </div>
                    <div>
                        <label>OKR</label>
                        <select value={okr} onChange={event => this.setState(byPropKey('okr', event.target.value)) }>
                            <option>Ninguno</option>
                            {this.state.items && this.state.items.map((item) => {return(<option>{item.nombre}</option>);})}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-Dark">Crear</button>
                </form>
            </div>
        );
    }
}

export default AltaRc;