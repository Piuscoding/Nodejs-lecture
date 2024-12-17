const fs = require('fs')

function person(name,callbackFn ){
    console.log(`hello ${name}`)
    callbackFn()
}

function address(){
    console.log('nigeria')
}

person("piusCoding", address)

fs.readFile('input.txt', 'utf8', (err, data)=>{
    if(err){
        console.log("Error reading file",err)
        return
    }
    console.log(data)
})