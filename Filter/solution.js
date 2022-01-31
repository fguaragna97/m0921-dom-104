const API_URL = "https://randomuser.me/api?results=50";
const result = document.getElementById("result");
const filter = document.getElementById("filter");
const searchInput = document.querySelector("#filter");

async function getData() {
  const response = await fetch(API_URL);
  const { results } = await response.json();

  //clear result
  result.innerHTML = "";

  // render result
  renderData(results);

  // event handler on search
  searchInput.addEventListener("keydown", (e) => {
    let inputChar = e.target.value.toLowerCase();

    if (!inputChar) return;
    const filteredResults = filterData(results, inputChar);
    renderData(filteredResults);
  });
}
getData();

const renderData = (results) => {
  const html = results
    .map((result) => {
      return `
              <li>
                  <img src='${result.picture.large}'>
                  <div class='user-info'>
                      <h4>${result.name.first} ${result.name.last}</h4>
                      <p>${result.location.state}, ${result.location.country}</p>
                  </div>
              </li>
          `;
    })
    .join("");
  result.innerHTML = html;
  //   console.log(html);
};

const filterData = (results, input) => {
  const filteredData = results.filter((result) => {
    const resultStr =
      result.name.first.toLowerCase() +
      result.name.last.toLowerCase() +
      result.location.state.toLowerCase() +
      result.location.country.toLowerCase();

    return resultStr.includes(input);
  });
  return filteredData;
};
