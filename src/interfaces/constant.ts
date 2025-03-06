
 export interface IColumn{
    header:string,
    accessor:string,
    className?:string,
  
  }

  export interface ISearchOptions extends IColumn{
    dataType?:string,
    options?:IColumn[],
  
  }

  export interface IDataResponse{
  success:boolean,
  data: object[];
  }
  export enum EnMode{
    Create = "Create",
    Update = "Update",
  }

  export enum EnType {
    Create = "Create",
    Update = "Update",
    Delete = "Delete",
    View = "View",
    Close = "Close",
  }

  export interface IContextMenu{
    key:string;
    name?:string;
    className?:string;
    isSeparator?:boolean;
    children?:IContextMenu[];

  }

  export interface IField{
    name:string,
    type:string,
    placeholder?:string,
    label?:string,
    errorMessage?:string,
    required?:boolean,
    pattern?:string,
    min?:number,
  }

  export interface ILable{
    key:string;
    label:string;
    icon:string;
  }

  export interface IApplicationDetailItemProps{
    title:string; value:string; icon:string;}