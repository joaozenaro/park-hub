import { useState, useEffect } from 'react';

export default function Home() {
    const [count, setCount] = useState(0)
    const [backendResponse, setBackendResponse] = useState(null);
    
    useEffect(() => {
      fetch('/api')
        .then(response => response.json())
        .then(json => setBackendResponse(json.message))
        .catch(error => console.error(error));
    }, []);
  
    return (
      <div className="grid place-items-center h-full w-full">
        <div>
          <h1 className="text-xl">
            Home Page! Fetched from /api: {backendResponse}
          </h1>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>
    )
  }