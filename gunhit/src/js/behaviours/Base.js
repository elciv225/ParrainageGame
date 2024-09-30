
export const IVisual = (t, size, anchor, layer) => {
    const s = new PIXI.Sprite(window.resources.getTexture(t))
    s.width = size.x; s.height = size.y
    s.anchor.x = anchor.x; s.anchor.y = anchor.y

    return {
        get parent() { return layer },
        get visual() { return s }
    }
}