import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from '../App';
import {UserContextProvider} from '../utils/UserContext';
import BricksBreakerGame from '../components/BricksBreakerGame';

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

describe("Load Main Pain", ()=>{
  it('render App Component', () => {
    render(
      <UserContextProvider>
        <App />
      </UserContextProvider>
      );
    const el = screen.getByTestId("app");
    expect(el).toBeInTheDocument();
  });

  it('render BricksBreakerGame Component', ()=>{
    render(
      <UserContextProvider>
        <BricksBreakerGame />
      </UserContextProvider>
    )

    const el = screen.getByTestId("bricks-game");
    expect(el).toBeInTheDocument();
  })
  
})
