// import { randomAvatar } from "../utils"
import {
  Navbar,
  Container,
  Image,
  NavDropdown,
  Nav
}
from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import {
  StepForwardOutlined,
} from "@ant-design/icons"
import useUserActions from "../hooks/user.actions"
import PropTypes from "prop-types"  // Importa PropTypes


function Navigationbar(props) {

  const { baseURL } = props

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("auth")
    navigate("/login/")
  }
  const actionsUser = useUserActions()
  const user = actionsUser.getUser()
  const avatarUser = user.default_avatar === false ? baseURL + user.avatar : user.avatar

  return (
    <Navbar bg="success" variant="dark">
        <Container>
          <Navbar.Brand className="fw-bold">
            <Link to="/test/" className="text-decoration-none text-light">
              Creation studio
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown
                title={
                  <Image
                    src={avatarUser}
                    roundedCircle
                    width={36}
                    height={36}
                  />
                }
              >
                <NavDropdown.Item as={Link} to={`/profile/${user.id}/`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout} className="text-danger" >
                  <StepForwardOutlined /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

Navigationbar.propTypes = {
  baseURL: PropTypes.string,
}

export default Navigationbar