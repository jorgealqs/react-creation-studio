import LoginForm from "../components/authentication/LoginForm"

function Login(){
  return(
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-10 p-5 mt-5">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login
