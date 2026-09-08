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
    const [displayDate, setDisplayDate] = useState(new Date());

    //hittar måndagen i veckan som displayDate ligger i
    const mondayOfWeek = new Date(displayDate);

    const dayOfWeek = displayDate.getDay();
    const daysFromMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    mondayOfWeek.setDate(displayDate.getDate() + daysFromMonday);

    //skapar veckans 7 dagar
    const weekDays = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(mondayOfWeek);
        date.setDate(mondayOfWeek.getDate() + index);

        return date;
    });

    const previousWeek = () => {
        const newDate = new Date(displayDate);
        newDate.setDate(displayDate.getDate() - 7);

        setDisplayDate(newDate);
    };

    const nextWeek = () => {
        const newDate = new Date(displayDate);
        newDate.setDate(displayDate.getDate() + 7);

        setDisplayDate(newDate);
    };

    const fistDayOfPreviousMonth = () => {
        const newDate = new Date(displayDate);

        /* tillbaka på dag 1 föregående månad för att undvika problem med olika långa månader */
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() - 1);

        setDisplayDate(newDate);
    };

    const firstDayOfNextMonth = () => {
        const newDate = new Date(displayDate);

        /* börja på dag 1 nästa månad för att undvika problem med olika långa månader */
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() + 1);

        setDisplayDate(newDate);
    };

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>

                <div className={styles.navigation}>
                    <button
                        type="button"
                        onClick={fistDayOfPreviousMonth}
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
                        {displayDate.toLocaleDateString("sv-SE", {
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
                        onClick={firstDayOfNextMonth}
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