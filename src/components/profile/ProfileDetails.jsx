import { Button, Image } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'
import useUserActions from "../../hooks/user.actions"

function ProfileDetails(props) {
  const { user, baseURL } = props
  // Desestructura el usuario si está disponible
  const [currentUser] = user || []
  const navigate = useNavigate()
  // Si el usuario no está disponible, muestra un mensaje de carga
  const loginUser = useUserActions()
  if (!currentUser) {
    return <div>Loading...</div>
  }
  const { avatar, first_name, bio, posts_count, id, default_avatar } = currentUser

  const avatarUser = default_avatar === false ? baseURL + avatar : avatar


  const userSesssion = loginUser.getUser()

  return (
    <div>
      <div className="d-flex flex-row border-bottom p-5">
        <Image
          src={avatarUser}
          roundedCircle
          width={120}
          height={120}
          className="me-5 border border-primary border-2"
        />
        <div className="d-flex flex-column justify-content-start align-self-center mt-2">
          <p className="fs-4 m-0">{first_name}</p>
          <p className="fs-5">{bio ? bio : "(No bio.)"}</p>
          <p className="fs-6">
            <small>{posts_count} posts</small>
          </p>
            {userSesssion.id === id ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`/profile/${id}/edit/`)}
            >
              Edit
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

// Definir validación de PropTypes
ProfileDetails.propTypes = {
  user: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      first_name: PropTypes.string,
      bio: PropTypes.string,
      posts_count: PropTypes.number,
      id: PropTypes.string
    })
  ),
  baseURL: PropTypes.string.isRequired
}

export default ProfileDetails
