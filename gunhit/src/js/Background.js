import {IVisual} from './behaviours/Base'
import {IAdoptable} from './behaviours/Adoptable'
import {RENDER_LAYER} from './Renderer'

export const Background = () => {

    const self = {}

    Object.assign(self, IVisual(
        'background', 
        {x:1,y:1}, 
        {x: 0.5, y: 0.5},
        RENDER_LAYER.BACKGROUND
    ))

    Object.assign(self, IAdoptable(
        self.visual, 
        {x: 'center', y: 'middle'}, 
        true)
    )

    return self
}