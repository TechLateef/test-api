import * as moment from 'moment-timezone';

export const calculateCurrentCycle = (startDate: Date, cycleDurationDays: number): number => {
    const now = moment()
    const start = moment(startDate)
    const diff = now.diff(start, 'days');
    return Math.floor(diff / cycleDurationDays) + 1
}