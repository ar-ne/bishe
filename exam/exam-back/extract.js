const models = require('./openapi.json').components.schemas;

let lines = '';

Object.keys(models).forEach(k => {
    const model=models[k];
    const requires=model.required
    const properties=model.properties;
    Object.keys(properties).forEach(p=>{
        let line=`${k}\t${p}\t${properties[p].type}\t`;
        if(requires) line+=`${requires.includes(p)?'是':'否'}\n`;
        else line+='否\n';
        lines+=line
    })
})

const fs=require('fs');
fs.writeFileSync('output.txt',lines);

