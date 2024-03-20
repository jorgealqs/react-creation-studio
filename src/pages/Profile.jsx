import { useParams } from "react-router-dom"
import Layout from "../components/Layout"
import ProfileDetails from "../components/profile/ProfileDetails"
import useSWR from "swr"
import { fetcher } from "../helpers/axios"
import Post from "../components/post/Post"
import { Row, Col } from "react-bootstrap"
import PropTypes from 'prop-types' // Importa PropTypes

function Profile(props) {

  const { baseURL } = props

  const { profileId } = useParams()
  const user = useSWR(`/user/${profileId}/`, fetcher)
  const posts = useSWR(`/post/author/${profileId}/`, fetcher, {
    refreshInterval: 20000
  })

  return (
    <Layout hasNavigationBack baseURL={baseURL}>
      <Row className="justify-content-evenly">
        <Col sm={9}>
          <ProfileDetails user={user.data} baseURL={baseURL} />
          <div>
            <Row className="my-4">
              {posts.data?.results.map((post, index) => (
                <Post key={index} post={post} baseURL={baseURL} refresh={posts.mutate} isSinglePost/>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Layout>
  )
}

Profile.propTypes = {
  baseURL: PropTypes.string.isRequired, // Propiedad baseURL requerida y de tipo string
}

export default Profile
