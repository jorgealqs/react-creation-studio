import { Toast, ToastContainer } from "react-bootstrap"
import PropTypes from "prop-types"

function Toaster(props) {
  const { showToast, title, message, onClose, type } = props
  return (
    <ToastContainer position="top-center">
      <Toast onClose={onClose} show={showToast} delay={3000} autohide bg={type}>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>
          <p className="text-white">{message}</p>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

Toaster.propTypes = {
  showToast: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

export default Toaster
