function handleSubmit(event) {
  event.preventDefault();
  // check what text was put into the form field
  let formText = document.getElementById("extract").value;
  console.log(formText);
  Client.checkTextSentiment(formText);

  fetch("http://localhost:8080/test")
    .then((res) => res.json())
    .then(function (res) {
      document.getElementById("results").innerHTML = res.message;
      console.log("::: API Call Successful :::");
    });
}

export { handleSubmit };
