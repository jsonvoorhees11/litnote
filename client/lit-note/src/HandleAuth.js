import React from "react";
import {
    useLocation
} from "react-router-dom";

import {GET_TOKEN_URL} from './configs/app.config';

export default function HandleAuth() {
    let query = useQuery();
    const code = query.get('code');
    getJwtToken(code);
    
    return (
        <div>
            <h2>Token page</h2>
        </div>
    );
}

const getJwtToken = (code) => {
    const url = `${GET_TOKEN_URL}?code=${code}`;
    fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          if(result)
          {
            localStorage.setItem("userInfo",JSON.stringify(result));
            window.location.href = "/";
          }
        },
        (error) => {
          console.log(error);
        }
      );
}

const useQuery = ()=> new URLSearchParams(useLocation().search);