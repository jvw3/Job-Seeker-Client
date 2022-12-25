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
import { InterviewPrep } from "../interviews/InterviewPrepHome";
import { IndividualInterviewDetails } from "../interviews/InterviewDetails";
import { InterviewForm } from "../interviews/InterviewForm";
import { NetworkHome } from "../network/NetworkHome";
import { HomePageLanding } from "./HomePageLanding";
import { HomePageAbout } from "./HomePageAbout";

export const UnauthorizedViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/" element={<HomePageLanding setToken={setToken} />} />
        <Route path="/about" element={<HomePageAbout setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
      </Routes>
    </>
  );
};
