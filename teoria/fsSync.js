import fs from "fs"

// create a file
fs.writeFileSync('./ejemplo.txt', "dentro del archivo")

if(fs.existsSync('./ejemplo.txt')){// true false
    let content = fs.readFileSync('./ejemplo.txt', 'utf8') // utf8: decode reading type
    
    console.log(content)
    //append more content
    fs.appendFileSync("./ejemplo.txt", "Mas contenido")
    content= fs.readFileSync('./ejemplo.txt', 'utf8') // utf8: decode reading type
    console.log(content)

    // delete file
    fs.unlinkSync('./ejemplo.txt')
}
