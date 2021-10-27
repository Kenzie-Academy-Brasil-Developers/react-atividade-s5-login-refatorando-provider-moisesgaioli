// import { Route, Switch } from "react-router-dom";
import { Route, Switch } from "react-router";
import Dashboard from "../Components/Dashboard";
import Login from "../Components/Login";

const Routes = () => {

    return (
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
        </Switch>
    )
}

export default Routes