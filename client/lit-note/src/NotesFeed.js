import React from 'react'

import NoteCard from './NoteCard';
import {
  Grid
} from 'semantic-ui-react'
export default class NotesFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      notes: []
    };
  }

  componentDidMount() {
    fetch("https://localhost:5001/api/notes", {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            notes: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  createNoteCards = () => {
    if (!this.state.notes) {
      return;
    }
    return this.state.notes.map( note => {
      return <NoteCard note ={note} key={note.Id}></NoteCard>
    })
  }

  render() {
    const { error, isLoaded, notes } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Grid container columns={2} id="notes-feed">
          {this.createNoteCards()}
        </Grid>
      );
    }
  }
}
