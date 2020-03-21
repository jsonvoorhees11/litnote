
import React from 'react'
import {
    Container,
    Dropdown,
    Image,
    Menu
} from 'semantic-ui-react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import NotesFeed from './NotesFeed.js'
import {AUTHORIZE_URL, OAUTH_CLIENT_ID, HOST_URL} from './configs/app.config'
import HandleAuth from './HandleAuth.js'


const FixedMenuLayout = () => (
    <div>
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    <Image size='mini' src='/logo_litnote.png' style={{ marginRight: '1.5em' }} />
          LitNote
                </Menu.Item>
                <Menu.Item as='a'>Home</Menu.Item>
                <Menu.Item as='a'>Create note</Menu.Item>
                <Dropdown item simple text='Explore'>
                    <Dropdown.Menu>
                        <Dropdown.Item>People</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                            <i className='dropdown icon' />
                            <span className='text'>Submenu</span>
                            <Dropdown.Menu>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Item>List Item</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item as='a' onClick={login} position="right">
                    Login
                </Menu.Item>
            </Container>
        </Menu>
        <Router>
            <Switch>
                <Route path="/handle-auth">
                    <HandleAuth />
                </Route>
                <Route path="/">
                    <NotesFeed />
                </Route>
            </Switch>
        </Router>
    </div>
)

const login = () => {
    const stateString = getStateString();
    let url = `${AUTHORIZE_URL}?client_id=${OAUTH_CLIENT_ID}&state=${stateString}&redirect_uri=${HOST_URL}/handle-auth`;
    window.location.href = url;
}

const getStateString = () => {
    var uuid = require("uuid");
    var id = uuid.v1().replace('-','').substring(10);
    return id;
} 

export default FixedMenuLayout