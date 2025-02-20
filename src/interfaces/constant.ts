
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