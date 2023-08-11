import "styles/Header.css";
import {useLocation} from "react-router-dom";
import {useRecoilState} from "recoil";
import {darkModeState} from "state/Atom";

const Header = () => {
    const path = useLocation().pathname;
    const pageName = path === "/list" ? "여행 리스트" : "";
    const [darkMode, setDarkMode] = useRecoilState<boolean>(darkModeState);

    const changeToggle = () => {
        setDarkMode(!darkMode)
    }

    return (
        <>
            <div className="Header">
                <div className="Header__Title">
                    <span className="Header__PageName">{pageName}</span>
                </div>
                <input type="checkbox" id="darkMode" hidden defaultChecked={darkMode} />
                <label
                    htmlFor="darkMode"
                    className="Header__Toggle"
                    onClick={
                        changeToggle
                    }
                >
                    <span className="Header__Button"></span>
                </label>
            </div>
        </>
    );
}

export default Header;
