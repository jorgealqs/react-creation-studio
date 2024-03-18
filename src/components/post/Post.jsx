import React, { useState } from "react"
import PropTypes from "prop-types"
import { format } from "timeago.js"
import {
  LikeFilled,
  CommentOutlined,
  LikeOutlined,
  MoreOutlined,
} from "@ant-design/icons"
import { Image, Card, Dropdown } from "react-bootstrap"
import { randomAvatar } from "../../utils"
import Toaster from "../Toaster"
import { Link } from "react-router-dom"
import axiosService from "../../helpers/axios"
import useUserActions from "../../hooks/user.actions"
import UpdatePost from "./UpdatePost"

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

function Post({ post, refresh, isSinglePost }) {

  const user = useUserActions().getUser()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("")

  function handleLikeClick (action) {
    axiosService
      .post(`/post/${post.id}/${action}/`)
      .then(() => {
        refresh()
      })
      .catch((err) => console.error(err))
  }

  function handleDelete () {
    axiosService
      .delete(`/post/${post.id}/delete/`)
      .then(() => {
        setToastMessage("Post deleted 🚀")
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
      <Card className="rounded-3 my-4">
        <Card.Body>
          <Card.Title className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <Image
                src={randomAvatar()}
                roundedCircle
                width={48}
                height={48}
                className="me-2 border border-primary border-2"
              />
              <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                <p className="fs-6 m-0">{post.author.first_name}</p>
                <p className="fs-6 fw-lighter">
                  <small>{format(post.created)}</small>
                </p>
              </div>
            </div>
            {user.id === post.author.id && (
              <div>
                <Dropdown>
                  <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <UpdatePost post={post} refresh={refresh} />
                    <Dropdown.Item onClick={handleDelete} className="text-danger">
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Card.Title>
          <Card.Text>{post.body}</Card.Text>
          <div className="d-flex flex-row">
            <LikeFilled
              style={{
                color: "#fff",
                backgroundColor: "#0D6EFD",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                fontSize: "75%",
                padding: "2px",
                margin: "3px",
              }}
            />
            <p className="ms-1 fs-6">
              <small>{post.likes_count} like</small>
            </p>
          </div>
        </Card.Body>
        <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">
          <div className="d-flex flex-row">
            <LikeOutlined
              style={{
                width: "24px",
                height: "24px",
                padding: "2px",
                fontSize: "20px",
                color: post.liked ? "#0D6EFD" : "#C4C4C4",
              }}
              onClick={() => {
                if (post.liked) {
                  handleLikeClick("remove_like")
                } else {
                  handleLikeClick("like")
                }
              }}
            />
            <p className="ms-1">
              <small>Like</small>
            </p>
          </div>
          {!isSinglePost && (
            <div className="d-flex flex-row">
              <CommentOutlined
                style={{
                  width: "24px",
                  height: "24px",
                  padding: "2px",
                  fontSize: "20px",
                  color: "#C4C4C4",
                }}
              />
              <p className="ms-1 fs-6">
              <small>
                <Link to={`/post/${post.id}/comments/`}>
                  {post.comments_count} comments
                </Link>
              </small>
              </p>
            </div>
          )}
        </Card.Footer>
      </Card>
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

Post.propTypes = {
  post: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
  isSinglePost: PropTypes.bool.isRequired,
}

MoreToggleIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Post
