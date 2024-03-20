import { createContext, useState, useMemo } from "react"
import Navigationbar from "./Navbar"
import { ArrowLeftOutlined } from "@ant-design/icons"
import Toaster from "../components/Toaster"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"  // Importa PropTypes

export const Context = createContext("unknown")

function Layout(props) {

  const navigate = useNavigate()
  const { hasNavigationBack, baseURL } = props

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
        <Navigationbar baseURL={baseURL} />
        {hasNavigationBack && (
          <ArrowLeftOutlined
            style={{
              color: "#0D6EFD",
              fontSize: "24px",
              marginLeft: "5%",
              marginTop: "1%",
            }}
            onClick={() => navigate("/")}
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
  hasNavigationBack: PropTypes.bool,
  baseURL: PropTypes.string,
}

export default Layout
