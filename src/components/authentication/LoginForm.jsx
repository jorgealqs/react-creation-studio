import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import useUserActions from "../../hooks/user.actions"


function LoginForm() {

  const userActions = useUserActions()
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ email: "", password: "" })

  const handleSubmit = (event) => {
    event.preventDefault()
    const registrationForm = event.currentTarget
    setValidated(true)
    if (registrationForm.checkValidity() === false) {
      event.stopPropagation()
      return
    }
    const data = {
      email: form.email,
      password: form.password,
    }
    userActions.login(data)
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError("An unexpected error occurred.");
      }
      setValidated(false);
      setForm({ email: "", password: "" });
    })
  }

  return (
    <Form
      id="registration-form"
      className="border p-4 rounded"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          type="email"
          placeholder="Enter email"
        />
        <Form.Control.Feedback type="invalid">
          This file is required.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          type="password"
          placeholder="Enter password"
        />
        <Form.Control.Feedback type="invalid">
          This file is required.
        </Form.Control.Feedback>
      </Form.Group>
      <div className="text-content text-danger">
        {error && <p>{error}</p>}
      </div>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default LoginForm
