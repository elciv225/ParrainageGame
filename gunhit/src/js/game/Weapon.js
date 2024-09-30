import {IVisual} from '../behaviours/Base'
import {IAdoptable} from '../behaviours/Adoptable'
import {RENDER_LAYER} from '../Renderer'

export const Weapon = () => {

    const self = {}

    Object.assign(self, IVisual(
        'weapon',
        {x: 512, y: 512},
        {x: 0.5, y: 1},
        RENDER_LAYER.GAME
    ))

    Object.assign(self, IAdoptable(
        self.visual,
        {x: 'center', y: 'bottom', yOffset: -100} //todo: make y-offset streched
    ))

    return self
}