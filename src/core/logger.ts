export class Logger {
    static instances: {[key: string]: Logger} = {};

    private readonly id: string;
    private readonly start: number;

    constructor(id: string) {
        this.id = id;
        this.start = Date.now();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug(...args: any) {
        // eslint-disable-next-line no-console
        if (typeof window !== 'undefined' && window.console && typeof console.debug === 'function') {
            // eslint-disable-next-line no-console
            console.debug(this.id, `${this.getTime()}ms`, ...args);
        } else {
            this.info(...args);
        }
    }

    getTime(): number {
        return Date.now() - this.start;
    }

    static create(id: string) {
        Logger.instances[id] = new Logger(id);
    }

    static destroy(id: string) {
        delete Logger.instances[id];
    }

    static getInstance(id: string): Logger {
        const instance = Logger.instances[id];
        if (typeof instance === 'undefined') {
            throw new Error(`No logger instance found with id ${id}`);
        }
        return instance;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info(...args: any) {
        // eslint-disable-next-line no-console
        if (typeof window !== 'undefined' && window.console && typeof console.info === 'function') {
            // eslint-disable-next-line no-console
            console.info(this.id, `${this.getTime()}ms`, ...args);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(...args: any) {
        // eslint-disable-next-line no-console
        if (typeof window !== 'undefined' && window.console && typeof console.error === 'function') {
            // eslint-disable-next-line no-console
            console.error(this.id, `${this.getTime()}ms`, ...args);
        } else {
            this.info(...args);
        }
    }
}
