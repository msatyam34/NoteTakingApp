const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body)=>{
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=> note.title===title)
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))

    } else{
        console.log(chalk.red.inverse('Note title taken!'))
    }


    
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json',JSON.stringify(notes))

}

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch(e){
        return []
    }
    

}

const removeNote = (title)=>{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=>note.title!== title)

    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
    

}

const listNotes = () => {
    const notes = loadNotes()
    console.log('Your notes are:')
    notes.forEach(note => {
        console.log(note.title)
    });

}

const readNote = (title)=>{
    const notes = loadNotes()
    const note = notes.find((note)=> note.title===title)
    
    if(note){
        console.log('Title: '+ note.title +', Body: '+ note.body)
    } else {
        console.log('No note is there with the given title ')
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote

}