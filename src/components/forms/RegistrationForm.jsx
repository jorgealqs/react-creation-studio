import { useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import useUserActions from "../../hooks/user.actions"
import { Link } from "react-router-dom"
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons"

function RegistrationForm() {
  const userActions = useUserActions()
  const [validated, setValidated] = useState(false)
  const [form, setForm] = useState({ username:"", password:"", email:"", first_name:"", last_name:"", bio:"" })
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const registrationForm = event.currentTarget
    setValidated(true)
    if (registrationForm.checkValidity() === false) {
      event.stopPropagation()
      return
    }
    const data = {
      username: form.username,
      password: form.password,
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
      bio: form.bio,
    }
    userActions.register(data)
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
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="p-5 rounded border shadow w-50 bg-light">
        <h2 className="mb-4 text-center">Create an Account</h2>
        <Form
          id="registration-form"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <UserOutlined />
              </span>
              <Form.Control
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                required
                type="text"
                placeholder="First Name"
              />
            </div>
            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <UserOutlined />
              </span>
              <Form.Control
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                required
                type="text"
                placeholder="Last Name"
              />
            </div>
            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <UserOutlined />
              </span>
              <Form.Control
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                type="text"
                placeholder="Username"
              />
            </div>
            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <MailOutlined />
              </span>
              <Form.Control
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                type="email"
                placeholder="Email Address"
              />
            </div>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <LockOutlined />
              </span>
              <Form.Control
                value={form.password}
                minLength="8"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                type="password"
                placeholder="Password"
              />
            </div>
            <Form.Control.Feedback type="invalid">
              Please provide a valid password with at least 8 characters.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              as="textarea"
              rows={3}
              placeholder="A simple bio ... (Optional)"
            />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button variant="primary" type="submit" className="w-100">
            Create Account
          </Button>
        </Form>
        <div className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm
