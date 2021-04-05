interface Queue {
    [name: string]: LifecycleCallback[];
}
export declare type LifecycleCallback = (...args: any[]) => boolean | void;
export default class LifecycleCallbacks {
    callbackQueues: Queue;
    removalQueues: Queue;
    constructor(queueNames?: string[]);
    runCallbacks(queueName: string, args?: unknown[]): void;
    addCallback(queueName: string, callback: LifecycleCallback): void;
    _scheduleCallbackForRemoval(queueName: string, callback: LifecycleCallback): void;
    addCallbackOnce(queueName: string, callback: LifecycleCallback): void;
    _getQueue(queueName: string): LifecycleCallback[];
}
export {};
