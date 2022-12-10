import { Route, Routes} from "react-router-dom"
import { Login } from "../auth/Login"
import { BoardView } from "../Job-boards/Board"
import { BoardEdit } from "../Job-boards/BoardEdit"
import { BoardForm } from "../Job-boards/BoardForm"
import { Dashboard } from "../Job-boards/Dashboard"
import { IndividualJobDetails } from "../Job-boards/IndividualJobDetails"


export const ApplicationViews = ({token, setToken}) => {
    return<>
    <Routes>
        <Route path="/login" element={<Login setToken={setToken} />}   />
        <Route path="/" element={<Dashboard />}  />
        <Route path="/boards/:id" element={<BoardView />}  />
        <Route path="/createboard" element={<BoardForm />}  />
        <Route path="/boards/:id/edit" element={<BoardEdit />}  />
        <Route path="/boards/:boardId/jobs/:jobId" element={<IndividualJobDetails />}  />
    </Routes>
    </>
}