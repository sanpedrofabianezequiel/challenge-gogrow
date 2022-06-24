import {Request,Response} from 'express';

const esAdminRole = (req : any, resp: Response, next : any)=>{

    //usuario deberia haber sido validado y agregado en la request
    //este usuario consultado con el modelo mongoose tiene toda la informacion apra consultar.
    if(!req.usuario){
        return resp.status(500).json({msg:'Se requiere verificar el rol sin VALIDAR el token PRIMERO'});
    }
    
    const {rol,nombre} = req.usuario;
    if(rol !== 'ADMIN_ROLE'){
        return resp.status(401).json({
            msg:`El ${nombre} no es adminitrador para hace esto`
        })   
    }

    next();
}

const tieneRole = (...rest:any[])=>{

    return  (req : any, resp: Response, next : any)=>{
        if(!req.usuario){
            return resp.status(500).json({msg:'Se requiere verificar el rol sin VALIDAR el token PRIMERO'});
        }
        
        if(!rest.includes( req.usuario.rol)){
            return resp.status(401).json({msg:`El servicio requiere uno de los roles : ${rest}`})
        }
        
        next();
    }

}


export {
    esAdminRole,
    tieneRole
}