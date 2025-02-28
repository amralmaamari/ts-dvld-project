import { peopleData,IPerson } from "../data/people.ts";
import { applicationTypesData } from "../data/applicationTypes.ts";
import { TestTypesData } from "../data/testTypes.ts";



interface Application {
  ApplicationID: number;
  // Add additional properties as needed
}

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

const deletePerson = (Id: number): void => {
  alert(`Deleting person with ID: ${Id}`);
};


async function fetchPersonById(personId: number): Promise<IPerson> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const person = peopleData.people.find(
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
      const exists = peopleData.people.some(
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
      const exists = peopleData.people.some(
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
      const person = peopleData.people.find(
        (p: IPerson) => p.NationalNo === nationalNo
      );
      if(person){
        return resolve(person);
      }
      return reject(null);
    }, 500);
  });
}

// async function fetchApplicationById(
//   applicationId: number
// ): Promise<Application> {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const application = Data.Applications.applications.find(
//         (p: Application) => p.ApplicationID === applicationId
//       );

//       if(application){
//         return resolve(application);
//       }
//       return reject(null);
//     }, 500);
//   });
// }

async function fetchTestTypeById(testTypeId: number): Promise<ITestType> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = TestTypesData.testTypes.find(
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
      const data = applicationTypesData.applicationTypes.find(
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

  deletePerson,
  fetchPersonById,
  fetchPersonByNationalNo,
  isPersonExistById,
  isPersonExistByNationalNo,
};

// export const applicationsActions = {
//   fetchApplicationById,
// };

export const testTypeActions = {
  fetchTestTypeById,
};

export const applicationTypeActions = {
  fetchApplicationTypeById,
};
