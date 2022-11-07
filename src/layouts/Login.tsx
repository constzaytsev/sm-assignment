import { FormEvent, useRef, useState } from "react";
import { useApi } from "../utils/api";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

const api = useApi();

export default function Login() {
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    if (name && email) {
      setError("");
      try {
        await api.registerUser({
          name,
          email,
        });
        navigate("/");
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="loginForm">
        <div>
          <Input ref={nameRef} type="text" placeholder="Name" required />
        </div>
        <div>
          <Input ref={emailRef} type="email" placeholder="Email" required />
        </div>
        <button>Go</button>
        {error && <div className="error">Error: {error}</div>}
      </form>
    </div>
  );
}
