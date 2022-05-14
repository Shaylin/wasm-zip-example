import * as PIXI from "pixi.js-legacy";
import * as wasm from "wasm-zip";

const app = new PIXI.Application({
    width: 320,
    height: 320,
    backgroundColor: 0xF49097,
    resolution: window.devicePixelRatio || 1,
    forceCanvas: true
});

const graphics = new PIXI.Graphics();

const spotText = new PIXI.Text('Click to place spots!');
spotText.x = 16;
spotText.y = 16;

app.stage.addChild(spotText);

document.getElementById("pixi-container").appendChild(app.view);

app.renderer.plugins.interaction.on("pointerdown", onCanvasClicked);

function onCanvasClicked(pointerEvent) {
    const clickPosition = pointerEvent.data.global;

    graphics.beginFill(0x55D6C2);
    graphics.drawCircle(clickPosition.x - 4, clickPosition.y - 4, 4);
    graphics.endFill();
    app.stage.addChild(graphics);
}

document.getElementById("generate-zip-button").onclick = onGenerateZipClicked;

async function onGenerateZipClicked() {
    document.getElementById("generate-zip-button").innerText = "Generating...";

    let canvasUint8Array = await getCanvasUint8Array();
    let pageImageUint8Array = await getImageUint8Array();

    let directoryMap = {
        "UserText.txt": getTextValue(),
        "UserCanvas.png": canvasUint8Array,
        "PageImage.jpg": pageImageUint8Array
    };

    const zipBlob = new Blob([wasm.generate_zip_binary(directoryMap)], {
        type: "application/zip;charset=utf-8"
    });

    let zipBlobUrl = window.URL.createObjectURL(zipBlob);

    document.getElementById("downloadLink").download = `MyGeneratedArchive-${new Date().toLocaleTimeString()}.zip`;
    document.getElementById("downloadLink").href = zipBlobUrl;
    document.getElementById("download-link-box").style.display = "block";

    document.getElementById("generate-zip-button").innerText = "Generate Zip!";
}

async function getImageUint8Array() {
    const imageElementUrl = document.getElementById("random-image").src;

    let imageResponse = await fetch(imageElementUrl);
    let imageArrayBuffer = await imageResponse.arrayBuffer();

    return new Uint8Array(imageArrayBuffer);
}

function getTextValue() {
    return document.getElementById("custom-text").value;
}

async function getCanvasUint8Array() {
    const canvasElement = document.getElementById("pixi-container").firstElementChild;
    return new Promise((resolve) => {
        canvasElement.toBlob(async (canvasBlob) => {
            const imageArrayBuffer = await canvasBlob.arrayBuffer();
            resolve(new Uint8Array(imageArrayBuffer));
        });
    });
}