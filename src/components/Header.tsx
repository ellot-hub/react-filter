import {HeaderPos, HeaderTitle} from "styles/Header";
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
            <HeaderPos>
                <HeaderTitle>
                    <span>{pageName}</span>
                </HeaderTitle>
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
            </HeaderPos>
        </>
    );
}

export default Header;
