import Carrinho from 'pages/Carrinho'
import Feira from 'pages/Feira'
import Login from 'pages/Login'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import 'common/context/Usuario'
import { UsuarioProvider } from 'common/context/Usuario'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <UsuarioProvider>
            <Login />
          </UsuarioProvider>
        </Route>
        <Route path="/feira">
          <UsuarioProvider>
            <Feira />
          </UsuarioProvider>
        </Route>
        <Route path="/carrinho">
          <Carrinho />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router