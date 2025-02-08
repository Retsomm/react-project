import { createContext, useEffect, useReducer } from "react";
import { login_failure, login_success, logout, start_login } from "../constants/actionTypes";

// 嘗試從 localStorage 讀取 user 資料
const getUserFromStorage = () => {
    try {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("localStorage 內的 user 數據格式錯誤，已重置為 null:", error);
        localStorage.removeItem("user");
        return null;
    }
};

// 初始狀態
const INITIAL_STATE = {
    user: getUserFromStorage(),
    loading: false,
    error: null
};

export const LoginContext = createContext(INITIAL_STATE);

const LoginReducer = (state, action) => {
    switch (action.type) {
        case start_login:
            return { user: null, loading: true, error: null };
        case login_success:
            return { user: action.payload, loading: false, error: null };
        case login_failure:
            return { user: null, loading: false, error: action.payload };
        case logout:
            return { user: null, loading: false, error: null };
        default:
            return state;
    }
};

export const LoginContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(LoginReducer, INITIAL_STATE);

    // 檢查 state.user 的變化，確保 localStorage 正確同步
    useEffect(() => {
        console.log("LoginContext state.user 更新:", state.user);
        if (state.user) {
            try {
                localStorage.setItem("user", JSON.stringify(state.user));
            } catch (error) {
                console.error("localStorage 設定 user 時出錯:", error);
            }
        } else {
            localStorage.removeItem("user");
        }
    }, [state.user]);

    return (
        <LoginContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};
