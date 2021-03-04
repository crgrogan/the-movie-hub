// Get genre name from id
export const getGenre = (genreId, genresList) => {
  let chosenGenre = genresList.find((genre) => genre.id === genreId);
  if (chosenGenre) {
    return chosenGenre.name;
  } else {
    return "";
  }
};
