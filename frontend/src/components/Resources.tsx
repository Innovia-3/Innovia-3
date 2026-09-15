import { useEffect, useState } from "react";
import styles from "./css/Resources.module.css";

type Resource = {
    resourceId: number;
    resourceType: number;
};

type ResourcesProps = {
    selectedResourceId: number | null;
    onResourceSelect: (resourceId: number | null) => void;
};

export default function Resources({
    selectedResourceId,
    onResourceSelect
}: ResourcesProps) {
    const [resources, setResources] = useState<Resource[]>([]);
    const [selectedResourceType, setSelectedResourceType] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchResources() {
            try {
                const response = await fetch(
                    "http://localhost:5197/api/Resources"
                );

                if (!response.ok) {
                    throw new Error("Kunde inte hämta resurser.");
                }

                const data: Resource[] = await response.json();
                setResources(data);
            } catch (error) {
                console.error("Fel vid hämtning av resurser:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchResources();
    }, []);

    const resourceTypes = [
        ...new Set(resources.map((resource) => resource.resourceType))
    ];

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

    const resourcesOfSelectedType = resources.filter(
        (resource) => resource.resourceType === selectedResourceType
    );

    if (loading) {
        return (
            <section className={styles.resourcesWrapper}>
                <div className={styles.heading}>
                    <p className={styles.eyebrow}>Resurser</p>
                </div>

                <div className={styles.placeholder}>
                    <p>Hämtar resurser...</p>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.resourcesWrapper}>
            <div className={styles.heading}>
                <p className={styles.eyebrow}>Resurser</p>
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
                                onResourceSelect(null as never);
                            }}
                        >
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

                {selectedResourceType !== null && (
                    <div className={styles.resourceButtonWrapper}>
                        {resourcesOfSelectedType.map((resource) => (
                            <button
                                key={resource.resourceId}
                                type="button"
                                className={
                                    selectedResourceId === resource.resourceId
                                        ? styles.selected
                                        : ""
                                }
                                onClick={() =>
                                    onResourceSelect(resource.resourceId)
                                }
                            >
                                <span>
                                    {getResourceName(resource.resourceType)} #{resource.resourceId}
                                </span>

                                <span
                                    className={`${styles.selectCircle} ${
                                        selectedResourceId === resource.resourceId
                                            ? styles.circleSelected
                                            : ""
                                    }`}
                                >
                                    {selectedResourceId === resource.resourceId
                                        ? "✓"
                                        : ""}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}