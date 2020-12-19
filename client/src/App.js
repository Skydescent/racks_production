import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import './styles/styles.css';
import './styles/media.css';

import Racks from './pages/Racks';
import TestNodeMailer from './components/TestNodeMailer';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Racks />
        </Route>
        <Route exact path="/garderobnyye_sistemy">
          <div>Гардеробные системы</div>
          <TestNodeMailer />
        </Route>
        <Route exact path="/shkafy_metallicheskiye">
          <div>Шкафы металлические</div>
        </Route>
        <Route exact path="/gruzovyye">
          <div>Грузовые стиллажи</div>
        </Route>
        <Route exact path="/khraneniye_shin">
          <div>Хранение Шин</div>
        </Route>
        <Route exact path="/bytovyye">
          <div>Бытовые стиллажи</div>
        </Route>
        <Route>
          <div>Not found</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
