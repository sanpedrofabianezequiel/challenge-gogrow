import {Request,Response} from 'express';


export const validarArchivoSubir = (req:Request,res:Response,next:any)=>{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json('No files were uploaded.');
        return;
      }
    next();
}