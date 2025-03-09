import React, { createContext, useState, useMemo, ReactNode } from "react";
import peopleApi, { IPersonResponse, IPeopleResponse, DeleteResponse } from "../api/peopleApi";
import { IPerson } from "../data/listPeople";
import { IListTestTypesResponses } from "../data/listTestTypes";
import testTypeApi, { ITestTypeResponses } from "../api/testTypesApi";
import applicationTypesApi,{  IApplicationTypeResponses } from "../api/applicationTypesApi";
import { IApplicationResponses } from "../api/applicationsApi";
import localDrivingLicenseApplicationsApi, {  ILocalDrivingLicenseApplicationResponses } from "../api/localDrivingLicenseApplicationsApi";
import usersApi,{ IUsersResponses } from "../api/usersApi";

// Define the shape of our Context
interface IAppContext {
  loading: boolean;
  error: string | null;
  api: {
    people: {
      fetchAll: () => Promise<IPeopleResponse>;
      fetchById: (id: number) => Promise<IPerson>;
      create: (data: IPerson) => Promise<IPerson>;
      update: (id: number, data: IPerson) => Promise<IPerson>;
      delete: (id: number) => Promise<DeleteResponse>;
    },
    testTypes: {
      fetchAll: () => Promise<ITestTypeResponses>;
    }
    applicationTypes: {
      fetchAll: () => Promise<IApplicationTypeResponses>;
    }
    localDrivingLicenseApplications:{
      fetchAll: () => Promise<ILocalDrivingLicenseApplicationResponses>;

    }
    users:{
      fetchAll: () => Promise<IUsersResponses>;

    }
  };
  
}

// Provider props
interface IAppContextProviderProps {
  children: ReactNode;
}

// Create the Context with a default value (cast as IAppContext)
const AppContext = createContext<IAppContext>({} as IAppContext);

// The Provider Component
const AppContextProvider: React.FC<IAppContextProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Generic API call handler that returns the data property from the Axios response.
  const handleApiCall = async <T,>(apiFunc: (...args: any[]) => Promise<any>, ...args: any[]): Promise<T> => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunc(...args);
      setLoading(false);
      return result.data as T;
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      setLoading(false);
      throw err;
    }
  };

  // Memoize the API methods to prevent unnecessary re-creation on each render.
  const api = useMemo(
    () => ({
      people: {
        // fetchAll: (page: number, pageSize: number): Promise<IPerson[]> =>
        //   handleApiCall<IPeopleResponse>(peopleApi.fetchAll, page, pageSize).then(
        //     (data) => data.people
        //   ),
        fetchAll: (): Promise<IPeopleResponse> =>
          handleApiCall<IPeopleResponse>(peopleApi.fetchAll).then(
            (data) => data
          ),
        fetchById: (id: number): Promise<IPerson> =>
          handleApiCall<IPersonResponse>(peopleApi.fetchById, id).then(
            (data) => data.person
          ),
        create: (data: IPerson): Promise<IPerson> =>
          handleApiCall<IPersonResponse>(peopleApi.create, data).then(
            (data) => data.person
          ),
        update: (id: number, data: IPerson): Promise<IPerson> =>
          handleApiCall<IPersonResponse>(peopleApi.update, id, data).then(
            (data) => data.person
          ),
        delete: (id: number): Promise<DeleteResponse> =>
          handleApiCall<DeleteResponse>(peopleApi.delete, id),
      },
      testTypes: {
        fetchAll: (): Promise<IListTestTypesResponses> =>
          handleApiCall<IListTestTypesResponses>(testTypeApi.fetchAll).then(
            (data) => data
          ),
      },      
      applicationTypes: {
        fetchAll: (): Promise<IApplicationResponses> =>
          handleApiCall<IApplicationResponses>(applicationTypesApi.fetchAll).then(
            (data) => data
          ),
      },
      localDrivingLicenseApplications:{
        fetchAll: (): Promise<ILocalDrivingLicenseApplicationResponses> =>
          handleApiCall<ILocalDrivingLicenseApplicationResponses>(localDrivingLicenseApplicationsApi.fetchAll).then(
            (data) => data
          ),
      },
      users:{
        fetchAll: (): Promise<IUsersResponses> =>
          handleApiCall<IUsersResponses>(usersApi.fetchAll).then(
            (data) => data
          ),
      }
      
    }),
    []
  );

  return (
    <AppContext.Provider value={{ loading, error, api }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
