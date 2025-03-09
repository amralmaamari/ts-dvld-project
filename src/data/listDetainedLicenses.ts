export interface IDetainedLicenses {
    DetainID: number;
    LicenseID: number;
    DetainDate: string;
    IsReleased: number;
    FineFees: number ;
    ReleaseDate: string | null;
    NationalNo: string ;
    FullName: string ;
    ReleaseApplicationID: number | null ;
  }
  
  export interface IDetainedLicensesResponses {
      success:boolean,
      detainedLicenses:IDetainedLicenses[],
  }

  export const ListDetainedLicensesData:IDetainedLicensesResponses = {
    "success": true,
    "detainedLicenses":[
        {
          "DetainID": 14,
          "LicenseID": 27,
          "DetainDate": "2023-10-10 09:23:00",
          "IsReleased": 0,
          "FineFees": 300.00,
          "ReleaseDate": null,
          "NationalNo": "N10",
          "FullName": "Mahmoud Omar Ali Almajed",
          "ReleaseApplicationID": null
        },
        {
          "DetainID": 15,
          "LicenseID": 32,
          "DetainDate": "2024-05-08 10:51:00",
          "IsReleased": 0,
          "FineFees": 1.00,
          "ReleaseDate": null,
          "NationalNo": "N10",
          "FullName": "Mahmoud Omar Ali Almajed",
          "ReleaseApplicationID": null
        },
        {
          "DetainID": 12,
          "LicenseID": 27,
          "DetainDate": "2023-10-10 09:17:00",
          "IsReleased": 1,
          "FineFees": 150.00,
          "ReleaseDate": "2023-10-10 09:20:00",
          "NationalNo": "N10",
          "FullName": "Mahmoud Omar Ali Almajed",
          "ReleaseApplicationID": 130
        },
        {
          "DetainID": 13,
          "LicenseID": 27,
          "DetainDate": "2023-10-10 09:22:00",
          "IsReleased": 1,
          "FineFees": 200.00,
          "ReleaseDate": "2023-10-10 09:23:00",
          "NationalNo": "N10",
          "FullName": "Mahmoud Omar Ali Almajed",
          "ReleaseApplicationID": 131
        },
        {
          "DetainID": 16,
          "LicenseID": 33,
          "DetainDate": "2024-05-08 20:19:00",
          "IsReleased": 1,
          "FineFees": 1.00,
          "ReleaseDate": "2024-05-08 22:08:00",
          "NationalNo": "N1",
          "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
          "ReleaseApplicationID": 2164
        },
        {
          "DetainID": 17,
          "LicenseID": 33,
          "DetainDate": "2024-05-08 21:51:00",
          "IsReleased": 1,
          "FineFees": 2500.00,
          "ReleaseDate": "2024-05-08 22:14:00",
          "NationalNo": "N1",
          "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
          "ReleaseApplicationID": 2166
        }
      ]
    };      