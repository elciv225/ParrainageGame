import {MathUtil} from '../utils/MathUtil'

export const IAdoptable = (visual, pivotRules, stretch = false) => {
    return {
        adopt: (currentAr, supposedAr, currentVirtualSize, virtualSize, maxAr) => {

            if (stretch) {
                if (currentAr > supposedAr) { // wide screen
                    visual.width = currentVirtualSize.x
                    visual.scale.y = visual.scale.x
                } else { // tall screen
                    visual.height = currentVirtualSize.y
                    visual.scale.x = visual.scale.y
                }
            }

            if (pivotRules !== null) {
                const xPivot = pivotRules.x
                let xOffset = typeof pivotRules.xOffset === 'undefined' ? 0 : pivotRules.xOffset
                const xOffsetMin = typeof pivotRules.xOffsetMin === 'undefined' ? xOffset : pivotRules.xOffsetMin
                const xOffsetMax = typeof pivotRules.xOffsetMax === 'undefined' ? xOffsetMin : pivotRules.xOffsetMax
                xOffset = MathUtil.lerp(xOffsetMin, xOffsetMax, Math.max(0, (virtualSize.y*currentAr - virtualSize.x)) / (virtualSize.y*maxAr - virtualSize.x))
                if (typeof xPivot === 'string') {
                    if (xPivot === 'center') {
                        visual.x = currentVirtualSize.x/2
                        visual.x += xOffset
                    }
                    if (xPivot === 'left') {
                        visual.x = 0
                        visual.x += xOffset
                    }
                    if (xPivot === 'right') {
                        visual.x = currentVirtualSize.x
                        visual.x -= xOffset
                    }
                }

                const yPivot = pivotRules.y
                const yOffset = typeof pivotRules.yOffset === 'undefined' ? 0 : pivotRules.yOffset
                if (typeof  yPivot === 'string') {
                    if (yPivot === 'middle') {
                        visual.y = currentVirtualSize.y/2
                        visual.y += yOffset
                    }
                    if (yPivot === 'top') {
                        visual.y = 0
                        visual.y += yOffset
                    }
                    if (yPivot === 'bottom') {
                        visual.y = currentVirtualSize.y
                        visual.y -= yOffset
                    }
                }
            }
        }
    }
}