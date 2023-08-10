import * as SQLite from "expo-sqlite";
import { Product } from "../model/product";

const database = SQLite.openDatabase("products.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS products (
                      id INTEGER PRIMARY KEY NOT NULL,
                      title TEXT NOT NULL,
                      price INTEGER NOT NULL,
                      barcode INTEGER NOT NULL
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
        `INSERT INTO products (title,price,barCode)  VALUES (?,?,?)`,
        [product.title, product.price, product.barCode],
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
            products.push(new Product(dp.title, dp.price, dp.barCode, dp.id));
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
        `SELECT * FROM products WHERE barcode = ?`,
        [barcode],
        (_, result) => {
          const products = [];

          for (const dp of result.rows._array) {
            products.push(new Product(dp.title, dp.price, dp.barCode, dp.id));
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
