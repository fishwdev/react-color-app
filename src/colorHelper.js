import chroma from 'chroma-js';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(palette) {
    let newPalette = {
        name: palette.paletteName,
        id: palette.id,
        emoji: palette.emoji,
        colors: {},
        colorFormats: [
            {
                format: 'hex',
                description: 'HEX — #FFFFFF'
            },
            {
                format: 'rgb',
                description: 'RGB — rgb(255, 255, 255)'
            },
            {
                format: 'rgba',
                description: 'RGBA — rgba(255, 255, 255, 1.0)'
            }
        ]
    };

    for (let level of levels) {
        newPalette.colors[level] = [];
    }

    for (let color of palette.colors) {
        let colorScale = generateScale(color.color, 10).reverse();
        for (let i in colorScale) {
            newPalette.colors[levels[i]].push({
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

    return newPalette;
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

export {generatePalette};