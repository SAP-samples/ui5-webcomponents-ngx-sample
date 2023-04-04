import { Message } from "src/app/interfaces/message";
import { DEPARTURE_AIRCRAFT_STATUS } from "./mock-aircraft-status";

export const MESSAGES: Message[] = [
    {
        base_beginning: 'MESSAGE_PART1',
        base_end: 'MESSAGE_PART2',
        gate: DEPARTURE_AIRCRAFT_STATUS.gate,

        emphasized: 'MESSAGE_EMPHASIZED'
    },
]