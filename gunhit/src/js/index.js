import {Renderer} from './Renderer'
import {Resources} from './Resources'
import {Background} from './Background'
import {Weapon} from './game/Weapon'

window.onload = () => {

    const resources = window.resources = Resources()

    const startGame = () => {
        const stats = new Stats()
        document.body.appendChild(stats.dom)

        const renderer = Renderer()
        renderer.addObject(Background())

        renderer.addObject(Weapon())


        let time = Date.now()
        const gameLoop = () => {
            stats.begin()
            
            let dt = (Date.now() - time) / 1000
            time = Date.now()

            renderer.update(dt)
            requestAnimationFrame(gameLoop)
            stats.end()
        }

        requestAnimationFrame(gameLoop)
    }

    resources.add('digest', 'assets/digest.json').load(() => {
        resources.getJSON('digest').assets.forEach(asset => {
            resources.add(asset.alias, asset.path)
        })
        resources.load(startGame)
    })
}