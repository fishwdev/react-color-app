import {useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Page from "./Page";
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

    function deletePalette(id) {
        setPalettes(prevPalettes => (
            prevPalettes.filter(palette => palette.id !== id)
        ));
    }

    function findPalette(id) {
        return palettes.find((palette) => {
            return palette.id === id;
        });
    }

    function savePalette(newPalette) {
        setPalettes([...palettes, newPalette]);
    }

    return (
        <div className="App">
            <Route render={({location}) => (
                <TransitionGroup>
                    <CSSTransition classNames='page' key={location.key} timeout={500}>
                        <Switch location={location}>
                            <Route exact
                                   path='/palette/new'
                                   render={(routeProps) => (
                                       <Page>
                                           <NewPaletteForm savePalette={savePalette}
                                                           palettes={palettes}
                                                           {...routeProps}
                                           />
                                       </Page>
                                   )}
                            />
                            <Route exact
                                   path='/'
                                   render={(routeProps) => (
                                       <Page>
                                           <PaletteList deletePalette={deletePalette}
                                                        palettes={palettes}
                                                        {...routeProps}
                                           />
                                       </Page>
                                   )}
                            />
                            <Route
                                exact
                                path='/palette/:id'
                                render={(routeProps) => (
                                    <Page>
                                        <Palette palette={generatePalette(findPalette(routeProps.match.params.id))}/>
                                    </Page>
                                )}
                            />
                            <Route
                                exact
                                path='/palette/:paletteId/:colorId'
                                render={(routeProps) => (
                                    <Page>
                                        <SingleColorPalette
                                            colorId={routeProps.match.params.colorId}
                                            palette={generatePalette(findPalette(routeProps.match.params.paletteId))}/>
                                    </Page>
                                )}
                            />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )}/>
        </div>
    );
}


export default App;
