(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var pixi_js_legacy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js-legacy */ \"./node_modules/pixi.js-legacy/dist/esm/pixi-legacy.js\");\n/* harmony import */ var wasm_zip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wasm-zip */ \"./node_modules/wasm-zip/wasm_zip.js\");\n\r\n\r\n\r\nconst app = new pixi_js_legacy__WEBPACK_IMPORTED_MODULE_0__[\"Application\"]({\r\n    width: 320,\r\n    height: 320,\r\n    backgroundColor: 0xF49097,\r\n    resolution: 1,\r\n    forceCanvas: true\r\n});\r\n\r\nconst graphics = new pixi_js_legacy__WEBPACK_IMPORTED_MODULE_0__[\"Graphics\"]();\r\n\r\nconst spotText = new pixi_js_legacy__WEBPACK_IMPORTED_MODULE_0__[\"Text\"]('Click to place spots!');\r\nspotText.x = 16;\r\nspotText.y = 16;\r\n\r\napp.stage.addChild(spotText);\r\n\r\ndocument.getElementById(\"pixi-container\").appendChild(app.view);\r\n\r\napp.renderer.plugins.interaction.on(\"pointerdown\", onCanvasClicked);\r\n\r\nfunction onCanvasClicked(pointerEvent) {\r\n    const clickPosition = pointerEvent.data.global;\r\n\r\n    graphics.beginFill(0x55D6C2);\r\n    graphics.drawCircle(clickPosition.x - 4, clickPosition.y - 4, 4);\r\n    graphics.endFill();\r\n    app.stage.addChild(graphics);\r\n}\r\n\r\ndocument.getElementById(\"generate-zip-button\").onclick = onGenerateZipClicked;\r\n\r\nasync function onGenerateZipClicked() {\r\n    document.getElementById(\"generate-zip-button\").innerText = \"Generating...\";\r\n\r\n    let canvasUint8Array = await getCanvasUint8Array();\r\n    let pageImageUint8Array = await getImageUint8Array();\r\n\r\n    let directoryMap = {\r\n        \"UserText.txt\": getTextValue(),\r\n        \"UserCanvas.png\": canvasUint8Array,\r\n        \"PageImage.jpg\": pageImageUint8Array\r\n    };\r\n\r\n    const zipBlob = new Blob([wasm_zip__WEBPACK_IMPORTED_MODULE_1__[\"generate_zip_binary\"](directoryMap)], {\r\n        type: \"application/zip;charset=utf-8\"\r\n    });\r\n\r\n    let zipBlobUrl = window.URL.createObjectURL(zipBlob);\r\n\r\n    document.getElementById(\"downloadLink\").download = `MyGeneratedArchive-${new Date().toLocaleTimeString()}.zip`;\r\n    document.getElementById(\"downloadLink\").href = zipBlobUrl;\r\n    document.getElementById(\"download-link-box\").style.display = \"block\";\r\n\r\n    document.getElementById(\"generate-zip-button\").innerText = \"Generate Zip!\";\r\n}\r\n\r\nasync function getImageUint8Array() {\r\n    const imageElementUrl = document.getElementById(\"random-image\").src;\r\n\r\n    let imageResponse = await fetch(imageElementUrl);\r\n    let imageArrayBuffer = await imageResponse.arrayBuffer();\r\n\r\n    return new Uint8Array(imageArrayBuffer);\r\n}\r\n\r\nfunction getTextValue() {\r\n    return document.getElementById(\"custom-text\").value;\r\n}\r\n\r\nasync function getCanvasUint8Array() {\r\n    const canvasElement = document.getElementById(\"pixi-container\").firstElementChild;\r\n    return new Promise((resolve) => {\r\n        canvasElement.toBlob(async (canvasBlob) => {\r\n            const imageArrayBuffer = await canvasBlob.arrayBuffer();\r\n            resolve(new Uint8Array(imageArrayBuffer));\r\n        });\r\n    });\r\n}\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

}]);