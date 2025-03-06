export interface IListApplicationType {
    ApplicationTypeID: number;
    ApplicationTypeTitle: string;
    ApplicationFees: number;
}

export interface IListApplicationTypeResponse {
    success:boolean,
    applicationTypes:IListApplicationType[],
}
export const ListApplicationTypesData:IListApplicationTypeResponse  =
  // 20250217215755
  // https://run.mocky.io/v3/b98f1c52-8a89-49ba-9756-053981c73a05
  {
    "success": true,
    "applicationTypes": [
      {
        "ApplicationTypeID": 1,
        "ApplicationTypeTitle": "New Local Driving License Service",
        "ApplicationFees": 15.0
      },
      {
        "ApplicationTypeID": 2,
        "ApplicationTypeTitle": "Renew Driving License Service",
        "ApplicationFees": 7.0
      },
      {
        "ApplicationTypeID": 3,
        "ApplicationTypeTitle": "Replacement for a Lost Driving License",
        "ApplicationFees": 10.0
      },
      {
        "ApplicationTypeID": 4,
        "ApplicationTypeTitle": "Replacement for a Damaged Driving License",
        "ApplicationFees": 5.0
      },
      {
        "ApplicationTypeID": 5,
        "ApplicationTypeTitle": "Release Detained Driving License",
        "ApplicationFees": 15.0
      },
      {
        "ApplicationTypeID": 6,
        "ApplicationTypeTitle": "New International License",
        "ApplicationFees": 5.0
      },
      {
        "ApplicationTypeID": 7,
        "ApplicationTypeTitle": "Retake Tests",
        "ApplicationFees": 5.0
      }
    ]
  }
  ;
