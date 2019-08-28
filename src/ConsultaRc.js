import React, {Component} from 'react';
import {db} from './firebase';
//import firebase from './firebase';
import {refRc} from './firebase/db';
import firebase from 'firebase/app';
import 'firebase/database';

const INITIAL_STATE = {
    nombre: '',
    inicial: '',
    actual: '',
    esperado: '',
    target: '',
    inicio: '',
    termino: '',
    okr: ''
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class ConsultaRc extends Component{

    constructor(props){
        super(props);

        this.state={
            INITIAL_STATE
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.removeRc = this.removeRc.bind(this);
    }

    removeRc(uuid){
        console.log("Hayley");
        const itemRc = firebase.database().ref(`rc/${uuid}`);
        console.log("Williams");
        itemRc.remove();
    }

    componentDidMount(){
        refRc.on('value', (snapshot) => {
            const items = snapshot.val();
            const newState = [];
            for(const item in items){
                newState.push({
                   id: item,
                   nombre: items[item].nombre,
                   inicial: items[item].inicial,
                   actual: items[item].actual,
                   esperado: items[item].esperado,
                   target: items[item].target,
                   termino: items[item].termino,
                   okr: items[item].okr 
                });
            }
            this.setState({
                items:newState
            });
            console.log("Resultados clave");
            console.log(items);
        });
    }

    render(){
        return(
            <div>
                <section>
                    <h3>Consulta RC</h3>
                    <div className="wrapper">
                        <table>
                            <tr>
                                <th className="nombre">Nombre</th>
                                <th className="Actual">Valor actual</th>
                                <th className="Esperado"> Valor esperado</th>
                                <th className="Target">Valor objetivo</th>
                                <th className="Elimina"></th>
                                <th className="Edita"></th>
                            </tr>
                            {this.state.items && this.state.items.map((item) => {
                                return(
                                    <tr>
                                        <td className="nombre">{item.nombre}</td>
                                        <td className="Actual">{item.actual}</td>
                                        <td className="Esperado">{item.esperado}</td>
                                        <td className="Target">{item.target}</td>
                                        <td className="Elimina"><button onClick={() => this.removeRc(item.id)}>Eliminar</button></td>
                                        <td className="Edita"><button>Editar</button></td>
                                    </tr>       
                                );
                            })}
                        </table>
                    </div>
                </section>
            </div>
        );
    }
}

export default ConsultaRc;