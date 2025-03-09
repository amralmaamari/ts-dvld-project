
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPeople from './components/people/ListPeople'
import ShowPersonInfo from './components/people/ShowPersonInfo';
import Sidebar from './components/sidebar/Sidebar';
import ListTestTypes from './components/tests/testTypes/ListTestTypes';
import ListApplicationTypes from './components/applications/application types/ListApplicationTypes';
import ListLocalDrivingLicenseApplications from './components/local driving license application/ListLocalDrivingLicenseApplications';
// import CtrlPersonCardWithFilter from './components/people/controls/CtrlPersonCardWithFilter';
import AddUpdateLocalDrivingLicenseApplication from './components/local driving license application/AddUpdateLocalDrivingLicenseApplication';
import ListUsers from './components/user/ListUsers';

function App() {

  return (
    <>
      <BrowserRouter>
    <div className={`h-screen xl:flex `}>
      
      <Sidebar  />
      {/* Main content area takes remaining space  */}
      <main className="pl-12 h-screen xl:pl-0  xl:flex-1  bg-gray-100 overflow-y-auto ">
            <Routes>
              <Route path="/people/list" element={<ListPeople />} />
              <Route path="/people/show/:personID" element={<ShowPersonInfo />} />
              <Route
                path="/applications/dl/new/local"
                element={<AddUpdateLocalDrivingLicenseApplication />}
              />
              <Route
                path="/applications/manage/local"
                element={<ListLocalDrivingLicenseApplications  />}
              /> 
              <Route
                path="/applications/manage-test-types"
                element={<ListTestTypes />}
              />
              <Route
                path="/applications/manage-types"
                element={<ListApplicationTypes />}
              />
               <Route
                path="/users"
                element={<ListUsers />}
              />
            </Routes>
      </main>
      
    </div>
      </BrowserRouter>
    </>
  )
}

export default App
