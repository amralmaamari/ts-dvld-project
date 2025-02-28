export interface ILocalDrivingLicenseApplications {
  LocalDrivingLicenseApplicationID: number;
  ClassName: string;
  NationalNo: number |string;
  FullName: string;
  ApplicationDate: string;
  PassedTestCount: number|string;
  Status: string;
}

export interface ILocalDrivingLicenseApplicationsResponse {
    success:boolean,
    localdrivinglicenseapplications:ILocalDrivingLicenseApplications[],
}

export const LocalDrivingLicenseApplicationsData:ILocalDrivingLicenseApplicationsResponse = {
  "success": true,
  "localdrivinglicenseapplications": [
    {
      "LocalDrivingLicenseApplicationID": 3068,
      "ClassName": "Class 1 - Small Motorcycle",
      "NationalNo": "5",
      "FullName": "a a a a",
      "ApplicationDate": "2025-02-07 18:13:34.850",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 3067,
      "ClassName": "Class 3 - Ordinary driving license",
      "NationalNo": "5",
      "FullName": "a a a a",
      "ApplicationDate": "2025-02-07 18:05:16.290",
      "PassedTestCount": "3",
      "Status": "Completed"
    },
    {
      "LocalDrivingLicenseApplicationID": 3066,
      "ClassName": "Class 4 - Commercial",
      "NationalNo": "5",
      "FullName": "a a a a",
      "ApplicationDate": "2025-02-07 18:03:08.090",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 2066,
      "ClassName": "Class 3 - Ordinary driving license",
      "NationalNo": "5",
      "FullName": "a a a a",
      "ApplicationDate": "2025-02-04 19:31:55.923",
      "PassedTestCount": "0",
      "Status": "Cancelled"
    },
    {
      "LocalDrivingLicenseApplicationID": 1067,
      "ClassName": "Class 7 - Truck and heavy vehicle",
      "NationalNo": "N5",
      "FullName": "Alia Khalil Sami Ahmed",
      "ApplicationDate": "2024-05-12 22:28:56.403",
      "PassedTestCount": "1",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 1066,
      "ClassName": "Class 1 - Small Motorcycle",
      "NationalNo": "g",
      "FullName": "Khaled Naswer Ali g",
      "ApplicationDate": "2024-05-12 18:41:21.387",
      "PassedTestCount": "3",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 1065,
      "ClassName": "Class 3 - Ordinary driving license",
      "NationalNo": "g",
      "FullName": "Khaled Naswer Ali g",
      "ApplicationDate": "2024-05-10 18:10:12.753",
      "PassedTestCount": "3",
      "Status": "Completed"
    },
    {
      "LocalDrivingLicenseApplicationID": 1064,
      "ClassName": "Class 5 - Agricultural",
      "NationalNo": "N10",
      "FullName": "Mahmoud Omar Ali Almajed",
      "ApplicationDate": "2024-04-24 17:17:13.040",
      "PassedTestCount": "3",
      "Status": "Completed"
    },
    {
      "LocalDrivingLicenseApplicationID": 1063,
      "ClassName": "Class 3 - Ordinary driving license",
      "NationalNo": "N1",
      "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
      "ApplicationDate": "2024-04-16 09:13:50.783",
      "PassedTestCount": "3",
      "Status": "Completed"
    },
    {
      "LocalDrivingLicenseApplicationID": 1062,
      "ClassName": "Class 3 - Ordinary driving license",
      "NationalNo": "N1",
      "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
      "ApplicationDate": "2024-04-16 09:13:38.070",
      "PassedTestCount": "0",
      "Status": "Cancelled"
    },
    {
      "LocalDrivingLicenseApplicationID": 76,
      "ClassName": "Class 1 - Small Motorcycle",
      "NationalNo": "N1",
      "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
      "ApplicationDate": "2024-03-28 23:56:36.010",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 75,
      "ClassName": "Class 7 - Truck and heavy vehicle",
      "NationalNo": "N1",
      "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
      "ApplicationDate": "2024-03-28 23:54:48.770",
      "PassedTestCount": "1",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 74,
      "ClassName": "Class 6 - Small and medium bus",
      "NationalNo": "N1",
      "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
      "ApplicationDate": "2024-03-28 23:54:07.113",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 73,
      "ClassName": "Class 4 - Commercial",
      "NationalNo": "N1",
      "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
      "ApplicationDate": "2024-03-28 23:53:40.960",
      "PassedTestCount": "3",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 72,
      "ClassName": "Class 1 - Small Motorcycle",
      "NationalNo": "N1",
      "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
      "ApplicationDate": "2024-03-28 23:53:26.443",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 71,
      "ClassName": "Class 5 - Agricultural",
      "NationalNo": "N1",
      "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
      "ApplicationDate": "2024-03-28 23:43:45.743",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 70,
      "ClassName": "Class 5 - Agricultural",
      "NationalNo": "N1",
      "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
      "ApplicationDate": "2024-03-28 23:42:40.887",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 69,
      "ClassName": "Class 5 - Agricultural",
      "NationalNo": "N1",
      "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
      "ApplicationDate": "2024-03-28 23:37:50.527",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 68,
      "ClassName": "Class 2 - Heavy Motorcycle License",
      "NationalNo": "N10",
      "FullName": "Mahmoud Omar Ali Almajed",
      "ApplicationDate": "2024-03-28 05:10:24.273",
      "PassedTestCount": "2",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 67,
      "ClassName": "Class 2 - Heavy Motorcycle License",
      "NationalNo": "N10",
      "FullName": "Mahmoud Omar Ali Almajed",
      "ApplicationDate": "2024-03-28 05:10:08.973",
      "PassedTestCount": "1",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 66,
      "ClassName": "Class 1 - Small Motorcycle",
      "NationalNo": "N10",
      "FullName": "Mahmoud Omar Ali Almajed",
      "ApplicationDate": "2024-03-28 05:06:25.830",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 62,
      "ClassName": "Class 1 - Small Motorcycle",
      "NationalNo": "N10",
      "FullName": "Mahmoud Omar Ali Almajed",
      "ApplicationDate": "2024-03-27 00:00:00.000",
      "PassedTestCount": "0",
      "Status": "Cancelled"
    },
    {
      "LocalDrivingLicenseApplicationID": 59,
      "ClassName": "Class 6 - Small and medium bus",
      "NationalNo": "N1",
      "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
      "ApplicationDate": "2024-03-19 00:00:00.000",
      "PassedTestCount": "1",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 60,
      "ClassName": "Class 4 - Commercial",
      "NationalNo": "N5",
      "FullName": "Alia Khalil Sami Ahmed",
      "ApplicationDate": "2024-03-19 00:00:00.000",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 61,
      "ClassName": "Class 5 - Agricultural",
      "NationalNo": "N5",
      "FullName": "Alia Khalil Sami Ahmed",
      "ApplicationDate": "2024-03-19 00:00:00.000",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 45,
      "ClassName": "Class 1 - Small Motorcycle",
      "NationalNo": "N5",
      "FullName": "Alia Khalil Sami Ahmed",
      "ApplicationDate": "2024-03-18 00:00:00.000",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 46,
      "ClassName": "Class 2 - Heavy Motorcycle License",
      "NationalNo": "N5",
      "FullName": "Alia Khalil Sami Ahmed",
      "ApplicationDate": "2024-03-18 00:00:00.000",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 57,
      "ClassName": "Class 2 - Heavy Motorcycle License",
      "NationalNo": "N5",
      "FullName": "Alia Khalil Sami Ahmed",
      "ApplicationDate": "2024-03-18 00:00:00.000",
      "PassedTestCount": "0",
      "Status": "Cancelled"
    },
    {
      "LocalDrivingLicenseApplicationID": 58,
      "ClassName": "Class 3 - Ordinary driving license",
      "NationalNo": "N5",
      "FullName": "Alia Khalil Sami Ahmed",
      "ApplicationDate": "2024-03-18 00:00:00.000",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 43,
      "ClassName": "Class 2 - Heavy Motorcycle License",
      "NationalNo": "N1",
      "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
      "ApplicationDate": "2024-03-01 08:43:27.350",
      "PassedTestCount": "0",
      "Status": "New"
    },
    {
      "LocalDrivingLicenseApplicationID": 41,
      "ClassName": "Class 3 - Ordinary driving license",
      "NationalNo": "N10",
      "FullName": "Mahmoud Omar Ali Almajed",
      "ApplicationDate": "2023-10-09 21:26:21.627",
      "PassedTestCount": "3",
      "Status": "Completed"
    },
    {
      "LocalDrivingLicenseApplicationID": 39,
      "ClassName": "Class 3 - Ordinary driving license",
      "NationalNo": "N10",
      "FullName": "Mahmoud Omar Ali Almajed",
      "ApplicationDate": "2023-10-09 21:22:40.437",
      "PassedTestCount": "0",
      "Status": "Cancelled"
    },
    {
      "LocalDrivingLicenseApplicationID": 38,
      "ClassName": "Class 2 - Heavy Motorcycle License",
      "NationalNo": "n4",
      "FullName": "Khalid ALi Maher hamed",
      "ApplicationDate": "2023-10-07 11:16:55.240",
      "PassedTestCount": "2",
      "Status": "Cancelled"
    },
    {
      "LocalDrivingLicenseApplicationID": 37,
      "ClassName": "Class 3 - Ordinary driving license",
      "NationalNo": "n4",
      "FullName": "Khalid ALi Maher hamed",
      "ApplicationDate": "2023-10-07 11:07:05.810",
      "PassedTestCount": "3",
      "Status": "Completed"
    },
    {
      "LocalDrivingLicenseApplicationID": 36,
      "ClassName": "Class 1 - Small Motorcycle",
      "NationalNo": "N1",
      "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
      "ApplicationDate": "2023-10-07 10:46:17.370",
      "PassedTestCount": "3",
      "Status": "Completed"
    }
  ]
};