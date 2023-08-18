import * as SQLite from "expo-sqlite";
import { Product } from "../model/product";
import { Operation } from "../model/operation";

const database = SQLite.openDatabase("kiosko.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS products (
                      id INTEGER PRIMARY KEY NOT NULL,
                      title TEXT NOT NULL,
                      price INTEGER NOT NULL,
                      barCode INTEGER NOT NULL,
                      imageUri TEXT 
                      )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
export function insertProduct(product) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO products (title,price,barCode,imageUri)  VALUES (?,?,?,?)`,
        [product.title, product.price, product.barCode, product.imageUri],
        (_, result) => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
export function fetchProducts() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM products`,
        [],
        (_, result) => {
          const products = [];

          for (const dp of result.rows._array) {
            products.push(
              new Product(dp.title, dp.price, dp.barCode, dp.imageUri, dp.id)
            );
          }
          resolve(products);
        },
        (_, error) => {
          console.log("Error!!!");
          reject(error);
        }
      );
    });
  });
  return promise;
}
export function fetchBarCode(barcode) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM products WHERE barCode = ?`,
        [barcode],
        (_, result) => {
          const products = [];

          for (const dp of result.rows._array) {
            products.push(
              new Product(dp.title, dp.price, dp.barCode, dp.imageUri, dp.id)
            );
          }
          resolve(products);
        },
        (_, error) => {
          console.log("Error!!!");
          reject(error);
        }
      );
    });
  });
  return promise;
}
export function deleteProduct(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM products WHERE id = ?`,
        [id],
        (_, result) => {},
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
export function deleteAll() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE products`,
        [],
        (_, result) => {},
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
export function init_operations() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS operations (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          price INTEGER NOT NULL,
          barCode INTEGER NOT NULL,
          imageUri TEXT,
          qty INTEGER NOT NULL,
          operationNumber TEXT NOT NULL
          )
        `,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
export function insertOperation(operation) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO operations (title,price,barCode,imageUri,qty,operationNumber)  VALUES (?,?,?,?,?,?)`,
        [
          operation.title,
          operation.price,
          operation.barCode,
          operation.imageUri,
          operation.qty,
          operation.operationNumber,
        ],
        (_, result) => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
export function fetchOperations() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM operations`,
        [],
        (_, result) => {
          const operations = [];

          for (const dp of result.rows._array) {
            operations.push(
              new Operation(
                dp.title,
                dp.price,
                dp.barCode,
                dp.imageUri,
                dp.qty,
                dp.operationNumber,
                dp.id
              )
            );
          }
          resolve(operations);
        },
        (_, error) => {
          console.log("Error!!!");
          reject(error);
        }
      );
    });
  });
  return promise;
}
