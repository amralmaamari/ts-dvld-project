import { JSX } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";


interface ITabsConfigProps{
  id:number;
  label:string;
  component:React.JSX.Element;
  disabled:boolean;
}

interface IReactTabsComponentProps{
  tabsConfig:ITabsConfigProps[];
}

export default function ReactTabsComponent({ tabsConfig }:IReactTabsComponentProps):JSX.Element {
  return (
    <Tabs>
      <TabList style={{ backgroundColor: "#efefef" }}>
        {tabsConfig.map(({ id, label, disabled }) => (
          <Tab disabled={disabled} key={id}>
            {label}
          </Tab>
        ))}
      </TabList>

      {tabsConfig.map(({ id, component }) => (
        <TabPanel key={id}>{component}</TabPanel>
      ))}
    </Tabs>
  );
}
