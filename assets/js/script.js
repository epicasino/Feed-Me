fetch("GET https://api.spoonacular.com/recipes/complexSearch")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    // Process the response data
    console.log(data);
  })
  .catch((error) => {
    // Handle any errors that occurred during the request
    console.error(error);
  });
