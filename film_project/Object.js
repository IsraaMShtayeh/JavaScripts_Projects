 class Film {
    title;
    director;
    release_year;
    genre;
    constructor(title, director, release_year, genre) {
      this.title = title;
      this.director = director;
      this.release_year = release_year;
      this.genre = genre;
    }
  }
  module.exports={
    Film,
  }