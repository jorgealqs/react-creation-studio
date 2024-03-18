import { randomAvatar } from "../utils"
import {
  Navbar,
  Container,
  Image,
  NavDropdown,
  Nav
}
from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import {
  StepForwardOutlined,
} from "@ant-design/icons"

function Navigationbar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("auth")
    navigate("/login/")
  }
  return (
    <Navbar bg="success" variant="dark">
        <Container>
          <Navbar.Brand className="fw-bold" href="#">
            Creation studio
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown
                title={
                  <Image
                    src={randomAvatar()}
                    roundedCircle
                    width={36}
                    height={36}
                  />
                }
              >
                {/* <NavDropdown.Item href="#">
                  Profile
                </NavDropdown.Item> */}
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

export default Navigationbar