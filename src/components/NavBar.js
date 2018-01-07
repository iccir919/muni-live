import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import axios from 'axios';

import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

class RouteDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        open: false,
        routes: []
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    let myPaddingStyle = {
        paddingTop: 10,
    }
    let routes = this.props.routes;
    return (
      <div>
        <RaisedButton
          label="Choose Route"
          onClick={this.handleToggle}
          secondary={true}
          style={{
            marginTop: 5,
            marginRight: 10
          }}
        />
        <Drawer
          docked={false}
          width={100}
          open={this.state.open}
          openSecondary={true}

        >
            <Menu
                onItemClick={this.props.clickHandler}
            >
                {routes.length ? routes.map((route, idx) =>
                    <MenuItem 
                        key={idx}
                        ref={route}
                        onClick={this.handleClose}
                        primaryText={route}
                    >
                    </MenuItem>

                ) : <MenuItem
                        disabled={true}
                        primaryText="Loading..."
                    >
                    </MenuItem>
                 }
            </Menu>
        </Drawer>
      </div>
    );
  }
}

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logged: true,
            routes: []
        };
    }

    render() {
        return (
        <div>
            <AppBar
            title="Muni Live!"
            iconElementRight= {<RouteDrawer 
                clickHandler={this.props.clickHandler}
                routes={this.props.routes}
            />}
            showMenuIconButton={false}
            />
        </div>
        );
    }
}

export default NavBar;