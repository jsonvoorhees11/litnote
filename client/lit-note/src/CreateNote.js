import React, {useState, useEffect } from 'react'
import { Form,Container, Input } from 'semantic-ui-react'
import {API_URL} from './configs/app.config'
import { useInput } from './hooks/useInput';

const CreateNote = () => { 
    const [availableLangs, setAvailableLangs] = useState([]);

    const {value: note, bind: bindNote, reset: resetNote} = useInput('');
    const {value: url, bind: bindUrl, reset: resetUrl} = useInput('');
    const {value: language, bind: bindLanguage, reset: resetLanguage} = useInput('');
    const {value: description, bind: bindDescription, reset: resetDescription} = useInput('');

    const langUrl = `${API_URL}/api/Notes/supported-languages`;
    const getLangOptions = (langs) => {
        let options = [];
        Array.from(langs).map(l => options.push({ key: l, text: l, value: l }));
        return options;
    };
    const handleSubmit = () => {
        const postNoteUrl = `${API_URL}/api/Notes`;
        postNote(postNoteUrl,{content:note,language:language, url:url, description: description});
    }

    useEffect(() => {
        fetchData(langUrl)
        .then(lang =>setAvailableLangs(lang));
    },[]);

    return  <Container text style={{ marginTop: '10em' }}>
            <Form onSubmit = {handleSubmit}>
                <Form.TextArea label='Note' {...bindNote}
                value={note} placeholder='Code or plain text...'/>         
                <Form.Group>
                <Form.Input label='URL' {...bindUrl}
                value = {url} placeholder="URL of the note"/>
                <Form.Select
                    label='Language'
                    options={getLangOptions(availableLangs)}
                    placeholder='Language'
                    {...bindLanguage}
                />
                </Form.Group>
                <Form.TextArea value = {description} {...bindDescription}
                 label='Description' placeholder='Something about your note...' />
                <Form.Button>Submit</Form.Button>
            </Form>
            </Container>
}

const postNote = (postNoteUrl, note) => {
    fetch(postNoteUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
    .then((result)=> {
        console.log("Created successfully");
    })
    .catch((err)=> {
        console.error(err);
    });
}

const fetchData = (langUrl) => {
    return fetch(langUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((result)=>{
        return result.json();
    })
    .catch((err)=> {
        console.error(err);
        return null;
    });
}

export default CreateNote