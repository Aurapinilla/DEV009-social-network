function error() {
  const title = document.createElement('h2');
  title.textContent = 'Error 404 page not found. Please go back to the main page';
  return title;
}

export default error;
