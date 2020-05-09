function checkTextSentiment(inputText) {
  inputText == "" || inputText.length > 50
    ? alert("Enter Text up to 50 Characters")
    : postData("http://localhost:8080/add", { extract: inputText }).then(() => {
        getData("http://localhost:8080/sentiment").then((data) => {
          console.log("::: Analysing Text :::", inputText);
          console.log("This is the data from the server ", data);
          document.getElementById("response").innerHTML = `
          <h2>Results</h2>
          <p>Text Analysed:  ${data.text}</p>
          <p>The Subjectivity was rather ${Math.round(
            data.subjectivity_confidence * 100
          )}% ${data.subjectivity}.</p>
          <p>We found the Polarity to be ${
            data.polarity
          } and we are ${Math.round(data.polarity_confidence * 100)}%
          confident about this.
            </p>
            <p></p>
          `;
        });
      });
}

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
  } catch (error) {
    console.log("Error:", error);
  }
};

const getData = async (url) => {
  const apiData = await fetch(url);

  try {
    const data = await apiData.json();
    return data;
  } catch (error) {
    console.log("Error! ", error);
  }
};

export { checkTextSentiment };
