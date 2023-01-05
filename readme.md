# memojs

A simple and fast internal memory cache for node.js that has `set`, `get` and `delete`. Keys can have a timout based on expires time. All keys are stored in a single object so, the practical limit is aroud 1m keys.

## Install

With npm

```
npm install --save @meluiz/memojs
```

Or yarn

```
yarn add --save @meluiz/memojs
```

## Usage

```js
const cache = require("@meluiz/memojs");

// Now just use cache
cache.set("foo", "bar");
console.log(cache.get("foo"));

// You can make more than simplest
cache.set("foo", "bar", 60, function (key, value) {
  console.log("key: ", key);
  console.log("value: ", value);
}); // time in seconds

// Create a new instance
const newCache = new cache.Cache();

newCache.set("name", "John");
console.log(newCache.get("name"));
```

Which should print

```
bar
key: foo
value: bar
John
```

## Api

### Cache.set = function(key, value, time, callback)

Store a value and delete after timeout. Callback function is called after timeout too. If you wanna create infinite cache, you can set time as -1.

| Args      | Type                       |
| --------- | -------------------------- |
| key       | string                     |
| value     | any                        |
| time?     | number                     |
| callback? | function(key, value): void |

### Cache.get = function(key)

Retrieves a value for a given key or return null if not exists.

| Args | Type   |
| ---- | ------ |
| key  | string |

### Cache.del = function(key, force)

Delete a key and return boolean specifying whether or not the key was deleted.

| Args  | Type     |
| ----- | -------- |
| key   | string   |
| force | boolean? |

### Cache.clear = function()

Delete all keys and return boolean specifying whether or not the key was deleted.

### Cache.has = function()

Return a boolean to specific key.

### Cache.keys = string[]

Return all keys stored.

### Cache.size = number

Return the length stored keys.
