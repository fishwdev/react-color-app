import {Route, Switch} from "react-router-dom";
import Palette from "./Palette";
import seedPalettes from "./seedPalettes";
import {generatePalette} from "./colorHelper";
import './App.css';

function App() {
    function findPalette(id) {
        return seedPalettes.find((palette) => {
            return palette.id === id;
        })
    }

    return (
        <div className="App">
            <Switch>
                <Route exact path='/' render={() => <h1>/ goes here</h1>}/>
                <Route exact path='/palette/:id' render={(routeProps) =>
                    <Palette palette={generatePalette(findPalette(routeProps.match.params.id))}/>}
                />
            </Switch>
            <Palette palette={generatePalette(seedPalettes[0])}/>
        </div>
    );
}


export default App;
