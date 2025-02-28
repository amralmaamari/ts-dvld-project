
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import PeopleList from './components/people/PeopleList'
import ShowPersonInfo from './components/people/ShowPersonInfo';
import Sidebar from './components/sidebar/Sidebar';
import ListTestTypes from './components/tests/testTypes/ListTestTypes';
import ListApplicationTypes from './components/applications/application types/ListApplicationTypes';
import ListLocalDrivingLicenseApplications from './components/local driving license application/ListLocalDrivingLicenseApplications';

function App() {

  return (
    <>
      <BrowserRouter>
    <div className="relative h-screen">
      
      <Sidebar />
      {/* Main content area takes remaining space  */}
      <main className="h-full pl-[60px] bg-gray-100  overflow-y-auto">
            <Routes>
              <Route path="/people/list" element={<PeopleList />} />
              <Route path="/people/:id" element={<ShowPersonInfo />} />
              {/* <Route
                path="/applications/dl/new/local"
                element={<AddUpdateLocalDrivingLicenseApplication />}
              />*/}
              <Route
                path="/applications/manage/local"
                element={<ListLocalDrivingLicenseApplications />}
              /> 
              <Route
                path="/applications/manage-test-types"
                element={<ListTestTypes />}
              />
              <Route
                path="/applications/manage-types"
                element={<ListApplicationTypes />}
              />
            </Routes>
      </main>
    </div>
      </BrowserRouter>
    </>
  )
}

export default App
