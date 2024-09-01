import { UserMenu } from "../../UserArea/UserMenu/UserMenu";
import "./Header.css";

export function Header(): JSX.Element {
    return (
        <div className="Header">
            <UserMenu />
			<h1 className="animation">Northwind Traders</h1>
        </div>
    );
}
