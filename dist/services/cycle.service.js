"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCurrentCycle = void 0;
const moment = require("moment-timezone");
const calculateCurrentCycle = (startDate, cycleDurationDays) => {
    const now = moment();
    const start = moment(startDate);
    const diff = now.diff(start, 'days');
    return Math.floor(diff / cycleDurationDays) + 1;
};
exports.calculateCurrentCycle = calculateCurrentCycle;
//# sourceMappingURL=cycle.service.js.map