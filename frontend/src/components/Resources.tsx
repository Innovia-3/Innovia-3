import { useEffect, useState } from "react";
import styles from "./css/Resources.module.css";

/* hur en resurs från backend ser ut */
type Resource = {
    resourceId: number;
    resourceType: number;
};

export default function Resources() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [selectedResourceType, setSelectedResourceType] = useState<number | null>(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                console.log("Hämtar resurser från backend...");
            
                /* anropar GET /api/Resources i backend */
                const response = await fetch(
                    "http://localhost:5197/api/Resources"
                );
            
                console.log("Svar från backend:", response.status);
            
                if (!response.ok) {
                    throw new Error("Kunde inte hämta resurser");
                }
            
                const data = await response.json();
            
                console.log("Resurser från backend:", data);
            
                setResources(data);
            } catch (error) {
                console.error("Fel vid hämtning av resurser:", error);
            }
        };
    
        fetchResources();
    }, []);

    /* tar fram unika resurstyper */
    const resourceTypes = [
        ...new Set(resources.map((resource) => resource.resourceType))
    ];

    /* gör backendens enum-värden till text som visas för användaren */
    const getResourceName = (resourceType: number) => {
        switch (resourceType) {
            case 1:
                return "Drop-in Skrivbord";
            case 2:
                return "Mötesrum";
            case 3:
                return "VR-Headset";
            case 4:
                return "AI-Server";
            default:
                return "Okänd resurs";
        }
    };

    return (
        <section className={styles.resourcesWrapper}>
            <div className={styles.heading}>
                <p className={styles.eyebrow}>
                    Resurser
                </p>
            </div>

            <div className={styles.placeholder}>
                <div className={styles.resourceButtonWrapper}>
                    {resourceTypes.map((resourceType) => (
                        <button
                            key={resourceType}
                            type="button"
                            className={
                                selectedResourceType === resourceType
                                    ? styles.selected
                                    : ""
                            }
                            onClick={() => {
                                setSelectedResourceType(resourceType);

                                console.log(
                                    "Vald resurstyp:",
                                    resourceType,
                                    getResourceName(resourceType)
                                );
                            }}>

                            <span>{getResourceName(resourceType)}</span>
                            
                            <span
                                className={`${styles.selectCircle} ${
                                    selectedResourceType === resourceType
                                        ? styles.circleSelected
                                        : ""
                                }`}
                            >
                                {selectedResourceType === resourceType ? "✓" : ""}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}