const utils = require('./Functions.js');
var readlineSync = require('readline-sync');
/* start */
const main = async () => {
    try {
      console.log(`
        ***************************
        Welcome 
        ***************************
        Select an action:
        1)Display Movie Catalog
        2)Add New Movie
        3)Delete  Movie
        4)Update  Movie
        5)Search 
        6)Fetch Movie Data
        ***************************
        `);
      // Wait for user's response.
      var choice = readlineSync.question('What is your choice ? ');
      switch (choice) {
        case "1":
         let films= await utils.readAFile();
          utils.print(films);
          break;
        case "2":
          await utils.addMovie();
          break;
        case "3":
          await utils.deleteMovie();
          break;
        case "4":
          await utils.updateMovie();
          break;
        case "5":
          await utils.searchMovie();
          break;
     
          case "6":
            await utils.fetchMovie();
            
            break;
        default:
          console.log("Enter the correct value from 1 to 8");
          break;
      }


 

    } catch (error) {
      console.error(`Error happened :'( == ${error}`);
    }


}

const func = async () => {
  await main();
  func();
}
//start
func();

