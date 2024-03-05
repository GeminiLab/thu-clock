/**
 * A time system with hours, minutes, seconds, and milliseconds.
 */
type TimeSystem = { HOURS_PER_DAY: number, MINUTES_PER_HOUR: number, SECONDS_PER_MINUTE: number, MILLIS_PER_SECOND: number };

/**
 * Constants for different sub-day time units in real, representative (REP), and binary (BIN) time systems.
 */
const TIME_SYSTEMS = {
  REAL: { HOURS_PER_DAY: 24, MINUTES_PER_HOUR: 60, SECONDS_PER_MINUTE: 60, MILLIS_PER_SECOND: 1000 },
  REP: { HOURS_PER_DAY: 10, MINUTES_PER_HOUR: 100, SECONDS_PER_MINUTE: 100, MILLIS_PER_SECOND: 1000 },
  BIN: { HOURS_PER_DAY: 16, MINUTES_PER_HOUR: 64, SECONDS_PER_MINUTE: 64, MILLIS_PER_SECOND: 1024 },
};

/**
 * Function to calculate the total milliseconds in a day for a given time system.
 * @param {TimeSystem} system - The time system to calculate the total milliseconds for.
 * @returns {number} The total milliseconds in a day for the given time system.
 */
const milliPerDay = (system: TimeSystem): number =>
    system.HOURS_PER_DAY * system.MINUTES_PER_HOUR * system.SECONDS_PER_MINUTE * system.MILLIS_PER_SECOND;

const REAL_MILLIS_PER_DAY = milliPerDay(TIME_SYSTEMS.REAL);
const REP_MILLIS_PER_DAY = milliPerDay(TIME_SYSTEMS.REP);
const BIN_MILLIS_PER_DAY = milliPerDay(TIME_SYSTEMS.BIN);

/**
 * Time in hours, minutes, and seconds.
 */
export type HourMinuteSecond = [number, number, number];

/**
 * Time in hours, minutes, seconds, and milliseconds.
 */
export type HourMinuteSecondMilli = [number, number, number, number];

/**
 * Time in milliseconds.
 */
export type MilliInDay = number;

/**
 * Function to get the current time in milliseconds.
 * @returns {MilliInDay} The current time in milliseconds.
 */
export const currentRealMilliInDay = (): MilliInDay => {
  const now = new Date();
  return ((now.getHours() * TIME_SYSTEMS.REAL.MINUTES_PER_HOUR + now.getMinutes()) * TIME_SYSTEMS.REAL.SECONDS_PER_MINUTE + now.getSeconds()) * TIME_SYSTEMS.REAL.MILLIS_PER_SECOND + now.getMilliseconds();
};

/**
 * Function to convert milliseconds to hours, minutes, seconds, and millis in a specific time system.
 * @param {number} mid - The time in milliseconds.
 * @param {TimeSystem} system - The time system to convert the time to.
 * @returns {HourMinuteSecondMilli} The time in hours, minutes, seconds, and millis.
 */
function realMilliInDayToTimeInSystem(mid: number, system: TimeSystem): HourMinuteSecondMilli {
  const millis_per_day = milliPerDay(system);
  const milli_in_day = Math.floor(mid / REAL_MILLIS_PER_DAY * millis_per_day);

  const millis = milli_in_day % system.MILLIS_PER_SECOND;
  const seconds = Math.floor(milli_in_day / system.MILLIS_PER_SECOND) % system.SECONDS_PER_MINUTE;
  const minutes = Math.floor(milli_in_day / system.MILLIS_PER_SECOND / system.SECONDS_PER_MINUTE) % system.MINUTES_PER_HOUR;
  const hours = Math.floor(milli_in_day / system.MILLIS_PER_SECOND / system.SECONDS_PER_MINUTE / system.MINUTES_PER_HOUR);

  return [hours, minutes, seconds, millis];
}

/**
 * Function to convert milliseconds to hours, minutes, seconds, and millis in real time.
 * @param {number} mid - The time in milliseconds.
 * @returns {HourMinuteSecondMilli} The time in hours, minutes, seconds, and millis.
 */
export const milliInDayToHourMinuteSecondMilli = (mid: number): HourMinuteSecondMilli => realMilliInDayToTimeInSystem(mid, TIME_SYSTEMS.REAL);

/**
 * Function to convert milliseconds to hours, minutes, seconds, and millis in republican (REP) time.
 * @param {number} mid - The time in milliseconds.
 * @returns {HourMinuteSecondMilli} The time in hours, minutes, seconds, and millis.
 */
export const milliInDayToRepHourMinuteSecondMilli = (mid: number): HourMinuteSecondMilli => realMilliInDayToTimeInSystem(mid, TIME_SYSTEMS.REP);

/**
 * Function to convert milliseconds to hours, minutes, seconds, and millis in binary (BIN) time.
 * @param {number} mid - The time in milliseconds.
 * @returns {HourMinuteSecondMilli} The time in hours, minutes, seconds, and millis.
 */
export const milliInDayToBinHourMinuteSecondMilli = (mid: number): HourMinuteSecondMilli => realMilliInDayToTimeInSystem(mid, TIME_SYSTEMS.BIN);