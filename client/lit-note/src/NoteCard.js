import React from 'react'
import { Card, Icon, Image, Container, Grid } from 'semantic-ui-react'
import he from 'he'
import Highlight from 'react-highlight'

export default class NoteCard extends React.Component{
    constructor(props) {
        super(props);
      }

    render() {
        return <Grid.Row className="note-container">
                    <Grid.Column className="card-divider" width={4}>
                        <Card className="note-card">
                            <Card.Content>
                                 <Image
                                    floated='left'
                                    size='mini'
                                    src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                                    />
                                    <Card.Header>{this.props.note.Creator}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>{new Date(this.props.note.CreatedAt).toLocaleDateString()}</span>
                                </Card.Meta>
                                <Card.Description>
                                    {this.props.note.Description}
                                </Card.Description>
                                </Card.Content>
                            </Card>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Container fluid className="note">
                            <Highlight language="csharp">
                                {he.decode(this.props.note.Content)}    
                            </Highlight>
                        </Container>
                    </Grid.Column>
                </Grid.Row>        
    }
}