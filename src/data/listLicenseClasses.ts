export interface ILicenseClasses {
    LicenseClassID: number;
    ClassName: string;
    ClassDescription: string;
    MinimumAllowedAge: number;
    DefaultValidityLength: number;
    ClassFees: number;
}

export interface IListLicenseClassesResponses {
    success:boolean,
    licenseClasses:ILicenseClasses[],
}

export const ListLicenseClassesData:IListLicenseClassesResponses={
    "success": true,
    "licenseClasses":[
        {
          "LicenseClassID": 1,
          "ClassName": "Class 1 - Small Motorcycle",
          "ClassDescription": "It allows the driver to drive small motorcycles, It is suitable for motorcycles with small capacity and limited power.",
          "MinimumAllowedAge": 18,
          "DefaultValidityLength": 5,
          "ClassFees": 15.0
        },
        {
          "LicenseClassID": 2,
          "ClassName": "Class 2 - Heavy Motorcycle License",
          "ClassDescription": "Heavy Motorcycle License (Large Motorcycle License)",
          "MinimumAllowedAge": 21,
          "DefaultValidityLength": 5,
          "ClassFees": 30.0
        },
        {
          "LicenseClassID": 3,
          "ClassName": "Class 3 - Ordinary driving license",
          "ClassDescription": "Ordinary driving license (car licence)",
          "MinimumAllowedAge": 18,
          "DefaultValidityLength": 10,
          "ClassFees": 20.0
        },
        {
          "LicenseClassID": 4,
          "ClassName": "Class 4 - Commercial",
          "ClassDescription": "Commercial driving license (taxi/limousine)",
          "MinimumAllowedAge": 21,
          "DefaultValidityLength": 10,
          "ClassFees": 200.0
        },
        {
          "LicenseClassID": 5,
          "ClassName": "Class 5 - Agricultural",
          "ClassDescription": "Agricultural and work vehicles used in farming or construction, (tractors / tillage machinery)",
          "MinimumAllowedAge": 21,
          "DefaultValidityLength": 10,
          "ClassFees": 50.0
        },
        {
          "LicenseClassID": 6,
          "ClassName": "Class 6 - Small and medium bus",
          "ClassDescription": "Small and medium bus license",
          "MinimumAllowedAge": 21,
          "DefaultValidityLength": 10,
          "ClassFees": 250.0
        },
        {
          "LicenseClassID": 7,
          "ClassName": "Class 7 - Truck and heavy vehicle",
          "ClassDescription": "Truck and heavy vehicle license",
          "MinimumAllowedAge": 21,
          "DefaultValidityLength": 10,
          "ClassFees": 300.0
        }
      ]
    };      