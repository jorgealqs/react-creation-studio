import Layout from "../components/Layout"
import { Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import useSWR from "swr"
import { fetcher } from "../helpers/axios"
import Post from "../components/post/Post"
import CreateComment from "../components/comments/CreateComment"
// import Comment from "../components/comments/Comment"
import PropTypes from 'prop-types' // Importa PropTypes

function SinglePost(props) {

  const { baseURL } = props

  let { postId } = useParams()
  const post = useSWR(`/post/${postId}/`, fetcher)
  const comments = useSWR(`/post/${postId}/comment/`, fetcher)

  return (
    <Layout hasNavigationBack baseURL={baseURL}>
      {post.data ? (
        <Row className="justify-content-center">
          <Col sm={8}>
            <Post post={post.data} refresh={post.mutate} isSinglePost baseURL={baseURL} />
            {comments.data && <CreateComment postId={post.data.id} comments={comments.data} refresh={comments.mutate} baseURL={baseURL} />}
          </Col>
        </Row>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  )
}

SinglePost.propTypes = {
  baseURL: PropTypes.string, // Propiedad baseURL requerida y de tipo string
}

export default SinglePost
