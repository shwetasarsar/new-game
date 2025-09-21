import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom";
import UserContext from "../utils/UserContext";
import ButtonActions from "../components/ButtonActions";

beforeAll(()=>{
    HTMLCanvasElement.prototype.getContext =()=>{
      return{
        clearReact: jest.fn(),
        fillRect: jest.fn(),
        beginPath: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        closePath: jest.fn()
      }
    }
})

describe('Button Action Component', ()=>{

    const contextMockData= {
        score: 0,
        lives: 3,
        isPaused: false,
        setScore: jest.fn(),
        setLives: jest.fn(),
        setIsPaused: jest.fn()
    }

    const resetGame = jest.fn();

    it('Load Pause Button', ()=>{
        render(<UserContext.Provider value={contextMockData}>
            <ButtonActions />
        </UserContext.Provider>)

        const btnEl = screen.getByRole("button", {name: 'Pause'})
        expect(btnEl).toBeInTheDocument();
    })

    it('Load Resume Button', ()=>{
        render(<UserContext.Provider value={{...contextMockData, isPaused: true}}>
            <ButtonActions />
        </UserContext.Provider>)

        const btnEl = screen.getByRole("button", {name: 'Resume'})
        expect(btnEl).toBeInTheDocument();
    })

    it('Load Start Button', ()=>{
        render(<UserContext.Provider value={contextMockData}>
            <ButtonActions />
        </UserContext.Provider>)

        const btnEl = screen.getByRole("button", {name: 'Start'})
        expect(btnEl).toBeInTheDocument();
    })

    it('Load Restart Button', ()=>{
        render(<UserContext.Provider value={contextMockData}>
            <ButtonActions />
        </UserContext.Provider>)

        const btnEl = screen.getByRole("button", {name: 'Restart'})
        expect(btnEl).toBeInTheDocument();
    })

    it('Restart the game', ()=>{
        render(<UserContext.Provider value={contextMockData}>
            <ButtonActions reStart={resetGame}/>
        </UserContext.Provider>)

        const restartBtn = screen.getByRole("button", {name: "Restart"});

        fireEvent.click(restartBtn);

        expect(restartBtn).toBeInTheDocument();
        expect(contextMockData.setIsPaused).toHaveBeenCalledTimes(1);
        expect(contextMockData.setScore).toHaveBeenCalledTimes(1);
        expect(contextMockData.setLives).toHaveBeenCalledTimes(1);
        expect(resetGame).toHaveBeenCalledTimes(1);
    })

    it('Pause the game', ()=>{
        render(<UserContext.Provider value={contextMockData}>
            <ButtonActions />
        </UserContext.Provider>)

        const pauseBtnEl = screen.getByRole("button", {name: 'Pause'});

        fireEvent.click(pauseBtnEl);

        expect(pauseBtnEl).toBeInTheDocument();
        expect(contextMockData.setIsPaused).toHaveBeenCalledTimes(1)
    })

    it('Resume the game', ()=>{
        render(<UserContext.Provider value={contextMockData}>
            <ButtonActions />
        </UserContext.Provider>)

        const resumeBtnEl = screen.getByRole("button", {name: 'Pause'});

        fireEvent.click(resumeBtnEl);

        expect(resumeBtnEl).toBeInTheDocument();
        expect(contextMockData.setIsPaused).toHaveBeenCalledTimes(1)
    })

    it('Start the game', ()=>{
        render(<UserContext.Provider value={contextMockData}>
            <ButtonActions reStart={resetGame}/>
        </UserContext.Provider>)

        const startBtnEl = screen.getByRole("button", {name: 'Start'});

        fireEvent.click(startBtnEl);

        expect(startBtnEl).toBeInTheDocument();
        expect(contextMockData.setIsPaused).toHaveBeenCalledTimes(1);
        expect(contextMockData.setScore).toHaveBeenCalledTimes(1)
        expect(contextMockData.setLives).toHaveBeenCalledTimes(1)
        expect(resetGame).toHaveBeenCalledTimes(1);
    })

})