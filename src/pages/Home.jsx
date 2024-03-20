import Layout from "../components/Layout"
import { Row, Col, Image } from "react-bootstrap"
import { randomAvatar } from "../utils"
import useSWR from "swr"
import { fetcher } from "../helpers/axios"
import Post from "../components/post/Post"
import useUserActions from "../hooks/user.actions"
import CreatePost from "../components/post/CreatePost"
import ProfileCard from "../components/profile/ProfileCard"
import PropTypes from 'prop-types' // Importa PropTypes

function Home(props) {

  const { baseURL } = props

  const posts = useSWR("/post/", fetcher, {
    refreshInterval: 10000,
  })

  const profiles = useSWR("/user/?limit=8", fetcher)

  const user = useUserActions().getUser()
  if (!user) {
    return <div>Loading!</div>
  }

  return (
    <Layout baseURL={baseURL}>
      <Row className="justify-content-evenly">
        <Col sm={7}>
          <Row className="border rounded
            align-items-center">
            <Col className="flex-shrink-1">
              <Image
                src={randomAvatar()}
                roundedCircle
                width={52}
                height={52}
                className="my-2"
              />
            </Col>
            <Col sm={10} className="flex-grow-1">
              <CreatePost refresh={posts.mutate} />
            </Col>
          </Row>
          <Row className="my-4">
            {posts.data?.results.map((post, index) => (
              <Post
                key={index}
                post={post}
                refresh={posts.mutate}
                baseURL={baseURL}
                isSinglePost={false}
              />
            ))}
          </Row>
        </Col>
        <Col sm={3} className="border rounded py-4 h-50">
          <h4 className="font-weight-bold text-center">
            Suggested people
          </h4>
          <div className="d-flex flex-column">
            {profiles.data && profiles.data.map((profile, index) => (
              <ProfileCard key={index} user={profile} baseURL={baseURL} />
            ))}
          </div>
        </Col>
      </Row>
    </Layout>
  )
}

Home.propTypes = {
  baseURL: PropTypes.string.isRequired, // Propiedad baseURL requerida y de tipo string
}

export default Home