import { useState } from "react";
import styles from "../components/css/Calendar.module.css";

type CalendarProps = {
    selectedDate?: Date;
    onDateSelect: (date: Date) => void;
};

export default function Calendar({
    selectedDate,
    onDateSelect
}: CalendarProps) {

    const today = new Date();

    //datumet bestämmer vilken vecka kalendern visar
    const [currentDate, setCurrentDate] = useState(new Date());

    //hittar måndagen i veckan som currentDate ligger i
    const monday = new Date(currentDate);

    const day = currentDate.getDay();
    const daysFromMonday = day === 0 ? -6 : 1 - day;

    monday.setDate(currentDate.getDate() + daysFromMonday);

    //skapar veckans 7 dagar
    const weekDays = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + index);

        return date;
    });

    const previousWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);

        setCurrentDate(newDate);
    };

    const nextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);

        setCurrentDate(newDate);
    };

    const previousMonth = () => {
        const newDate = new Date(currentDate);

        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() - 1);

        setCurrentDate(newDate);
    };

    const nextMonth = () => {
        const newDate = new Date(currentDate);

        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() + 1);

        setCurrentDate(newDate);
    };

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>

                <div className={styles.navigation}>
                    <button
                        type="button"
                        onClick={previousMonth}
                        title="Previous month"
                        >
                        &lt;&lt;
                    </button>

                    <button
                        type="button"
                        onClick={previousWeek}
                        title="Previous week"
                        >
                        &lt;
                    </button>

                    <h2>
                        {currentDate.toLocaleDateString("sv-SE", {
                            month: "long",
                            year: "numeric"
                        })}
                    </h2>

                    <button
                        type="button"
                        onClick={nextWeek}
                        title="Next week"
                    >
                        &gt;
                    </button>

                    <button
                        type="button"
                        onClick={nextMonth}
                        title="Next month"
                    >
                        &gt;&gt;
                    </button>
                </div>
            </div>

            <div className={styles.week}>
                {weekDays.map((date) => {

                    const isWeekend =
                        date.getDay() === 0 ||
                        date.getDay() === 6;

                    const isSelected =
                        selectedDate?.toDateString() ===
                        date.toDateString();

                    const isToday =
                        date.getFullYear() === today.getFullYear() &&
                        date.getMonth() === today.getMonth() &&
                        date.getDate() === today.getDate();

                    return (
                        <button
                            key={date.toISOString()}
                            type="button"
                            className={`
                                ${styles.day}
                                ${isWeekend ? styles.weekend : ""}
                                ${isSelected ? styles.selected : ""}
                                ${isToday ? styles.today : ""}
                            `}
                            onClick={() => onDateSelect(date)}
                        >
                            <span className={styles.dayName}>
                                {date.toLocaleDateString("sv-SE", {
                                    weekday: "short"
                                })}
                            </span>

                            <span className={styles.dayNumber}>
                                {date.getDate()}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}