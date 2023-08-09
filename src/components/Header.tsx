import "styles/Header.css";
import {useLocation} from "react-router-dom";

const Header = () => {
    const path = useLocation().pathname;
    const pageName = path === "/list" ? "여행 리스트" : ""

    return (
        <>
            <div className="Header">
                <div className="Header__Title">
                    <span className="Header__PageName">{pageName}</span>
                </div>
                <input type="checkbox" id="toggle" hidden />
                <label
                    htmlFor="toggle"
                    className="Header__Toggle"
                >
                    <span className="Header__Button"></span>
                </label>
            </div>
        </>
    );
}

export default Header;
