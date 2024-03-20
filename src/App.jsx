import {
  Route,
  Routes
} from "react-router-dom"
import ProtectedRoute from "./routes/ProtectedRoute"
import Home from "./pages/Home"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import SinglePost from "./pages/SinglePost"
import Panel from "./pages/Test"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"

function App() {
  const baseURL = "http://localhost:8000"
  return (
    <Routes>
      <Route path="/"
        element={
        <ProtectedRoute>
          <Home baseURL={baseURL} />
        </ProtectedRoute>
      } />
      <Route
        path="post/:postId/comments/"
        element={
          <ProtectedRoute>
            <SinglePost baseURL={baseURL} />
          </ProtectedRoute>
        }
      />
      <Route
        path="test/"
        element={
          <ProtectedRoute>
            <Panel baseURL={baseURL}/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:profileId/"
        element={
        <ProtectedRoute>
          <Profile baseURL={baseURL} />
        </ProtectedRoute>
        }
      />

      <Route
        path="/profile/:profileId/edit/"
        element={
          <ProtectedRoute>
            <EditProfile baseURL={baseURL} />
          </ProtectedRoute>
        }
      />


      <Route path="/login/" element={<Login />} />
      <Route path="/register/" element={<Registration />}/>
    </Routes>
  )
}

export default App
