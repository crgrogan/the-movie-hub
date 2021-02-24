// Get genre name from id
export const getGenre = (id, genresList) => {
  let chosenGenre = genresList.find((genre) => genre.id === id);
  if (chosenGenre) {
    return chosenGenre.name;
  } else {
    return "";
  }
};
