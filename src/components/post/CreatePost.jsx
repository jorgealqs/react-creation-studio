import { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import axiosService from "../../helpers/axios"
import useUserActions from "../../hooks/user.actions"
import Toaster from "../Toaster"
import PropTypes from "prop-types"

function CreatePost({ refresh }){

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("")
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)
  const [form, setForm] = useState({})
  const userActions = useUserActions()
  const user = userActions.getUser()
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
    .post("/post/", data)
    .then(() => {
      handleClose()
      setToastMessage("Post created 🚀")
      setToastType("success")
      setForm({})
      setShowToast(true)
      refresh()
      setValidated(false)
    })
    .catch((error) => {
      setToastMessage("An error occurred.", error.message)
      setToastType("danger")
    })
  }


  return (
    <>
      <Form.Group className="my-3 w-75">
        <Form.Control
          className="py-2 rounded-pill border-primary text-primary"
          type="text"
          placeholder="Write a post"
          onClick={handleShow}
          style={{ cursor: 'pointer' }}
        />
      </Form.Group>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                name="body"
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary"
            onClick={handleSubmit}
            disabled={!form.body}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster
        title="Post!"
        message={toastMessage}
        showToast={showToast}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </>
  )
}

CreatePost.propTypes = {
  refresh: PropTypes.func.isRequired,
}

export default CreatePost
