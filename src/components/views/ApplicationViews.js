import { Route, Routes} from "react-router-dom"
import { Login } from "../auth/Login"
import { BoardView } from "../Job-boards/Board"
import { BoardEdit } from "../Job-boards/BoardEdit"
import { BoardForm } from "../Job-boards/BoardForm"
import { JobForm } from "../Job-boards/JobForm"
import { Dashboard } from "../Job-boards/Dashboard"
import { IndividualJobDetails } from "../Job-boards/IndividualJobDetails"
import { Authorized } from "./Authorized"


export const ApplicationViews = ({token, setToken}) => {
    return<>
    <Routes>
        <Route element={<Authorized token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />}   />
        <Route path="/" element={<Dashboard />}  />
        <Route path="/boards/:id" element={<BoardView />}  />
        <Route path="/createboard" element={<BoardForm />}  />
        <Route path="/:boardId/createJob" element={<JobForm />}  />
        <Route path="/boards/:id/edit" element={<BoardEdit />}  />
        <Route path="/boards/:boardId/jobs/:jobId" element={<IndividualJobDetails />}  />
    </Routes>
    </>
}