import Navbar from "../components/Navbar";
import styles from "./css/AdminPage.module.css";
import UserList from "../components/UserList";
import Bookings from "../components/Bookings";
import ResourceStatus from "../components/ResourceStatus";
import RegisterUser from "../components/RegisterUser";

export default function LandingPage() {
    return (
        <>
        <Navbar />
            <main className={styles.adminPage}>
                <RegisterUser />
                <div className={styles.adminBookingViewWrapper}>
                    <Bookings />
                </div>

                <div className={styles.resourceStatusAndUserListWrapper}>
                    <ResourceStatus />
                    <UserList />
                </div>
            </main>
        </>
    );
}