import { useState, useContext } from "react"
import { Form, Button, Image } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import useUserActions from "../../hooks/user.actions"
import { Context } from "../Layout"
import PropTypes from 'prop-types' // Importa PropTypes

function UpdateProfileForm(props) {

  const { profile, baseURL } = props
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [form, setForm] = useState(profile[0])
  const [error, setError] = useState(null)
  const userActions = useUserActions()
  const [avatar, setAvatar] = useState()
  const { setToaster } = useContext(Context)
  const avatarUser = form.default_avatar === false ? baseURL + form.avatar : form.avatar


  const [selectedAvatar, setSelectedAvatar] = useState(avatarUser)
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const updateProfileForm = event.currentTarget
    if (updateProfileForm.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    const data = {
      first_name: form.first_name,
      last_name: form.last_name,
      bio: form.bio,
    }

    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key])
      }
    })
    if (selectedAvatarFile && selectedAvatarFile instanceof File) {
      formData.append("avatar", selectedAvatarFile);
    }
    userActions
    .edit(formData, profile[0].id)
    .then(() => {
      setToaster({
        type: "success",
        message: "Profile updated successfully 🚀",
        show: true,
        title: "Profile updated",
      })
      navigate('.')
      setValidated(false)
    })
    .catch((err) => {
      if (err.message) {
      setError(err.request.response)
      }
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
      <Form.Group className="mb-3 d-flex flex-column">
        <Form.Label className="text-center">
          Avatar
        </Form.Label>
        <Image
        src={selectedAvatar}
        roundedCircle
        width={120}
        height={120}
        className="m-2 border border-primary border-2
        align-self-center"
        />
        <Form.Control
          onChange={(e) => {
            setSelectedAvatar(URL.createObjectURL(e.target.files[0]));
            setSelectedAvatarFile(e.target.files[0]);
          }}
          className="w-50 align-self-center"
          type="file"
          size="sm"
        />
        <Form.Control.Feedback type="invalid">
          This file is required.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          First Name
        </Form.Label>
        <Form.Control
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name:
          e.target.value })}
          required
          type="text"
          placeholder="Enter first name"
        />
        <Form.Control.Feedback type="invalid">
          This file is required.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          Last name
        </Form.Label>
        <Form.Control
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name:
          e.target.value })}
          required
          type="text"
          placeholder="Enter last name"
        />
        <Form.Control.Feedback type="invalid">
          This file is required.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          Bio
        </Form.Label>
        <Form.Control
        value={form.bio}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
        as="textarea"
        rows={3}
        placeholder="A simple bio ... (Optional)"
        />
      </Form.Group>
      <div className="text-content text-danger">{error &&
        <p>{error}</p>}
      </div>
      <Button variant="primary" type="submit">
        Save changes
      </Button>
    </Form>
  )
}

UpdateProfileForm.propTypes = {
  profile: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      bio: PropTypes.string,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  baseURL: PropTypes.string.isRequired, // Propiedad baseURL requerida y de tipo string
}

export default UpdateProfileForm