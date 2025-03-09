import { listPeopleData,IPerson } from "../data/listPeople.ts";
import { ListApplicationTypesData } from "../data/listApplicationTypes.ts";
import { ListTestTypesData } from "../data/listTestTypes.ts";
import { ApplicationBasicInfoData, IApplicationBasicInfo , IApplicationBasicInfoResponse } from "../data/applicationsInfo.ts";
import { LocalDrivingLicenseApplicationData, ILocalDrivingLicenseApplication } from "../data/localDrivingLicenseApplication.ts";
import ListUsers from "../components/user/ListUsers.tsx";
import { IUsers, ListUsersData } from "../data/listUsers.ts";





interface ITestType {
  TestTypeID: number;
  TestTypeTitle: string;
  TestTypeDescription: string;
  TestTypeFees: number;
  // Add additional properties as needed
}

interface IApplicationType {
  ApplicationTypeID: number;
  ApplicationTypeTitle:string;
  ApplicationFees:number;
  // Add additional properties as needed
}


const deletePerson = (Id:number) => {
  alert(`Deleting person with ID: ${Id}`);
};

const createPerson = (data:IPerson) => {
  if (data) {
    alert(`Add New  person successfully ):`);
    return 60;
  } else return null;
};

const updatePerson = (data:IPerson) => {
  if (data) {
    alert(`Update  person successfully ):`);
    return data;
  } else return -1;
};


async function fetchPersonById(personId: number): Promise<IPerson> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const person = listPeopleData.people.find(
        (p: IPerson) => p.PersonID === personId
      );
      console.log("from fetch", person);

      if(person){
        return resolve(person);
      }
      return reject(null);
    }, 500);
  });
}

async function isPersonExistById(personId: number): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const exists = listPeopleData.people.some(
        (p: IPerson) => p.PersonID == personId
      );
      resolve(exists);
    }, 500);
  });
}

async function isPersonExistByNationalNo(
  nationalNo: string 
): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const exists = listPeopleData.people.some(
        (p: IPerson) => p.NationalNo === nationalNo
      );
      resolve(exists);
    }, 500);
  });
}

async function fetchPersonByNationalNo(
  nationalNo: string | undefined
): Promise<IPerson> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const person = listPeopleData.people.find(
        (p: IPerson) => p.NationalNo === nationalNo
      );
      if(person){
        return resolve(person);
      }
      return reject(null);
    }, 500);
  });
}

async function fetchApplicationById(
  applicationId: number
): Promise<IApplicationBasicInfo > {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const application = ApplicationBasicInfoData.applications.find(
        (p: IApplicationBasicInfo ) => p.ApplicationID === applicationId
      );

      if(application){
        return resolve(application);
      }
      return reject(null);
    }, 500);
  });
}

async function fetchTestTypeById(testTypeId: number): Promise<ITestType> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = ListTestTypesData.testTypes.find(
        (p: ITestType) => p.TestTypeID === testTypeId
      );

      if(data){
        return resolve(data);
      }
      return reject(null);
    }, 500);
  });
}

async function fetchApplicationTypeById(
  applicationTypeID: number
): Promise<IApplicationType> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = ListApplicationTypesData.applicationTypes.find(
        (p: IApplicationType) => p.ApplicationTypeID === applicationTypeID
      );

      if(data){
        return resolve(data);
      }
      return reject(null);
    }, 500);
  });
}

export const peopleActions = {
  createPerson,
  updatePerson,
  deletePerson,
  fetchPersonById,
  fetchPersonByNationalNo,
  isPersonExistById,
  isPersonExistByNationalNo,
};

export const applicationsActions = {
  fetchApplicationById,
};

export const testTypeActions = {
  fetchTestTypeById,
};

export const applicationTypeActions = {
  fetchApplicationTypeById,
};




// Start Getting DrivingLicenseApplicationInfo
async function fetchDrivingLicenseApplicationInfoById(
  localDrivingLicenseApplicationID: number
): Promise<ILocalDrivingLicenseApplication> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const application = LocalDrivingLicenseApplicationData.drivingLicenseApplicationInfo.find(
        (p: ILocalDrivingLicenseApplication) => p.LocalDrivingLicenseApplicationID === localDrivingLicenseApplicationID
      );

      if(application){
        return resolve(application);
      }
      return reject(null);
    }, 500);
  });
}
async function fetchDrivingLicenseApplicationInfoByApplicationId(
  applicationID: number
): Promise<ILocalDrivingLicenseApplication> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const application = LocalDrivingLicenseApplicationData.drivingLicenseApplicationInfo.find(
        (p: ILocalDrivingLicenseApplication) => p.ApplicationID === applicationID
      );

      if(application){
        return resolve(application);
      }
      return reject(null);
    }, 500);
  });
}
export const drivingLicenseApplicationInfoActions = {
  fetchDrivingLicenseApplicationInfoById,
  fetchDrivingLicenseApplicationInfoByApplicationId,
};

// End Getting DrivingLicenseApplicationInfo

async function fetchUserInfoById(
  usersID: number
): Promise<IUsers> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = ListUsersData.users.find((p: IUsers) => p.UserID === usersID);

      if(data){
        return resolve(data);
      }
      return reject(null);
    }, 500);
  });
}

export const usersActions={
  fetchUserInfoById,
}