import Layout from "../components/Layout"
import useUserActions from "../hooks/user.actions"
import { Container, Row, Col, Card } from "react-bootstrap"
import PropTypes from 'prop-types' // Importa PropTypes


function Panel(props) {

  const { baseURL } = props

  const userActions = useUserActions()
  const user = userActions.getUser()

  return (
    <Layout hasNavigationBack baseURL={baseURL} >
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="border-0 shadow">
              <Card.Body>
                <h1 className="text-center mb-4">Welcome {user.first_name}!!!</h1>
                <p className="text-center">
                  You have successfully logged in to your dashboard.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

Panel.propTypes = {
  baseURL: PropTypes.string, // Propiedad baseURL requerida y de tipo string
}

export default Panel
