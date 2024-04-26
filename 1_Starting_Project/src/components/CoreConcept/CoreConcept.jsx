import { CORE_CONCEPTS } from "../../data";
import CoreConceptItem from "../CoreConceptItem/CoreConceptItem"

export default function CoreConcept() {
    return (
        <>
            <section id="core-concepts">
                <h2>Core Concepts</h2>
                <ul>
                    {CORE_CONCEPTS.map((conceptItem) => (
                        <CoreConceptItem key={conceptItem.title} {...conceptItem} />
                    ))}
                </ul>
            </section>
        </>
    )
}