import TabButton from "../TabButton/TabButton"
import Section from "../Section/Section";
import Tabs from "../Tabs/Tabs";
import TabContent from "../TabContent/TabContent";


import { useState } from "react";

export default function Examples() {

    const [selectedTopic, setSelectedTopic] = useState(null);

    function handleSelect(selectedButton) {
        setSelectedTopic(selectedButton);
    };

    return (
        <Section title="Examples" id="examples">

            <Tabs
                buttonContainer="menu"
                buttons={
                    <>
                        <TabButton
                            isSelected={selectedTopic === "components"}
                            onClick={() => handleSelect("components")}
                        >
                            Components
                        </TabButton>
                        <TabButton
                            isSelected={selectedTopic === "jsx"}
                            onClick={() => handleSelect("jsx")}
                        >
                            JSX
                        </TabButton>
                        <TabButton
                            isSelected={selectedTopic === "props"}
                            onClick={() => handleSelect("props")}
                        >
                            Props
                        </TabButton>
                        <TabButton
                            isSelected={selectedTopic === "state"}
                            onClick={() => handleSelect("state")}
                        >
                            State
                        </TabButton>
                    </>
                }>

            </Tabs>

            <TabContent selectedTopic={selectedTopic} />

        </Section>
    )
}