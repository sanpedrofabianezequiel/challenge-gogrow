import path from "path";
import { v4 as uuidv4 } from 'uuid';

export const subirArchivo = async (files:any,extensionesPemitida = ['png','jpg','jpeg','gif'],carpeta='')=>{

    return new Promise((resolve,reject)=>{
        const{archivo} = files;
        const nombreCortado = archivo.name.split('.');
        console.log(nombreCortado);
        const extension = nombreCortado[nombreCortado.length - 1];
        if(!extensionesPemitida.includes(extension)){
            return reject(`La extension ${extension} no es pemitida, solo se admiten ${extensionesPemitida}`);
        }
    
    
    
        const nameEnd =  uuidv4()+'.'+extension;
        const uploadPath = path.join(__dirname ,'../uploads/',carpeta , nameEnd);
        
        archivo.mv(uploadPath, function(err:any) {//muevo el archivo con un nuevo nombre
          if (err) {
              console.log(err);
              return reject(err)
          }
      
            //resolve(uploadPath);
            resolve(nameEnd);
        });
    })
  
}

