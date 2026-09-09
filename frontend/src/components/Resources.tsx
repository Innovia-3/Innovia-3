import { useState } from "react";
import styles from "./css/Resources.module.css";

export default function Resources() {
    const [selectedResource, setSelectedResource] = useState<string | null>(null);

    const resources = [
        "Drop-in Skrivbord",
        "Mötesrum",
        "VR-Headset",
        "AI-Server"
    ];

    return (
        <>
        <section className={styles.resourcesWrapper}>
            <div className={styles.heading}>
                <p className={styles.eyebrow}>
                    Resurser
                </p>
            </div>

            <div className={styles.placeholder}>
                <div className={styles.resourceButtonWrapper}>
                    {resources.map((resource) => (
                        <button
                            key={resource}
                            type="button"
                            className={
                                selectedResource === resource
                                    ? styles.selected
                                    : ""
                            }
                            onClick={() => setSelectedResource(resource)}>

                            <span>{resource}</span>
                            
                            <span
                                className={`${styles.selectCircle} ${
                                    selectedResource === resource
                                        ? styles.circleSelected
                                        : ""
                                }`}
                            >
                                {selectedResource === resource ? "✓" : ""}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
}