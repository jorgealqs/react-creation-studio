import React,  { useState, useContext } from "react"
import { Button, Form, Image, Card, Dropdown } from "react-bootstrap"
import axiosService from "../../helpers/axios"
import useUserActions from "../../hooks/user.actions"
import { randomAvatar } from "../../utils"
import Toaster from "../Toaster"
import { Context } from "../Layout"
import PropTypes from "prop-types"
import { format } from "timeago.js"
import {
  MoreOutlined,
} from "@ant-design/icons"
import { Link } from "react-router-dom"
import UpdateCommnet from "../comments/UpdateCommnet"

const MoreToggleIcon = React.forwardRef(function MoreToggleIcon({ onClick }, ref) {
  return (
    <Link
      to="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      <MoreOutlined />
    </Link>
  )
})

function CreateComment(props) {
  const { postId, comments, refresh, baseURL } = props
  const [avatar, setAvatar] = useState(randomAvatar())
  const [validated, setValidated] = useState(false)
  const [form, setForm] = useState({"body":""})

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("")

  const { setToaster } = useContext(Context)
  const user = useUserActions().getUser()

  function handleSubmit (event) {
    event.preventDefault()
    const createCommentForm = event.currentTarget
    setValidated(true)
    if (createCommentForm.checkValidity() === false) {
      event.stopPropagation()
      return
    }
    const data = {
      author: user.id,
      body: form.body,
      post: postId,
    }
    axiosService
      .post(`/post/${postId}/comment/`, data)
      .then(() => {
        setToastMessage("Post created 🚀")
        setToastType("success")
        setShowToast(true)
        setForm({body: "" })
        setForm({})
        refresh()
        setValidated(false)
    })
    .catch(() => {
      setToaster({
        type: "danger",
        message: "",
        show: true,
        title: "An error occurred.!",
      })
    })
  }

  function handleDelete (comment_id) {
    axiosService
      .delete(`/post/${postId}/comment/${comment_id}/`)
      .then(() => {
        setToastMessage("Comment deleted 🚀")
        setToastType("success")
        setShowToast(true)
        refresh()
      })
      .catch((err) => {
        setToastType("danger")
        setShowToast(true)
        if (err.response && err.response.data && err.response.data.detail) {
          setToastMessage("err.response.data.detail")
        } else {
          setToastMessage("The post cannot be deleted, it already has comments..")
        }
      })
  }

  return (
    <>
      <Form
        className="d-flex flex-row justify-content-between"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Image
          src={avatar}
          roundedCircle
          width={48}
          height={48}
          className="my-2"
        />
        <Form.Group className="m-3 w-75">
          <Form.Control
            className="py-2 rounded-pill border-primary"
            type="text"
            placeholder="Write a comment"
            value={form.body || ""}
            name="body"
            onChange={(e) => setForm({ ...form, body: e.target.value || "" })}
          />
        </Form.Group>
        <div className="m-auto">
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!form.body}
            size="small"
          >
            Comment
          </Button>
        </div>
        <Toaster
          title="Post!"
          message={toastMessage}
          showToast={showToast}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      </Form>
      {comments && Array.isArray(comments) && comments.map((comment) => (
        <Card key={comment.id} className="rounded-3 my-2">
          <Card.Body>
            <Card.Title className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row">
                <Image
                  src={baseURL+comment.author.avatar}
                  roundedCircle
                  width={48}
                  height={48}
                  className="me-2 border border-primary border-2"
                />
                <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                  <p className="fs-6 m-0">
                    {comment.author.first_name}
                  </p>
                  <p className="fs-6 fw-lighter">
                    <small>{format(comment.created)}</small>
                  </p>
                </div>
              </div>
              {user.id === comment.author.id && (
                <div>
                  <Dropdown>
                    <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <UpdateCommnet postId={postId} comment={comment} refresh={refresh} />
                      <Dropdown.Item onClick={() => handleDelete(comment.id)}
                        className="text-danger">
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </Card.Title>
            <Card.Text>{comment.body}</Card.Text>
          </Card.Body>
        </Card>
      ))}

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

CreateComment.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
}

MoreToggleIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default CreateComment
