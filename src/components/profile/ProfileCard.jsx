import PropTypes from "prop-types" // Importa PropTypes

import { Card, Button, Image } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function ProfileCard(props) {
  const navigate = useNavigate()

  const { user, baseURL } = props

  const handleNavigateToProfile = () => {
    navigate(`/profile/${user.id}/`)
  }

  const avatarUser = user.default_avatar === false ? baseURL + user.avatar : user.avatar

  return (
    <Card className="border-0 p-2">
      <div className="d-flex ">
        <Image
          src={avatarUser}
          roundedCircle
          width={48}
          height={48}
          className="my-3 border border-primary border-2"
        />
        <Card.Body>
          <Card.Title className="fs-6">{user.first_name}</Card.Title>
          <Button variant="primary" onClick={handleNavigateToProfile}>
            See profile
          </Button>
        </Card.Body>
      </div>
    </Card>
  )
}

// Define PropTypes para el componente
ProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    default_avatar: PropTypes.bool.isRequired,
  }).isRequired,
  baseURL : PropTypes.string.isRequired,
}

export default ProfileCard
