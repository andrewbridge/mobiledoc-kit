export declare class Logger {
    type: string;
    manager: LogManager;
    constructor(type: string, manager: LogManager);
    isEnabled(): boolean;
    log(...args: unknown[]): void;
}
export default class LogManager {
    enabledTypes: string[];
    allEnabled: boolean;
    constructor();
    for(type: string): Logger;
    enableAll(): void;
    enableTypes(types: string[]): void;
    disable(): void;
    isEnabled(type: string): boolean;
}
