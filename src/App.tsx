//main app hub

import LoginForm from "./pages/LoginForm";
import { HashRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import TeacherHome from "./pages/TeacherHome";
import StudentWebcam from "./pages/StudentWebcam";
import PageNotFound from "./pages/PageNotFound";
import TeacherView from "./pages/TeacherView";
import TermsAndConditions from "./pages/TermsAndConditions";
import useUsers, { User } from "./hooks/useUsers";

const App = () => {
  const { data, loading, error } = useUsers();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/student" element={<StudentWebcam />} />
        <Route path="/teacher" element={<TeacherHome />}>
          {data.map(
            (user: User) =>
              user.userType === "student" &&
              user.terminated === false && (
                <Route
                  path={user.id.toString()}
                  key={user.id}
                  element={<TeacherView user={user} />}
                />
              )
          )}
        </Route>
        <Route path="/privacy" element={<TermsAndConditions />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
