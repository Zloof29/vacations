import { useForm } from "react-hook-form";
import "./Register.css";
import { UserModel } from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";

export function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await userService.register(user);
            notify.success("Welcome " + user.firstName);
            navigate("/home");
        }
        catch(err: any) {
            notify.error(errorHandler.getError(err));
        }
    }

    return (
        <div className="Register">
            
            <form onSubmit={handleSubmit(send)}>

                <label>First name: </label>
                <input type="text" {...register("firstName")} />

                <label>Last name: </label>
                <input type="text" {...register("lastName")} />

                <label>Email: </label>
                <input type="email" {...register("email")} />

                <label>Password: </label>
                <input type="password" {...register("password")} />

                <button>Register</button>

            </form>
        </div>
    );
}
