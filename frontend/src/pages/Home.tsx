import { useState, useEffect } from 'react';

export default function Home() {
    const [count, setCount] = useState(0)
    const [backendResponse, setBackendResponse] = useState("");
    
    let status: number, resBody: string;
    useEffect(() => {
      fetch('/api/ping')
        .then(response => {
          status = response.status;
          return response.json();
        })
        .then(body => resBody = body)
        .finally(() => {
          setBackendResponse(`{ status: ${status}, body: \"${resBody}\" }`)
        })
        .catch(error => console.error(error));
    }, []);
  
    return (
      <div className="grid place-items-center h-full w-full">
        <div>
          <h1 className="text-xl">
            /api/ping: {backendResponse}
          </h1>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>
    )
  }