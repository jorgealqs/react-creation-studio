import { useParams } from "react-router-dom"
import useSWR from "swr"
import Layout from "../components/Layout"
import UpdateProfileForm from "../components/forms/UpdateProfileForm"
import { fetcher } from "../helpers/axios"
import { Row, Col } from "react-bootstrap"
import PropTypes from 'prop-types' // Importa PropTypes


function EditProfile(props) {
  const { baseURL } = props
  const { profileId } = useParams()
  const profile = useSWR(`/user/${profileId}/`, fetcher)
  return (
    <Layout hasNavigationBack baseURL={baseURL}>
      {profile.data ? (
        <Row className="justify-content-evenly">
          <Col sm={9}>
            <UpdateProfileForm profile={profile.data} baseURL={baseURL} />
          </Col>
        </Row>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  )
}

EditProfile.propTypes = {
  baseURL: PropTypes.string.isRequired, // Propiedad baseURL requerida y de tipo string
}

export default EditProfile