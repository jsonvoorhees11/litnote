import React from "react";
import {
    useLocation
} from "react-router-dom";

export default function HandleAuth() {
    let query = useQuery();
    return (
        <div>
            <h2>{query.get('code')}</h2>
            <h2>{query.get('state')}</h2>
        </div>
    );
}

const useQuery = ()=> new URLSearchParams(useLocation().search);