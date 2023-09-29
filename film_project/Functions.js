const obj = require('./Object.js');
const fs = require('fs');
var readlineSync = require('readline-sync');
var films=[] ;
 const addMovie = async () => {
    let title = readlineSync.question('Title: ');
    let director = readlineSync.question('Director: ');
    let release_year = readlineSync.question('Release Year: ');
    let genre = readlineSync.question('Genre: ');
    const f = new obj.Film(title, director, release_year, genre);
    await appendToJSON([f]);
  };
  //
   const appendToJSON = async (f) => {
    try {
      await readAFile();
      films.push(...f);
      await fs.promises.writeFile("film.json", JSON.stringify(films));
    }
    catch (err) {
      console.log(err)
    }
  }
  //
   const readAFile = async () => {
    
    try {
      const data = await fs.promises.readFile('film.json', 'utf8');
      if (data.length != 0) {
        films = JSON.parse(data);
      } else {
        films = [];
      }
  return films;
    }
    catch (err) {
      console.log(err)
    }
  }
  //
   const print =  (array) => {
    array.forEach((element, index) => {
      console.log("ID:" + index + " [Title: " + element.title + "," + " Director: " + element.director + "," + " Release Year: " + element.release_year + "," + " Genre: " + element.genre + "]");
    });
  }
  //
  const deleteMovie = async () => {
    try {
      await readAFile();
      print(films);
      let id = readlineSync.question('Choose film ID : ');
      films.splice(id, 1);
      await fs.promises.writeFile("film.json", JSON.stringify(films));
    }
    catch (err) {
      console.log(err)
    }
  }
  //
  const updateMovie = async () => {
    await readAFile();
    print(films);
    let id = Number(readlineSync.question('Choose film ID : '));
    console.log(`
          Select the properties you want to edit:
          Note: Enter number from 1 to 4:
          1)Title
          2)Director
          3)Release Year
          4)Genre
          `);
    let p = Number(readlineSync.question('What is your choice ? '));
    let newValue = readlineSync.question('Enter new value: ');
    switch (p) {
      case 1:
        films[id].title = newValue;
        break;
      case 2:
        films[id].director = newValue;
        break;
      case 3:
        films[id].release_year = newValue;
        break;
      case 4:
        films[id].genre = newValue;
        break;
      default:
        break;
    }
    await fs.promises.writeFile("film.json", JSON.stringify(films));
  }
  //
   const searchMovie = async () => {
    await readAFile();
    console.log(`
          search for movies by 
          Note:Enter number from 1 to 4:
          1)Title
          2)Director
          3)Genre
          4)Release Year
          `);
    let p = Number(readlineSync.question('What is your choice ? '));
    let value = readlineSync.question('Search: ');
    value=value.toLowerCase();
    console.log("Result: ");
    if (p == 1) {
      let r = films.filter((element) => element.title.toLowerCase() == value);
      print(r);
     
      
    } else if (p == 2) {
      let r = films.filter((element) => element.director.toLowerCase() == value);
      print(r);
    } else if (p == 3) {
      let r = films.filter((element) => element.genre.toLowerCase() == value);
      print(r);
    } else if (p == 4) {
      let r = films.filter((element) => element.release_year == value);
      print(r);
    }
  
  }
  //

const fetchMovie= async ()=>{
  // const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr';
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': 'd337af2c08msh8bde47234050f5ep1dd1ecjsn132787d4d4bc',
  //     'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  //   }
  // };

    await fetch("https://my-json-server.typicode.com/Mohammad-Abohasan/Movie-Catalog-CLI-App/blob/master/Movie", { method: 'GET' })
  .then(async res => {
    const data = await res.json();
   let f=[];
    data.forEach(async(e)=>{
     f.push(new obj.Film(e.title,e.director,e.year,e.genre));
        
    })
    await appendToJSON(f);

  })
  .catch(err => {
    console.log("Failed to get the data!");
    console.log(err);
  });
 

}
  module.exports = {
    searchMovie,
    addMovie,
    appendToJSON,
    readAFile,
    print,
    deleteMovie,
    updateMovie,
    fetchMovie
  }