// FILE SYSTEMS

const http = require("http");
const url = require("url");
const replaceTemplates = require("./replace");
const myModules = require("./myFiles");
const express = require("express"); //to call the third party function
const app = express(); //to activate the function

// const canEat = require("./app");
// const { writeFile } = require("fs/promises");
// const { response } = require("express");
// const res = require("express/lib/response");
// const { contentType } = require("express/lib/response");
// console.log("1: START");
// const input = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(`2: ${input}`);

// const append = fs.readFileSync("./txt/append.txt", "utf-8");
// console.log(`3: ${append}`);
// const myText = `this is what i kow about avocados: ${input}`;
// const newText = fs.writeFileSync("./txt/new.txt", myText);

// console.log(append, newText);

// const data = fs.readFileSync("./txt/new.txt", "utf-8");
// console.log(data);

// console.log(`4: ${data}`);
// console.log("5: END");

// // ASYNCHRONOUS ARCHITECTURE

// fs.readFile("./txt/new.txt", "utf-8", (err, data) => {
//   console.log(data);
// });

// fs.writeFile("./txt/output.txt", myText, (err) => {
//   console.log(`4: File has been written successfullt`);
// });

// // using asynchronous code, create a file with a title : final
// // content: all you need to know about avocados:
// // all the text from the 3 files append, input and output

// const finalText = "all you need to know about avocados:";

// fs.writeFile("./txt/final.txt", finalText, (error) => {
//   console.log(`hello`);
// });

// fs.readFile("./txt/final.txt", "utf-8", (err, finalText) => {
//   console.log("howdy");
// });

// // read start(read this (input (write final with the combination of input, read this and append)) \n(new lines)

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`${__dirname}/read-this.txt`, "utf-8", (err, data1) => {
//     fs.readFile("./txt/input.txt", "utf-8", (err, data2) => {
//       fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//         fs.writeFile(
//           "./txt/finalText.txt",
//           `${data2}\n ${data1} \n ${data3}`,
//           (err) => {
//             console.log("file has been stored successfully!");
//           }
//         );
//       });
//     });
//   });
// });

// const api = fs.readFileSync(`${__dirname}/dev-data/data.json`);

const dataObj = JSON.parse(myModules.dataStr);

// REPLACE PLACEHOLDER FUNCTION

// server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const eachData = dataObj
      .map((fruit) => replaceTemplates(myModules.eachCard, fruit))
      .join("");
    const finalOutput = myModules.overview.replace(
      "[%PRODUCT_OVERVIEW%]",
      eachData
    );
    res.end(finalOutput);
    // } else if (pathname === "/api") res.end(myModules.dataStr);
  } else if (pathname === "/product") {
    const newProduct = dataObj[query.id];
    const finalOutput = replaceTemplates(myModules.product, newProduct);
    res.end(finalOutput);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(myModules.dataStr);
  } else if (pathname === "/about") res.end(`welcome, the About says hello! `);
  else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello there, you made a wrong input",
    });
    res.end(
      "<h1 style = 'text-align: center; color: red;'>Error 404, page not found </h1>"
    );
  }
});
const PORT = process.env.PORT || 9000; //to check it on the dom (127.0.0.1:4000) / port number
server.listen(PORT, "127.0.0.1", () => {
  console.log(`listening on port ${PORT}`);
});

// HTML TEMPLATING

//read http headers
