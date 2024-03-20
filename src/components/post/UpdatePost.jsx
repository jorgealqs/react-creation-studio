import { useState, useContext} from "react"
import { Modal, Dropdown, Button, Form } from "react-bootstrap"
import axiosService from "../../helpers/axios"
import PropTypes from "prop-types"
import useUserActions from "../../hooks/user.actions"
import { Context } from "../Layout"

function UpdatePost({ post, refresh }) {

  const { setToaster } = useContext(Context)
  const userActions = useUserActions()
  const user = userActions.getUser()
  const [validated, setValidated] = useState(false)
  const [form, setForm] = useState({ body: post.body })
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function handleSubmit (event) {
    event.preventDefault()
    const createPostForm = event.currentTarget
    if (createPostForm.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    const data = {
      author: user.id,
      body: form.body,
    }

    axiosService
    .put(`/post/${post.id}/update/`, data)
    .then(() => {
      handleClose()
      setToaster({
        type: "success",
        message: "Post updated 🚀",
        show: true,
        title: "Success!",
      })
      refresh()
    })
    .catch((error) => {
      console.log(error.message)
    })
  }

  return (
    <>
      <Dropdown.Item onClick={handleShow}>
        Modify
      </Dropdown.Item>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Modify a post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                name="body"
                value={form.body}
                as="textarea"
                rows={3}
                onChange={(e) => setForm({ ...form, body: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!form.body} // Verificar si el campo body está vacío
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

UpdatePost.propTypes = {
  post: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
}

export default UpdatePost
