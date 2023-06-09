import { FunctionComponent } from "react";
import { KeyCode } from "../../keycode/KeyCode";
import { Flexbox } from "../layout/flexbox/Flexbox";
import styles from "./Tabs.module.css";

export interface TabNavItemProps {
  id: string;
  title: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const TabNavItem: FunctionComponent<TabNavItemProps> = ({ id, title, activeTab, setActiveTab }) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  const handleKeyUp = (key: string) => {
    if (key === KeyCode.Enter) {
      setActiveTab(id);
    }
  };

  return (
    <Flexbox flexDirection="column">
      <div
        onClick={handleClick}
        className={styles.tab}
        onKeyUp={(e) => handleKeyUp(e.key)}
        role="button"
        tabIndex={0}
        style={{ fontWeight: activeTab === id ? "bold" : "normal" }}
      >
        {title}
      </div>
      {activeTab === id && <div className={styles.activeTab} />}
    </Flexbox>
  );
};
