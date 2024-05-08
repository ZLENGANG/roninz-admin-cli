/**
 *
 * @param dbName 数据库名称
 * @param storeName 仓库名称
 * @param version 版本号
 * @returns
 */
export const openDB = (dbName, storeName, version) => {
    if (!indexedDB)
        return;
    return new Promise((res, rej) => {
        const request = window.indexedDB.open(dbName, version);
        request.onerror = (event) => {
            rej(event);
        };
        request.onsuccess = (event) => {
            if (!event) {
                return rej(event);
            }
            const db = event.target.result;
            res(db);
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore(storeName, { keyPath: "path" });
            objectStore.createIndex("model", "model");
        };
    });
};
export const addData = (db, storeName, data) => {
    return new Promise((res, rej) => {
        const transaction = db.transaction([storeName], "readwrite");
        transaction.oncomplete = (event) => {
            res(event);
        };
        transaction.onerror = (event) => {
            rej(event);
        };
        const objectStore = transaction.objectStore(storeName);
        objectStore.put(data);
    });
};
export const getData = (db, storeName, path) => {
    return new Promise((res, rej) => {
        const transaction = db.transaction([storeName], "readwrite");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.get(path);
        request.onerror = (event) => {
            rej(event);
        };
        request.onsuccess = (event) => {
            res(event.target.result);
        };
    });
};
