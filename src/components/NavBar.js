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
    this.state = {open: false};
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
          label="Choose Route To See!"
          onClick={this.handleToggle}
          secondary={true}
          style={{
            marginTop: 5,
            marginRight: 10
          }}
        />
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          openSecondary={true}
          onRequestChange={(open) => this.setState({open})}
        >
            <Menu
                onItemClick={this.props.clickHandler}
            >
                {routes.length ? routes.map((route, idx) =>
                    <MenuItem 
                        key={idx}
                        ref={route.tag}
                    >
                        {route.title}
                    </MenuItem>

                ) : null }
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

    componentDidMount() {
        axios.get(`http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni`)
          .then(res => {
              let routes = res.data.route; 
              this.setState({ routes });
        });
    }

    render() {
        return (
        <div>
            <AppBar
            title="Muni Live!"
            iconElementRight= {<RouteDrawer 
                routes={this.state.routes}
                clickHandler={this.props.clickHandler}
            />}
            showMenuIconButton={false}
            />
        </div>
        );
    }
}

export default NavBar;