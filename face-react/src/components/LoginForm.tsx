import React, { useEffect, useState } from "react";
import { User } from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";

//set logged in variable, which will be true throughout duration of exam. only way to revert false is by finishing exam

export var currentUser: User | undefined = {
  id: 0,
  firstName: "",
  loggedIn: false,
  userType: "",
  email: "",
  password: "",
  warnings: 0,
};

export const users: User[] = [
  {
    id: 0,
    firstName: "Marko",
    loggedIn: false,
    userType: "student",
    email: "marko@student.uts.edu.au",
    password: "password",
    warnings: 0,
  },
  {
    id: 1,
    firstName: "Sydney",
    loggedIn: false,
    userType: "staff",
    email: "sydney@staff.uts.edu.au",
    password: "hello",
    warnings: 0,
  },
  {
    id: 2,
    firstName: "Michael",
    loggedIn: false,
    userType: "student",
    email: "michael@student.uts.edu.au",
    password: "goodbye",
    warnings: 0,
  },
];

const LoginForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (
    email: string,
    password: string,
    event: React.FormEvent
  ) => {
    if (
      users.some(
        (user) =>
          user.email === email &&
          user.password === password &&
          user.userType === "student"
      )
    ) {
      currentUser = users.find((user) => user.email && user.password);
      if (currentUser !== undefined) {
        alert(`Welcome Student ${currentUser.firstName}`);
        currentUser.loggedIn = true;
      }
      navigate("/student");
    } else if (
      users.some(
        (user) =>
          user.email === email &&
          user.password === password &&
          user.userType === "teacher"
      )
    ) {
      currentUser = users.find((user) => user.email && user.password);
      if (currentUser !== undefined) {
        alert(`Welcome Teacher ${currentUser.firstName}`);
        currentUser.loggedIn = true;
      }
      navigate("/teacher");
    } else {
      alert("Invalid username or password");
    }
    event.preventDefault();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <div>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button
        onClick={(event) => {
          handleLogin(email, password, event);
        }}
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
