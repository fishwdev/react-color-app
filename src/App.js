import {Route, Switch} from "react-router-dom";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
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
                       path='/palette/new'
                       render={(routeProps) =>
                           <NewPaletteForm />
                       }
                />
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
                    path='/palette/:paletteId/:colorId'
                    render={(routeProps) =>
                        <SingleColorPalette
                            colorId={routeProps.match.params.colorId}
                            palette={generatePalette(findPalette(routeProps.match.params.paletteId))}/>}
                />
            </Switch>
        </div>
    );
}


export default App;
