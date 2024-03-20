import { Link } from "react-router-dom"
import RegistrationForm from "../components/forms/RegistrationForm"

function Registration() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 p-5">
          <RegistrationForm />
        </div>
      </div>
    </div>
  )
}

export default Registration
