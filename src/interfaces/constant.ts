
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

  export enum EnType {
    Create = "Create",
    Update = "Update",
    Delete = "Delete",
    View = "View",
    Close = "Close",
  }