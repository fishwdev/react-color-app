import {useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import seedPalettes from "./seedPalettes";
import {generatePalette} from "./colorHelper";
import './App.css';

function App() {

    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));

    const[palettes, setPalettes] = useState(savedPalettes || seedPalettes);

    useEffect(() => {
        function syncLocalStorage() {
            // save palettes to local storage
            window.localStorage.setItem('palettes', JSON.stringify(palettes));
        }
        syncLocalStorage();
    }, [palettes])

    function findPalette(id) {
        return palettes.find((palette) => {
            return palette.id === id;
        })
    }

    function savePalette(newPalette) {
        setPalettes([...palettes, newPalette]);
    }

    return (
        <div className="App">
            <Switch>
                <Route exact
                       path='/palette/new'
                       render={(routeProps) =>
                           <NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps}/>
                       }
                />
                <Route exact
                       path='/'
                       render={(routeProps) =>
                           <PaletteList palettes={palettes} {...routeProps}/>
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
