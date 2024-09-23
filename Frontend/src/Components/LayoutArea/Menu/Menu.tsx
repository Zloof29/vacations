import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Menu.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { useEffect, useState } from "react";

export function Menu(): JSX.Element {
  const [token, setToken] = useState<string | null>(null);
  const user = useSelector((state: AppState) => state.user);
  const admin = useSelector(
    (state: AppState) => state.user && state.user.roleId === 1
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (
      !user &&
      (location.pathname === "/vacations" ||
        location.pathname === "/new-vacation")
    ) {
      navigate("/login");
    }
  }, [token, user, navigate, location.pathname]);

  return (
    <div className="Menu">
      {/* <NavLink to="/home">Home</NavLink> */}
      {token && user ? (
        <NavLink to="/vacations">Vacations</NavLink>
      ) : (
        <NavLink to="/login">Vacations</NavLink>
      )}

      {admin && <NavLink to="/new-vacation">Add Vacation</NavLink>}

      {user && user.roleId === 2 ? (
        <>
          <NavLink to="/likedVacations">Liked vacations</NavLink>
          <NavLink to="/activeVacations">Active vacations</NavLink>
          <NavLink to="/InActiveVacations">Unactive vacations</NavLink>
        </>
      ) : (
        <></>
      )}

      {user && user.roleId === 1 ? (
        <>
          {/* <NavLink to="/likedVacations">Liked vacations</NavLink> */}
          <NavLink to="/activeVacations">Active vacations</NavLink>
          <NavLink to="/InActiveVacations">Unactive vacations</NavLink>
        </>
      ) : (
        <></>
      )}

      <NavLink to="/about">About</NavLink>
    </div>
  );
}
