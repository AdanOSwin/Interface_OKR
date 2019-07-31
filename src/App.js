import React from 'react';
import logo from './logo.svg';
import firebase from 'firebase/app';
import Altakpi from './Altakpi';
import AltaRc from './AltaRc';
import AltaOkr from './AltaOkr';
import ConsultaKpi from './ConsultaKpi';
import ConsultaOkr from './ConsultaOkr';
import ConsultaRc from './ConsultaRc';
import Toggle from './Toggle';
//import Despliega from './Altas';
import './App.css';

function App() {
  return (
  <div>
    <div className="App">
    </div>
    
    <div>
      <table>
        <tr>
          <th>OKR</th>
          <th>Resultado Clave</th>
          <th>KPI</th>
        </tr>
        <tr>
          <th><AltaOkr /></th>
          <th><AltaRc /></th>
          <th><Altakpi /></th>
        </tr>
      </table>
    </div>
    <div>
      <Toggle>
        <div>
          <ConsultaOkr />
          <div>
            <Toggle>
              <ConsultaRc />
            </Toggle>
            <div>
              <Toggle>
                <ConsultaKpi />
              </Toggle>
            </div>
          </div>
        </div>
      </Toggle>
    </div>
    <div>
      --------------------------------------------
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

    </div> 
  </div>
  );
}

export default App;
