import { useForm } from "react-hook-form";
import "./Login.css";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../Services/UserService";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { notify } from "../../../Utils/notify";
import { NavLink } from "react-router-dom";

export function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<CredentialsModel>();
  const navigate = useNavigate();

  async function send(credentials: CredentialsModel) {
    try {
      await userService.login(credentials);
      notify.success("Welcome back!");
      navigate("/vacations");
    } catch (err: any) {
      const errorMessage = errorHandler.getError(err);
      notify.error(errorMessage);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(send)}>
        <label>Email: </label>
        <input type="email" {...register("email")} />

        <label>Password: </label>
        <input type="password" {...register("password")} />

        <button className="login">Login</button>

        <div>
          don't have account?
          <div>
            <NavLink to={"/register"}>register now</NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}
