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
import { ManageBoardCategories } from "../Job-boards/ManageBoardCategories";
import { Register } from "../auth/Register";
import { HomePageLanding } from "./HomePageLanding";
import { InterviewPrep } from "../interviews/InterviewPrepHome";
import { IndividualInterviewDetails } from "../interviews/InterviewDetails";
import { InterviewForm } from "../interviews/InterviewForm";
import { NetworkHome } from "../network/NetworkHome";
import { ContactForm } from "../network/AddContact";
import { ContactEdit } from "../network/EditContact";
import { ResourceNotFound } from "../errorPages/NotFound";
import { InterviewPrepForm } from "../interviews/InterviewPrepForm";
import { UserProfile } from "../../profile/UserProfile";

export const ApplicationViews = ({ token, setToken }) => {
  return (
          <Routes>
            <Route path="*" element={<ResourceNotFound />} />
            <Route element={<Authorized token={token} />} />
            <Route
              path="/register"
              element={<Register setToken={setToken} />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/boards/:id" element={<BoardView />} />
            <Route
              path="boards/:boardId/managecategories"
              element={<ManageBoardCategories />}
            />
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
            <Route path="/createinterview" element={<InterviewForm />} />
            <Route path="/createinterviewprep" element={<InterviewPrepForm />} />
            <Route path="/createcontact" element={<ContactForm />} />
            <Route
              path="/network/contact/:contactId"
              element={<ContactEdit />}
            />
            <Route
              path="/editinterview/:interviewId"
              element={<InterviewForm />}
            />
            <Route path="/network" element={<NetworkHome />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
  );
};
