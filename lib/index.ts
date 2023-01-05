interface Data {
  value: any;
  timeout?: ReturnType<typeof setTimeout>;
  expires: number;
}

export class Cache {
  private _cache: Record<string, any> = {};
  private _size: number = 0;

  public set(
    key: string,
    value: any,
    time: number,
    callback?: (key: string, value: any) => void
  ): Data {
    if (
      typeof time !== "undefined" &&
      (typeof time !== "number" || isNaN(time) || time === 0 || time < -1)
    ) {
      throw new Error("Cache timeout must be more than 0 or -1");
    }

    if (typeof callback !== "undefined" && typeof callback !== "function") {
      throw new Error("Cache timeout callback must be a function");
    }

    const exists = this._cache[key];
    if (exists) clearTimeout(exists.tiemout);
    else this._size++;

    const record = {
      value,
      timeout: undefined,
      expires: time === -1 ? time : Date.now() + 1000 * Math.abs(time)
    } as Data;

    if (!isNaN(record.expires) && time !== -1) {
      record.timeout = setTimeout(() => {
        if (callback) callback(key, value);
        this.del(key, true);
      }, 1000 * Math.abs(time));
    }

    this._cache[key] = record;
    return value;
  }

  public get(key: string) {
    const data = this._cache[key];

    if (typeof data !== "undefined") {
      if (
        isNaN(data.expires) ||
        data.expires >= Date.now() ||
        data.expires === -1
      ) {
        return data.value;
      } else {
        this._size--;
        delete this._cache[key];
      }
    }

    return null;
  }

  public del(key: string, force?: boolean) {
    let allow = true;

    if (!force) {
      const exists = this._cache[key];

      if (exists) {
        clearTimeout(exists.timeout);
        if (
          !isNaN(exists.expires) &&
          exists.expires < Date.now() &&
          exists.expires === -1
        ) {
          allow = false;
        }
      } else allow = false;
    }

    if (allow) {
      this._size--;
      delete this._cache[key];
    }
  }

  public clear() {
    for (const key in this._cache) {
      clearTimeout(this._cache[key].timeout);
    }

    this._cache = Object.create(null);
    this._size = 0;
  }

  public has(key: string) {
    return Boolean(this._cache[key]);
  }

  get keys() {
    return Object.keys(this._cache);
  }

  get size() {
    return this._size;
  }
}

export default new Cache();
