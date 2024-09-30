
export const RENDER_LAYER = {
    BACKGROUND: 'BACKGROUND', 
    GAME: 'GAME', 
    UI: 'UI'
}

export const Renderer = () => {

    const stage = new PIXI.Container()
    const layers = {}
    Object.keys(RENDER_LAYER).forEach(layer => {
        layers[layer] = new PIXI.Container()
        stage.addChild(layers[layer])
    })

    const canvas = document.getElementById('gameCanvas')
    const renderer = PIXI.autoDetectRenderer({
        roundPixels: true,
        width: 400,
        height: 400,
        view: canvas,
        backgroundColor: 0xCCCCCC,
        resolution: 1,
        forceFXAA: false,
        autoResize: false
    })

    const baseVirtualSize = {x: 720, y: 1280}
    const supposedAspectRatio = baseVirtualSize.x / baseVirtualSize.y
    const maximumWideAR = 1
    let currentAspectRatio = 0
    let canvasW = 0, canvasH = 0
    const currentVirtualSize = {x: 0, y: 0}

    const resizableChildren = []

    const resizeCanvas = (newW, newH) => {
        canvasW = newW; canvasH = newH

        currentAspectRatio = canvasW / canvasH
        renderer.resize(canvasW, canvasH)

        if (currentAspectRatio > supposedAspectRatio) { 
            //
            //wide screen
            const actualWidth = Math.ceil(baseVirtualSize.y * currentAspectRatio)
            stage.scale.x = stage.scale.y = canvasH / baseVirtualSize.y

            currentVirtualSize.x = Math.min(baseVirtualSize.y * maximumWideAR, actualWidth)
            currentVirtualSize.y = baseVirtualSize.y

            if (canvasW > canvasH * maximumWideAR) {
                stage.x = Math.round((canvasW - (canvasH * maximumWideAR))/2)
            } else {
                stage.x = 0
            }
        } else {
            //
            // tall screen
            stage.scale.x = stage.scale.y = canvasW / baseVirtualSize.x
            stage.x = 0
            currentVirtualSize.x = baseVirtualSize.x
            currentVirtualSize.y = Math.ceil(baseVirtualSize.x / currentAspectRatio)
        }

        resizableChildren.forEach(child => {
            child.adopt(
                Math.min(currentAspectRatio, maximumWideAR), 
                    supposedAspectRatio, 
                    currentVirtualSize, 
                    baseVirtualSize, 
                    maximumWideAR
                )
        })
    }
    resizeCanvas(baseVirtualSize.x, baseVirtualSize.y)

    const self = {
        addObject: go => {
            if (typeof go.adopt !== 'undefined') {
                resizableChildren.push(go)
                go.adopt(
                    Math.min(currentAspectRatio, maximumWideAR), 
                    supposedAspectRatio, 
                    currentVirtualSize, 
                    baseVirtualSize, 
                    maximumWideAR
                )
            }
            const parent = layers[go.parent]
            if (parent) {
                parent.addChild(go.visual)
            }
        },
        removeObject: go => {
            if (typeof go.adopt !== 'undefined') {
                resizableChildren.splice(resizableChildren.indexOf(go), 1)
            }

            const parent = layers[go.parent]
            if (parent) {
                parent.removeChild(go.visual)
            }
        },
        update: dt => {
            const currentCanvasW = Math.max(window.innerWidth || 0, document.documentElement.clientWidth)
            const currentCanvasH = Math.max(window.innerHeight || 0, document.documentElement.clientHeight)
            if (currentCanvasW !== canvasW || currentCanvasH !== canvasH) {
                resizeCanvas(currentCanvasW, currentCanvasH)
            }
            renderer.render(stage)
        }
    }

    return self
}