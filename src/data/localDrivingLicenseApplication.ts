export interface ILocalDrivingLicenseApplication {
    LocalDrivingLicenseApplicationID: number;
    ApplicationID: number;
    LicenseClassID: number;
    ApplicantPersonID: number;
    ApplicationDate: string; // ISO 8601 date format
    ApplicationTypeID: number;
    ApplicationStatus: string;
    LastStatusDate: string;
    PaidFees: number;
    CreatedByUserID: number;
    PassedTest:number;
}
  
  export interface ILocalDrivingLicenseApplicationResponse {
      success:boolean,
      drivingLicenseApplicationInfo:ILocalDrivingLicenseApplication,
  }
  export interface ILocalDrivingLicenseApplicationResponses {
    success:boolean,
    drivingLicenseApplicationInfo:ILocalDrivingLicenseApplication[],
}


 export const LocalDrivingLicenseApplicationData:ILocalDrivingLicenseApplicationResponses={
    "success": true,
    "drivingLicenseApplicationInfo": [
    {
      "LocalDrivingLicenseApplicationID": 3068,
      "ApplicationID": 110,
      "LicenseClassID": 1,
      "ApplicantPersonID": 5001,
      "ApplicationDate": "2025-02-07T18:13:34.850Z",
      "ApplicationTypeID": 2,
      "ApplicationStatus": "New",
      "LastStatusDate": "2025-02-07T18:45:00.000Z",
      "PaidFees": 15.0,
      "CreatedByUserID": 1001,
      "PassedTest":2,
    },
    {
      "LocalDrivingLicenseApplicationID": 3067,
      "ApplicationID": 113,
      "LicenseClassID": 3,
      "ApplicantPersonID": 5002,
      "ApplicationDate": "2025-02-07T18:05:16.290Z",
      "ApplicationTypeID": 1,
      "ApplicationStatus": "Completed",
      "LastStatusDate": "2025-02-07T18:50:00.000Z",
      "PaidFees": 20.0,
      "CreatedByUserID": 1002,
      "PassedTest":2,
    },
    {
      "LocalDrivingLicenseApplicationID": 3066,
      "ApplicationID": 117,
      "LicenseClassID": 4,
      "ApplicantPersonID": 5003,
      "ApplicationDate": "2025-02-07T18:03:08.090Z",
      "ApplicationTypeID": 3,
      "ApplicationStatus": "Pending",
      "LastStatusDate": "2025-02-07T19:00:00.000Z",
      "PaidFees": 10.0,
      "CreatedByUserID": 1003,
      "PassedTest":2,
    }
  ]
  };