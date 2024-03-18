import { createContext, useState, useMemo } from "react"
import PropTypes from "prop-types"  // Importa PropTypes para la validación de tipo
import Navigationbar from "./Navbar"
import { ArrowLeftOutlined } from "@ant-design/icons"
import Toaster from "../components/Toaster"
import { useNavigate } from "react-router-dom"

export const Context = createContext("unknown")

function Layout(props) {

  const navigate = useNavigate()
  const { hasNavigationBack } = props

  const [toaster, setToaster] = useState({
    title: "",
    show: false,
    message: "",
    type: "",
  })

  const value = useMemo(() => ({ toaster, setToaster }), [toaster])

  return (
    <Context.Provider value={value}>
      <div>
        <Navigationbar />
        {hasNavigationBack && (
          <ArrowLeftOutlined
            style={{
              color: "#0D6EFD",
              fontSize: "24px",
              marginLeft: "5%",
              marginTop: "1%",
            }}
            onClick={() => navigate(-1)}
          />
        )}
        <div className="container my-2">{props.children}</div>
        <Toaster
          title={toaster.title}
          message={toaster.message}
          type={toaster.type}
          showToast={toaster.show}
          onClose={() => setToaster({ ...toaster, show: false })}
        />
      </div>
    </Context.Provider>
  )
}

// Agrega validación de tipo para children utilizando PropTypes
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
