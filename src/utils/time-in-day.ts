const REAL_MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export type HMS = [number, number, number];
export const millisecondsInDay = (): number => {
    let now = new Date();

    return ((now.getHours() * 60 + now.getMinutes()) * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();
};

function midToSomeHMS(rmid: number, hours_per_day: number, minutes_per_hour: number, seconds_per_minute: number): HMS {
    let seconds_per_day = hours_per_day * minutes_per_hour * seconds_per_minute;
    let seconds_in_day = Math.floor(rmid / REAL_MILLISECONDS_PER_DAY * seconds_per_day);

    let seconds = seconds_in_day % seconds_per_minute;
    let minutes = Math.floor(seconds_in_day / seconds_per_minute) % minutes_per_hour;
    let hours = Math.floor(seconds_in_day / seconds_per_minute / minutes_per_hour);

    return [hours, minutes, seconds];
}

export const midToHMS = (mid: number): HMS => midToSomeHMS(mid, 24, 60, 60);
export const midToHMSRep = (mid: number): HMS => midToSomeHMS(mid, 10, 100, 100);
export const midToHMSBin = (mid: number): HMS => midToSomeHMS(mid, 16, 64, 64);
