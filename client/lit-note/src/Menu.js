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
    Link
  } from "react-router-dom";
import NotesFeed from './NotesFeed.js'
import {AUTHORIZE_URL, OAUTH_CLIENT_ID, HOST_URL} from './configs/app.config'
import HandleAuth from './HandleAuth.js'
import CreateNote from './CreateNote.js'


const FixedMenuLayout = () => (
    <div>
        <Router>
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    <Image size='mini' src='/logo_litnote.png' style={{ marginRight: '1.5em' }} />
          LitNote
                </Menu.Item>
                <Menu.Item as='a'>Home</Menu.Item>
                <Menu.Item><Link to="/create-note">Create note</Link></Menu.Item>
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
                {getLoginMenuItems()}
            </Container>
        </Menu>
        <Switch>
            <Route path="/create-note">
                <CreateNote/>
            </Route>
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

const getLoginMenuItems = () => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(storedUserInfo) {
        const userName = storedUserInfo["Username"];
        return  <> <Menu.Item as='a' position="right">
                    {userName}
                </Menu.Item>
                <Menu.Item as='a' position="right">
                    Logout
                </Menu.Item> </>
    }
    else {
        return  <Menu.Item as='a' onClick={login} position="right">
                    Login
                </Menu.Item>
    }
}

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