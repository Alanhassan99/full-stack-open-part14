"use client"
import { useActionState } from "react"
import { registerUser, UserFormState } from "../actions/users"

export default function RegisterPage() {
  const initialState: UserFormState = { errors: {}, values: { username: "", password: "", passwordConfirm: "" } }
  const [state, formAction] = useActionState(registerUser, initialState)
  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
            {state.errors?.username && <p data-testid="username-error" style={{ color: "red" }}>{state.errors.username}</p>}
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
            {state.errors?.password && <p data-testid="password-error" style={{ color: "red" }}>{state.errors.password}</p>}
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="passwordConfirm" required />
            {state.errors?.passwordConfirm && <p data-testid="passwordConfirm-error" style={{ color: "red" }}>{state.errors.passwordConfirm}</p>}
          </label>
        </div>
        <button type="submit" data-testid="register-button">Register</button>
      </form>
    </div>
  )
}