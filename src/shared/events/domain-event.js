"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = void 0;
function createEvent(eventType, payload) {
    return { eventType, occurredAt: new Date(), payload };
}
exports.createEvent = createEvent;
