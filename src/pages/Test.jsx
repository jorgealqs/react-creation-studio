import Layout from "../components/Layout"
import useUserActions from "../hooks/user.actions"
import { Container, Row, Col, Card } from "react-bootstrap"
import PropTypes from 'prop-types'
import Game from "../components/tictac"

function Panel({ baseURL }) {
  const userActions = useUserActions()
  const user = userActions.getUser()

  return (
    <Layout hasNavigationBack baseURL={baseURL}>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col className="mb-3" md={8} lg={6}>
            <Card className="border-0 shadow">
              <Card.Body>
                <h1 className="text-center mb-4">Welcome {user.first_name}!!!</h1>
                <p className="text-center">
                  You have successfully logged in to your dashboard.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" md={8} lg={6}>
            <Card className="border-0 shadow">
              <Card.Body>
                  <Game />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

Panel.propTypes = {
  baseURL: PropTypes.string.isRequired,
}

export default Panel
