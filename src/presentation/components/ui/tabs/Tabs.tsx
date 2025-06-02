import { useState } from "react";
import Tab from "./Tab";

interface TabContent {
    id: number;
    label: string;
    content: React.ReactNode;
}

interface TabsProps {
    tabsContent: TabContent[];
    initialTabId?: number;
}

const Tabs = ({ tabsContent, initialTabId }: TabsProps) => {
    const initialIndex = initialTabId
        ? tabsContent.findIndex(tab => tab.id === initialTabId)
        : 0;
    const [activeIndex, setActiveIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

    return (
        <>
            <div className="flex justify-start items-center gap-4 mb-4 border-b-2 border-gray-200">
                {tabsContent.map((tab, idx) => (
                    <Tab
                        key={tab.id}
                        label={tab.label}
                        active={activeIndex === idx}
                        fn={() => setActiveIndex(idx)}
                    />
                ))}
            </div>
            <div className="py-4">
                {tabsContent[activeIndex]?.content}
            </div>
        </>
    );
};

export default Tabs;

