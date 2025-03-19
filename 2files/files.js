const fs = require("fs");


// console.log(__filename); //file path
// console.log(__dirname); //directory path

// //read file
// fs.readFile('./blog1.txt', (err, data) => { //this is async that means this will get sometime to do...
//     if (err) {
//         console.log(err);
//     }
//     console.log(data) //output buffer, package of data thats been sent to us when we rea this file
//     console.log(data.toString());
// });

// //write file
// fs.writeFile("./blog1.txt",'hello,world', () => {
//     console.log('file was written')
// })

// //creating new file
// fs.writeFile("./blog2.txt",'hello,worlddddd', () => {
//     console.log('file was written')
// })

/* Directories */

// if (!fs.existsSync("./assests")) {
//   //existsSync is a async method
//   fs.mkdir("./assests", (err) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log("directory created");
//   });
// } else {
//     fs.rmdir('./assests', (err) => {
//         if (err) {
//             console.error(err);
//         }
//         console.log('directory deleted')
//     }) 
// }

// deleting files

// if (fs.existsSync('./deleteme.txt')) {
//     fs.unlink('./deleteme.txt', (err) => {
//         if (err) {
//             console.error(err);
//         }
//         console.log('file deleted')
//     })
// }

/* Streams */



