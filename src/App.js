import {Route, Switch} from "react-router-dom";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
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
                <Route exact
                       path='/'
                       render={(routeProps) =>
                           <PaletteList palettes={seedPalettes} {...routeProps}/>
                       }
                />
                <Route
                    exact
                    path='/palette/:id'
                    render={(routeProps) =>
                        <Palette palette={generatePalette(findPalette(routeProps.match.params.id))}/>}
                />
                <Route
                    exact
                    path='/palette/:paletteID/:colorID'
                    render={(routeProps) =>
                        <SingleColorPalette />}
                />
            </Switch>
            {/*<Palette palette={generatePalette(seedPalettes[0])}/>*/}
        </div>
    );
}


export default App;
