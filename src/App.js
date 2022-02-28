import './App.css';
import Palette from "./Palette";
import seedPalettes from "./seedPalettes";
import {generatePalette} from "./colorHelper";

function App() {
  return (
    <div className="App">
      <Palette palette={generatePalette(seedPalettes[0])}/>
    </div>
  );
}

export default App;
