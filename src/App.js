import React from 'react';

import AgendaState from './context/agenda/agendaState';
import Agenda from './components/Agenda';
import EditarProyecto from './components/EditarProyecto';
import AlertaState from './context/alertas/alertaState';
import NuevoProyecto from './components/NuevoProyecto';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <AgendaState>
      <AlertaState>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Agenda}/>
          <Route path='/nuevo-proyecto' exact component={NuevoProyecto}/>
          <Route path='/editar-proyecto' exact component={EditarProyecto}/>
        </Switch>
      </BrowserRouter>
      </AlertaState>
    </AgendaState>
  );
}

export default App;
