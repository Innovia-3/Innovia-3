import { useEffect, useState } from "react";
import styles from "./css/ResourceStatus.module.css";

type ResourceAvailability = {
    resourceType: number;
    totalResources: number;
    availableResources: number;
};

export default function ResourceStatus() {
    const [resourceStatus, setResourceStatus] = useState<ResourceAvailability[]>([]);

    useEffect(() => {
        const fetchResourceStatus = async () => {
            try {
                const resourceTypes = [1, 2, 3, 4];

                const startTime = new Date();

                const endTime = new Date(
                    startTime.getTime() + 60 * 60 * 1000
                );

                const requests = resourceTypes.map(
                    async (resourceType) => {
                        const response = await fetch(
                            `http://localhost:5197/api/Resources/types/${resourceType}/availability` +
                            `?startTime=${startTime.toISOString()}` +
                            `&endTime=${endTime.toISOString()}`
                        );

                        if (!response.ok) {
                            throw new Error(
                                `Kunde inte hämta tillgänglighet för resurstyp ${resourceType}`
                            );
                        }

                        const data: ResourceAvailability =
                            await response.json();

                        return data;
                    }
                );

                const data = await Promise.all(requests);

                console.log("Resursstatus:", data);

                setResourceStatus(data);
            } catch (error) {
                console.error(
                    "Fel vid hämtning av resursstatus:",
                    error
                );
            }
        };

        fetchResourceStatus();
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

    return (
        <section className={styles.resourceStatus}>
            <p className={styles.eyebrow}>
                Resursstatus
            </p>

            <div className={styles.statusCards}>
                {resourceStatus.map((resource) => (
                    <div
                        key={resource.resourceType}
                        className={styles.statusCard}
                    >
                        <div>
                            <h3>
                                {getResourceName(resource.resourceType)}
                            </h3>

                            <p>
                                {resource.totalResources} st totalt
                            </p>
                        </div>

                        <div className={styles.availability}>
                            <span className={styles.statusDot}></span>

                            <span>
                                {resource.availableResources} st tillgängliga
                            </span>
                        </div>

                        <div className={styles.progressBar}>
                            <div
                                className={styles.progress}
                                style={{
                                    width:
                                        resource.totalResources === 0
                                            ? "0%"
                                            : `${
                                                (
                                                    resource.availableResources /
                                                    resource.totalResources
                                                ) * 100
                                            }%`
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}