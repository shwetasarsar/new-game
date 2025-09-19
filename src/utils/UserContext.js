import { createContext, useState } from "react";

const UserContext = createContext();

export const UserContextProvider =({children})=>{
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [isPaused, setIsPaused] = useState(false);

    const contextData= {
        score,
        lives,
        isPaused,
        setScore,
        setLives,
        setIsPaused
    }

    return(
        <UserContext.Provider value={contextData}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContext;
