import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import "./styles/styles.css";
import "./styles/media.css";

import Racks from "./pages/Racks";
import MetalCabinets from "./pages/MetalCabinets";
import WardrobeSystems from "./pages/WardrobeSystems";
import CargoRack from "./pages/CargoRack";
import TireStorage from "./pages/TireStorage";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Racks />
        </Route>
        <Route exact path="/garderobnyye_sistemy">
          <WardrobeSystems />
        </Route>
        <Route exact path="/shkafy_metallicheskiye">
          <MetalCabinets />
        </Route>
        <Route exact path="/gruzovyye">
          <CargoRack />
        </Route>
        <Route exact path="/khraneniye_shin">
          <TireStorage />
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
