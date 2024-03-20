import { useState } from "react"
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap"
import useUserActions from "../../hooks/user.actions"
import { Link } from "react-router-dom"
import { MailOutlined, LockOutlined } from "@ant-design/icons"

function LoginForm() {
  const userActions = useUserActions()
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ email: "", password: "" })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const registrationForm = event.currentTarget
    setValidated(true)

    if (registrationForm.checkValidity() === false) {
      event.stopPropagation()
      return
    }

    try {
      await userActions.login(form)
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail)
      } else {
        setError("An unexpected error occurred.")
      }
    } finally {
      setValidated(false)
      setForm({ email: "", password: "" })
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5 p-5">
        <Col xs={12} md={6}>
          <Form
            id="registration-form"
            className="border p-4 rounded shadow"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <h2 className="mb-4 text-center">Login</h2>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <MailOutlined />
                </span>
                <Form.Control
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  type="email"
                  placeholder="Enter email"
                />
              </div>
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <LockOutlined />
                </span>
                <Form.Control
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              <Form.Control.Feedback type="invalid">
                Please enter your password.
              </Form.Control.Feedback>
            </Form.Group>
            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
          <div className="text-center mt-3">
            Don&apos;t have an account? <Link to="/register/">Register</Link>
          </div>
        </Col>
      </Row>
    </Container>

  )
}

export default LoginForm
