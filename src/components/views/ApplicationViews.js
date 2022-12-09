import { Route, Routes} from "react-router-dom"
import { Login } from "../auth/Login"
import { Dashboard } from "../Job-boards/Dashboard"


export const ApplicationViews = ({token, setToken}) => {
    return<>
    <Routes>
        <Route path="/login" element={<Login setToken={setToken} />}   />
        <Route path="/" element={<Dashboard />}  />
    </Routes>
    </>
}