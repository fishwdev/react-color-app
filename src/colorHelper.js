import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePallete(pallete) {
    let newPallete = {
        name: pallete.paletteName,
        id: pallete.id,
        emoji: pallete.emoji,
        colors: {}
    };

    for (let level of levels) {
        newPallete.colors[level] = [];
    }

    for (let color of pallete.colors) {
        let colorScale = generateScale(color.color, 10).reverse();
        for (let i in colorScale) {
            newPallete.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, '-'),
                hex: colorScale[i],
                rgb: chroma(colorScale[i]).css(),
                rgba: chroma(colorScale[i])
                    .css()
                    .replace('rgb', 'rgba')
                    .replace(')', ',1.0)')
            });
        }
    }

    return newPallete;
}

// originally thought of from black - color - white, but it was found too dark
// .darken(1.4) makes it dark, but not that black
function getRange(hexColor) {
    const endColor = "#fff";
    return [
        chroma(hexColor).darken(1.4).hex(),
        hexColor,
        endColor
    ];
}

function generateScale(hexColor, numOfColors) {
    return chroma
        .scale(getRange(hexColor))
        .mode('lab')
        .colors(numOfColors);

}

export {generatePallete};