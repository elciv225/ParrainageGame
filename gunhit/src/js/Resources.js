
export const Resources = () => {

    const loader = PIXI.loader
    const resources = loader.resources

    const self = {
        add: (alias, path) => {
            loader.add(alias, path)
            return self
        },
        load: (onComplete) => {
            loader.load(onComplete)
            return self
        },
        getTexture: alias => {
            if (alias in resources) return resources[alias].texture
            console.warn(`texture ${alias} was replaced with default texture`)
            return resources.pixel.texture
        },
        getJSON: alias => {
            if (alias in resources) return resources[alias].data
            throw 'Cannot find JSON with alias ', alias
        },
        getText: alias => {
            if (alias in resources) return resources[alias].data
            throw 'Cannot find TEXT with alias ', alias
        },
        getAnimation: alias => {
            if (alias in resources) return resources[alias].data.frames
            throw 'Cannot find ANIMATION DESCRIPTOR with alias ', alias
        }
    }
    return self
}