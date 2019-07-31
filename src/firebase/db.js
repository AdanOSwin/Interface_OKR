import {db} from './firebase';
import 'firebase/firestore';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
require("firebase/firestore");

//var uuid = require('uuid');

export const userRef = firebase.firestore().collection('rc');

export const refKpi = firebase.database().ref('kpi');
//export const itemKpi = db.ref(`kpi/${uuid}`);
export const refRc = db.ref('rc');

export const refOkr = db.ref('okr');

export const doCreateKpi = (nombre, descripcion, valInicial, valActual, valTarget, rc) =>
db.ref('kpi').push({
    nombre,
    descripcion,
    valInicial,
    valActual,
    valTarget,
    rc
});

export const doCreateRc = (nombre, inicial, actual, esperado, target, inicio, termino, okr) =>
db.ref('rc').push({
    nombre,
    inicial,
    actual,
    esperado,
    target,
    inicio,
    termino,
    okr
});

export const doCreateOkr = (nombre, descripcion, equipo, prioridad, tipo, progreso, padre) =>
db.ref('okr').push({
    nombre,
    descripcion,
    equipo,
    prioridad,
    tipo,
    progreso,
    padre
})

export const consultaOkr = () =>
refKpi.on('value', (snapshot) => {
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
    console.log("KPI en altas");
    console.log(newState);
});