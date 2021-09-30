const fireHeight = 50;
const fireWidth = 50;
const fireSpeed = 50; //Refresh of fire propagation
const fireColors = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
const bla = 12345
let fireArray = [];
let fireIntensity = 3;
let fireRoot = 36;
let fireDirection = 0;
let extraSmoke = 0;
var skeleton = false; // Render/debug

controller();

function controller() {
    createDataStructure(); //Initialize the fire Array
    setFireRoot(); //Create a fire combustion, setting the base of the fire
    setInterval(calculateFirePropagation, fireSpeed); //Calculation and refresh of the fire animation
}

function createDataStructure() {
    const fireArrayLenght = fireWidth * fireHeight;

    for( i = 0; i < fireArrayLenght; i++ ) {
        fireArray[i] = 0;
    }
}

function setFireRoot() {
    const lastRow = fireWidth * fireHeight - ( fireWidth ); //Start of the last row
    
    for(i = lastRow; i <= fireArray.length - 1; i++) { //Iterate through the last row and set the fire root
        fireArray[i] = fireRoot;
    }
}

function calculateFirePropagation() {
    for( let row = 0; row < fireHeight; row++ ) {

        for( let col = 0; col < fireWidth; col++ ) {
            let thisIterationPixelIndex = col + ( fireWidth * row );
            calculatePixelPropagation(thisIterationPixelIndex);
        }
    }

    renderFire(fireArray);
}

function calculatePixelPropagation(pixelIndex) {
    let decay = Math.floor(Math.random() * fireIntensity); //Define an integer value between ( 0 or 1 multiply by intensity ), intensity is inversely proporcional, how greater the value, less intense will be the fire.
    let bottomPixel = pixelIndex + fireWidth;
    if(fireDirection === 0) {

        let newPixelValue = fireArray[bottomPixel] - decay < 0 ? extraSmoke : fireArray[bottomPixel] - decay; 
        if( bottomPixel < fireArray.length && pixelIndex >= fireIntensity ) { //Verify if it's a valid pixel
            fireArray[pixelIndex - decay] = newPixelValue;
        }
    }
}

function renderFire(fireArray) {
    let html = '<table>';

    for( let row = 0; row < fireHeight; row++ ) {
        html += '<tr>';

        for( let col = 0; col < fireWidth; col++ ) {
            let pixelIndex = col + ( fireWidth * row );

            if( skeleton ) {
                html += `<td><span class="pixel-index">${ pixelIndex }</span> ${ fireArray[pixelIndex] }</td>`
            } else {
                let pixelValue = fireArray[pixelIndex];
                html += `<td class="pixel" style="background-color: rgb(${fireColors[pixelValue].r},${fireColors[pixelValue].g},${fireColors[pixelValue].b});"></td>`;
            }
        }

        html += '</tr>';
    }

    html += '</table>';
    document.getElementById('FireTable').innerHTML = html;
}

// HTML buttons

function changeSmoke(signal) {
    if( extraSmoke >= 0 || extraSmoke <= 10) {
        if( signal === '+' ) {
            extraSmoke++;
        } else {
            extraSmoke--;
        }
    }

    if( extraSmoke < 0 ) {
        extraSmoke = 0;
    }
    if( extraSmoke > 10 ) {
        extraSmoke = 10;
    }

    console.log('Smoke intensity = ' + extraSmoke);
}

function changeFire(signal) {
    if( fireIntensity > 1 || fireIntensity <= 100) {
        if( signal === '-' ) {
            if(fireIntensity > 9){
                fireIntensity += 10;
            } else {
                fireIntensity++;
            }
        } else {
            if(fireIntensity > 10) {
                fireIntensity -= 10;
            } else {
                fireIntensity--;
            }
        }
    }

    if( fireIntensity < 2 ) {
        fireIntensity = 2;
    }
    if( fireIntensity > 100 ) {
        fireIntensity = 100;
    }

    console.log('Fire intensity = ' + fireIntensity);
}

function changeRoot(signal) {
    if( fireRoot >= 0 || fireRoot <= 36) {
        if( signal === '+' ) {
            fireRoot++;
        } else {
            fireRoot--;
        }
    }

    if( fireRoot < 0 ) {
        fireRoot = 0;
    }
    if( fireRoot > 36 ) {
        fireRoot = 36;
    }

    setFireRoot();

    console.log('Root intensity = ' + fireRoot);
}