require('dotenv').config()

const gulp = require('gulp')
const connect = require('gulp-connect')
const fs = require('fs')

gulp.task('concat-greensock-libraries', () => {

    const stream = gulp.src([
            'src/lib/gs/TweenLite.min.js',
            'src/lib/gs/EasePack.min.js',
            'src/lib/gs/PixiPlugin.min.js',
            'src/lib/gs/RoundPropsPlugin.min.js'
        ])

    return stream.pipe(require('gulp-concat')('TweenLite.js'))
        .pipe(gulp.dest('src/lib'))
})

gulp.task('concat-all-libraries', ['concat-greensock-libraries'], () => {

    gulp.src(['src/lib/*.js', '!src/lib/stats.js'])
        .pipe(require('gulp-concat')('libraries.release.js'))
        .pipe(gulp.dest('src'))

    return gulp.src(['src/lib/*.js'])
        .pipe(require('gulp-concat')('libraries.development.js'))
        .pipe(gulp.dest('src'))
})


gulp.task('connect', () => {
    return connect.server({
        host: process.env.HOST,
        root: 'build/',
        port: process.env.PORT,
        livereload: true
    })
})

gulp.task('prepare-build-directory', () => {
    const rimraf = require('rimraf')
    if (fs.existsSync('build/')) {
        rimraf.sync('build')
    }

    fs.mkdirSync('build/')
})

gulp.task('webpack', () => {
    const stream = require('webpack-stream')
    const webpack2 = require('webpack')

    const config = {
        module: {
            rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                query: { presets: ['env'] }
            }]
        },
        output: { filename: 'bundle.js' }
    }

    if (process.env.MODE === 'development') {
        config.mode = 'development'
        config.devtool = 'source-map'
    } else {
        config.mode = 'production'
    }

    return gulp.src('src/js/**/*')
        .pipe(stream(config, webpack2))
        .pipe(gulp.dest('build/'))
})

gulp.task('process-assets', () => {
    const assetList = []
    const iterateFolder = (rootPath, path) => {
        fs.readdirSync(path).forEach(fsEntry => {
            if (fs.lstatSync(`${path}/${fsEntry}`).isDirectory()) {
                iterateFolder(rootPath, `${path}/${fsEntry}`)
            } else {
                const relativePath = `${path}/${fsEntry}`.replace(rootPath, '')
                const alias = relativePath.replace('/', '_')
                    .replace(/(\.jpg$|\.png$|\.json$)/, '')
                assetList.push({alias: alias, path: `assets/${relativePath}`})
            }
        })
    }
    iterateFolder(`${process.cwd()}/assets/`, `${process.cwd()}/assets`)

    fs.mkdirSync('build/assets')
    fs.writeFileSync('build/assets/digest.json', 
        JSON.stringify({assets: assetList}, null, 2))

    return gulp.src('assets/**/*').pipe(gulp.dest('build/assets'))
})

const regularTasks = [
    'prepare-build-directory', 'deploy-static', 
    'webpack', 'process-assets']

gulp.task('deploy-static', () => {
    fs.copyFileSync('src/index.html', 'build/index.html')
    fs.copyFileSync(`src/libraries.${process.env.MODE}.js`, 'build/libraries.js')
})

gulp.task('reload', regularTasks, () => {
    return gulp.src(['src/**/*']).pipe(connect.reload())
})

gulp.task('watch', () => {
    gulp.watch(['src/**/*'], ['reload'])
})

gulp.task('default', ['connect'].concat(regularTasks).concat(['watch']))

gulp.task('buildbot-default', ['concat-all-libraries'], () => {
    gulp.start('default')
})

gulp.task('buildbot-run', () => {
    if (fs.existsSync('./bbprocess')) {
        const prevProcess = fs.readFileSync('./bbprocess', {encoding: 'utf-8'})
        try { 
            process.kill(parseInt(prevProcess))
            console.log(`process ${prevProcess} terminated`)
        } catch (e) {
            console.log(`process ${prevProcess} does not exist`)
        }
    }

    fs.writeFileSync('./.env', 'MODE=development\nPLATFORM=standalone\nHOST=0.0.0.0\nPORT=8083')
    fs.writeFileSync('./bbprocess', process.pid.toString())
    gulp.start('buildbot-default')
})