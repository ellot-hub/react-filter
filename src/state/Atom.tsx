import { atom } from "recoil";
import {loadLocal, saveLocal} from "utils/Utils";

export const darkModeState = atom<boolean>({
    key: "darkModeState",
    default: false,
    effects: [
        ({ setSelf, onSet }) => {
            const initial = loadLocal<boolean>("darkMode");
            // setSelf: atom 값 설정 혹은 재설정
            if(initial) setSelf(initial);
            // onSet: atom 변화가 감지될 때 작동, storage 에 데이터 저장
            // setSelf 에 의해서는 작동X
            onSet((newValue, ) => {
                saveLocal<boolean>("darkMode", newValue);
            })
        }
    ]
})