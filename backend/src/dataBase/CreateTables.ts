import { QueryResult } from "pg";

var connection = require('./connection.js');
connection.connect()
if(connection){
    console.log('database connection')
}

//Create table "Filials"
connection.query(`
    CREATE SCHEMA IF NOT EXISTS shawarma;
    CREATE TABLE shawarma."Filials"
  (
      "idFilial" serial NOT NULL,
      "filialTitle" character varying NOT NULL,
      lat numeric NOT NULL,
      lon numeric NOT NULL,
      phone character varying NOT NULL,
      adress character varying NOT NULL,
      email character varying NOT NULL,
      PRIMARY KEY ("idFilial")
  );
  
    ALTER TABLE IF EXISTS shawarma."Filials"
      OWNER to dnkwwjkgcebqou;
      `, (err: Error, res: QueryResult) => {
      if (err) throw err;
      if(res) {
        console.log('Table created')
      }
    });

//Create table "Products"
connection.query(`
    CREATE SCHEMA IF NOT EXISTS shawarma;
    CREATE TABLE shawarma."Products"
  (
      "idProduct" serial NOT NULL,
      title character varying NOT NULL,
      weight numeric NOT NULL,
      price numeric NOT NULL,
      type character varying NOT NULL,
      promo boolean NOT NULL,
      "imagePath" character varying,
      PRIMARY KEY ("idProduct")
  );
  
  ALTER TABLE IF EXISTS shawarma."Products"
    OWNER to dnkwwjkgcebqou;
  `, (err: Error, res: QueryResult) => {
    if (err) throw err;
    if(res) {
      console.log('Table created')
    }
  });

//Create table "Orders"
connection.query(`
  CREATE SCHEMA IF NOT EXISTS shawarma;

  CREATE TABLE shawarma."Orders"
(
    "idOrder" serial NOT NULL,
    name character varying NOT NULL,
    phone character varying NOT NULL,
    PRIMARY KEY ("idOrder")
);

  ALTER TABLE IF EXISTS shawarma."Orders"
    OWNER to dnkwwjkgcebqou;

`, (err: Error, res: QueryResult) => {
  if (err) throw err;
  if(res) {
    console.log('Table created')
  }
});

//Create table "Ingredients"
connection.query(`
CREATE TABLE shawarma."Ingredients"
(
    "idIngredient" serial NOT NULL,
    "ingredTitle" character varying NOT NULL,
    "ingredQuantity" integer NOT NULL,
    "Products_idProduct" serial NOT NULL,
    PRIMARY KEY ("idIngredient"),
    CONSTRAINT "Products_idProduct" FOREIGN KEY ("Products_idProduct")
        REFERENCES shawarma."Products" ("idProduct") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS shawarma."Ingredients"
    OWNER to dnkwwjkgcebqou;

`, (err: Error, res: QueryResult) => {
  if (err) throw err;
  if(res) {
    console.log('Table created')
  }
});

//Create table "OrderItem"
connection.query(`
    CREATE TABLE shawarma."OrderItem"
(
    "idOrderItem" serial NOT NULL,
    "productQuantity" integer NOT NULL,
    "Products_idProduct" serial NOT NULL,
    "Orders_idOrder" serial NOT NULL,
    PRIMARY KEY ("idOrderItem"),
    CONSTRAINT "Products_idProduct" FOREIGN KEY ("Products_idProduct")
        REFERENCES shawarma."Products" ("idProduct") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "Orders_idOrder" FOREIGN KEY ("Orders_idOrder")
        REFERENCES shawarma."Orders" ("idOrder") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS shawarma."OrderItem"
    OWNER to dnkwwjkgcebqou;
  `, (err: Error, res: QueryResult) => {
      if (err) throw err;
      if(res) {
        console.log('Table created')
      }
    });

//Create table "AddIngredient"
connection.query(`
      CREATE TABLE shawarma."AddIngredient"
(
    "newIngredQuantity" integer NOT NULL,
    "Ingredients_idIngredient" serial NOT NULL,
    "OrderItem_idOrderItem" serial NOT NULL,
    CONSTRAINT "Ingredients_idIngredient" FOREIGN KEY ("Ingredients_idIngredient")
        REFERENCES shawarma."Ingredients" ("idIngredient") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "OrderItem_idOrderItem" FOREIGN KEY ("OrderItem_idOrderItem")
        REFERENCES shawarma."OrderItem" ("idOrderItem") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS shawarma."AddIngredient"
    OWNER to dnkwwjkgcebqou;
    `, (err: Error, res: QueryResult) => {
        if (err) throw err;
        if(res) {
          console.log('Table created')
        }
      }); 