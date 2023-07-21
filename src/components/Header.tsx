import "styles/Header.css";
import {useLocation} from "react-router-dom";

const Header = () => {
    const path = useLocation().pathname;
    const pageName = path === "/list" ? "여행 리스트" : ""

    return (
        <>
            <div className="Header">
                <span className="Header__Title">{pageName}</span>
            </div>
        </>
    );
}

export default Header;
