export class UserDAO {
    private _nombre: string;
    private _correo: string;
    private _rol:    string;
    private _estado: boolean;
    private _google: boolean;
    private _uid:    string;
  
    constructor({nombre, correo, rol, estado, google, uid}: any) {
      this._correo = correo;
      this._nombre = nombre;
      this._rol = rol;
      this._estado = estado;
      this._google = google;
      this._uid = uid;
    }
    
    public getUid(): string {
      return this._uid;
    }
    public getNombre(): string {
      return this._nombre;
    }
    public getCorreo(): string {
      return this._correo;
    }
    public getRol(): string {
      return this._rol;
    }
    public getEstado(): boolean {
      return this._estado;
    }
    public getGoogle(): boolean {
      return this._google;
    }
  }
  