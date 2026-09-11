import { useEffect, useState } from "react";
import styles from "./css/ResourceStatus.module.css";

type Resource = {
    resourceId: number;
    resourceType: number;
};

export default function ResourceStatus() {
    const [resources, setResources] = useState<Resource[]>([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5197/api/Resources"
                );

                if (!response.ok) {
                    throw new Error("Kunde inte hämta resurser");
                }

                const data = await response.json();

                setResources(data);
            } catch (error) {
                console.error("Fel vid hämtning av resurser:", error);
            }
        };

        fetchResources();
    }, []);

    const getResourceName = (resourceType: number) => {
        switch (resourceType) {
            case 1:
                return "Drop-in skrivbord";
            case 2:
                return "Mötesrum";
            case 3:
                return "VR-headset";
            case 4:
                return "AI-server";
            default:
                return "Okänd resurs";
        }
    };

    const getResourceCount = (resourceType: number) => {
        return resources.filter(
            (resource) => resource.resourceType === resourceType
        ).length;
    };

    const resourceTypes = [1, 2, 3, 4];

    return (
        <section className={styles.resourceStatus}>
            <p className={styles.eyebrow}>
                Resursstatus
            </p>

            <div className={styles.statusCards}>
                {resourceTypes.map((resourceType) => (
                    <div
                        key={resourceType}
                        className={styles.statusCard}
                    >
                        <div>
                            <h3>{getResourceName(resourceType)}</h3>

                            <p>
                                {getResourceCount(resourceType)} st totalt
                            </p>
                        </div>

                        {/* dummy-visualisering för tillgänglighet */}
                        <div className={styles.availability}>
                            <span className={styles.statusDot}></span>

                            <span>
                                Dummy tillgänglighet
                            </span>
                        </div>

                        <div className={styles.progressBar}>
                            <div className={styles.progress}></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}