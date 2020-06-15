import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';


class Main extends Component {
    render() {
        return (<>
            <Switch>
                <Route path="/home" component={Homepage} />
                <Redirect to="/home" />
            </Switch>
        </>
        )
    }
}

export default Main;
