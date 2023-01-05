interface Data {
    value: any;
    timeout?: ReturnType<typeof setTimeout>;
    expires: number;
}
export declare class Cache {
    private _cache;
    private _size;
    set(key: string, value: any, time: number, callback?: (key: string, value: any) => void): Data;
    get(key: string): any;
    del(key: string, force?: boolean): void;
    clear(): void;
    has(key: string): boolean;
    get keys(): string[];
    get size(): number;
}
declare const _default: Cache;
export default _default;
