import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Confirm() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("Carregando..")

    const requestBody = {
        "SignupConfirmForm": {
            id: searchParams.get("id"),
            auth_key: searchParams.get("auth_key")
        }
    };
    
    // Has to be invoked only once, react "strict mode" by default calls things twice, so i'll disable it
    fetch('/api/v1/user/confirm', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(res => res.json())
    .then(data => {
        setStatus(data.success ? "Confirmado" : "Falhou");
    })
    .catch(error => console.error(error));
    

    return (
        <div className="grid place-items-center h-full w-full">
            <h1>{status}</h1>
        </div>
    )
}