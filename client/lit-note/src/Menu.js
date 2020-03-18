
import React from 'react'
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment,
    Card
} from 'semantic-ui-react'

import NotesFeed from './NotesFeed.js'

const FixedMenuLayout = () => (
    <div>
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    <Image size='mini' src='/logo_litnote.png' style={{ marginRight: '1.5em' }} />
          LitNote
        </Menu.Item>
                <Menu.Item as='a'>Home</Menu.Item>

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
            </Container>
        </Menu>

        <Container text style={{ marginTop: '7em' }}>
            <Header as='h1'>Notes feed</Header>
            <p>Explore what people you follow have noted</p>
        </Container>
      <NotesFeed>
      </NotesFeed>
    </div>
)

export default FixedMenuLayout