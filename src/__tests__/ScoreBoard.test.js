import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserContext from "../utils/UserContext";
import ScoreBoard from "../components/ScoreBoard";


describe('ScoreBoard Component', ()=>{
    const defaultMockData= {
        score: 0,
        lives: 3
    }
    
    const contextMockData= {
        score: 30,
        lives: 2
    }
    
    it('Render default scoreboard component', ()=>{
        render(<UserContext.Provider value={defaultMockData}>
            <ScoreBoard />
        </UserContext.Provider>)
    
        const boardEl = screen.getByTestId("score-board");
        expect(boardEl).toBeInTheDocument();
    })
    
    it('display first game score on the scoreBoard', ()=>{
        render(<UserContext.Provider value={contextMockData}>
            <ScoreBoard />
        </UserContext.Provider>)
    
        const scoreEl = screen.getByTestId("score");
        expect(scoreEl).toHaveTextContent("Score: 30");
    })
    
    it('display how many lives left on the scoreBoard', ()=>{
        render(<UserContext.Provider value={contextMockData}>
            <ScoreBoard />
        </UserContext.Provider>)
    
        const scoreEl = screen.getByTestId("lives");
        expect(scoreEl).toHaveTextContent("Lives: 2");
    })
})