import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Onebox from './components/Onebox'

const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" element={<Login />} />
      <Route path="/onebox" element={<Onebox />} />
    </Switch>
  </BrowserRouter>
)

export default AppRoutes
