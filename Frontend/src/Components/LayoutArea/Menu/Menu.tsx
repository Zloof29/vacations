import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export function Menu(): JSX.Element {
  const [token, setToken] = useState<string | null>(null);
  const user = useSelector((state: AppState) => state.user);
  const admin = useSelector(
    (state: AppState) => state.user && state.user.roleId === 1
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [token, user]);

  return (
    <div className="Menu">
      <Stack direction="row" spacing={2}>
        {token && user ? (
          <NavLink to="/vacations">
            <Button>Vacations</Button>
          </NavLink>
        ) : (
          <></>
        )}

        {admin ? (
          <NavLink to="/new-vacation">
            <Button>Add Vacation</Button>
          </NavLink>
        ) : (
          <></>
        )}

        {token && user && user.roleId === 2 ? (
          <>
            <NavLink to="/likedVacations">
              <Button>Liked vacations</Button>
            </NavLink>
            <NavLink to="/activeVacations">
              <Button>Active vacations</Button>
            </NavLink>
            <NavLink to="/InActiveVacations">
              <Button>Unactive vacations</Button>
            </NavLink>
          </>
        ) : (
          <></>
        )}

        {token && user && user.roleId === 1 ? (
          <>
            <NavLink to="/activeVacations">
              <Button>Active vacations</Button>
            </NavLink>
            <NavLink to="/InActiveVacations">
              <Button>Unactive vacations</Button>
            </NavLink>
            <NavLink to="/report">
              <Button>Reports</Button>
            </NavLink>
          </>
        ) : (
          <></>
        )}
      </Stack>
    </div>
  );
}
