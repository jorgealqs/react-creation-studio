import { useState } from "react"
import { Button, Modal, Form, Dropdown } from "react-bootstrap"
import axiosService from "../../helpers/axios"
import PropTypes from "prop-types"

function UpdateComment(props) {

  const { postId, comment, refresh } = props
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [form, setForm] = useState({
    // author: comment.author.id,
    body: comment.body,
    // post: postId
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const createCommentForm = event.currentTarget
    setValidated(true)
    if (createCommentForm.checkValidity() === false) {
      event.stopPropagation()
      return
    }
    axiosService
      .put(`/post/${postId}/comment/${comment.id}/`, form)
      .then(() => {
        setForm({body: form.body })
        handleClose()
        refresh()
    })
    .catch(() => {
      console.log("Error submitting")
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

UpdateComment.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
}

export default UpdateComment