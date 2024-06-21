import { FormEvent } from "react";
import { useSearchParams } from "react-router-dom"

// Front ends, please change all of this to be aligned with the rest of the app. It's quite shit rn
export default function PasswordReset() {
  const [searchParams] = useSearchParams();

  function resetPass(e: FormEvent) {
    fetch("/api/v1/password-reset", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({
        "PasswordResetForm": {
          "id": searchParams.get("id"),
          "token": searchParams.get("token"),
          "password": "newpass123"
        }
      })
    }) // Go to login?
  }

  return (<>
    <h1>
      Form Redefinição de senha

      <form onSubmit={resetPass}>
        <input type="submit" value="Return to sender" className="cursor-pointer border p-5 bg-red-500 animate-pulse" onClick={resetPass} />
      </form>

    </h1>
  </>)

}