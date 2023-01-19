import { Route, Routes } from "react-router-dom";
import { Login } from "../auth/Login";
import { BoardView } from "../Job-boards/Board";
import { BoardEdit } from "../Job-boards/BoardEdit";
import { BoardForm } from "../Job-boards/BoardForm";
import { JobForm } from "../Job-boards/JobForm";
import { Dashboard } from "../Job-boards/Dashboard";
import { IndividualJobDetails } from "../Job-boards/IndividualJobDetails";
import { Authorized } from "./Authorized";
import { JobEdit } from "../Job-boards/JobEdit";
import { ManageTags } from "../Job-boards/ManageBoardTags";
import { Register } from "../auth/Register";
import { InterviewPrep } from "../interviews/InterviewPrepHome";
import { IndividualInterviewDetails } from "../interviews/InterviewDetails";
import { InterviewForm } from "../interviews/InterviewForm";
import { ContactForm } from "../network/AddContact";
import { ContactEdit } from "../network/ContactEdit";
import { ResourceNotFound } from "../errorPages/NotFound";
import { UserProfile } from "../profile/UserProfile";
import { NetworkHome } from "../network/NetworkHome";
import { BoardManager } from "../Job-boards/ManageBoard";
import { InterviewEdit } from "../interviews/InterviewEdit";
import { IndividualContact } from "../network/IndividualContact";

// Seeker Views Component handles the routes for an authorized seeker (regular-non admin user)

export const SeekerViews = ({ token, setToken }) => {
  return (
    <Routes>
      <Route path="*" element={<ResourceNotFound />} />
      <Route element={<Authorized token={token} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/boards/:boardId" element={<BoardView />} />

      <Route path="/createboard" element={<BoardForm />} />
      <Route
        path="/boards/:boardId/jobs/:jobId/managetags"
        element={<ManageTags />}
      />
      <Route path="/boards/:id/edit" element={<BoardEdit />} />
      <Route path="/:boardId/createjob" element={<JobForm />} />
      <Route
        path="/boards/:boardId/jobs/:jobId/editjob"
        element={<JobEdit />}
      />
      <Route
        path="/boards/:boardId/jobs/:jobId"
        element={<IndividualJobDetails />}
      />
      <Route path="/interviewprep" element={<InterviewPrep />} />
      <Route
        path="/interviews/:interviewId"
        element={<IndividualInterviewDetails />}
      />
      <Route path="jobs/:jobId/createinterview" element={<InterviewForm />} />
      <Route path="/createcontact" element={<ContactForm />} />
      <Route path="/network/contact/:contactId" element={<ContactEdit />} />
      <Route path="/editinterview/:interviewId" element={<InterviewEdit />} />
      <Route path="/network" element={<NetworkHome />} />
      <Route path="/contacts/:contactId" element={<IndividualContact />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/boardmanager" element={<BoardManager />} />
    </Routes>
  );
};
