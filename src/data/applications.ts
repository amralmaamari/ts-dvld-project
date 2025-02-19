export interface Iapplication {
    ApplicationID: number;
    ApplicationDate: string;
    ApplicationStatus: number;
    LastStatusDate: string;
    PaidFees: number;
    UserName: string;
    ApplicationTypeTitle: string;
    ApplicantName: string;
    PersonID: number;
}

export interface IapplicationResponse {
    success:boolean,
    applications:Iapplication[],
}

export const Applications:IapplicationResponse = {
    // 20250216173737
    // https://run.mocky.io/v3/b86f0447-fb27-4c03-8e65-ed71574c03f0
  
    success: true,
    applications: [
      {
        ApplicationID: 110,
        ApplicationDate: "2023-10-07 10:46:17.370",
        ApplicationStatus: 3,
        LastStatusDate: "2023-10-07 11:05:08.973",
        PaidFees: 15.0,
        UserName: "Msaqer77",
        ApplicationTypeTitle: "New Local Driving License Service",
        ApplicantName: "Mohammed Saqer Mussa Abu-Hadhoud",
        PersonID: 1,
      },
      {
        ApplicationID: 113,
        ApplicationDate: "2023-10-07 11:07:05.810",
        ApplicationStatus: 3,
        LastStatusDate: "2023-10-07 11:08:12.973",
        PaidFees: 15.0,
        UserName: "Msaqer77",
        ApplicationTypeTitle: "New Local Driving License Service",
        ApplicantName: "Khalid ALi Maher hamed",
        PersonID: 1025,
      },
      {
        ApplicationID: 117,
        ApplicationDate: "2023-10-07 11:31:43.170",
        ApplicationStatus: 3,
        LastStatusDate: "2023-10-07 11:31:43.170",
        PaidFees: 5.0,
        UserName: "Msaqer77",
        ApplicationTypeTitle: "Retake Testss",
        ApplicantName: "Mohammed Saqer Mussa Abu-Hadhoud",
        PersonID: 1,
      },
    ],
  };