async function loadVenues() {

  try {

    const response = await fetch(
      "https://raw.githubusercontent.com/Web-learning/joburg-culture-map/refs/heads/main/data.json"
    );

    const data = await response.json();

    renderVenues(data);

  } catch(error) {

    console.error(error);

    document.getElementById(
      "venue"
    ).innerHTML = `
      <div style="
        padding:40px;
        font-family:sans-serif;
        color:red;
      ">
        Failed to load presentation JSON.
      </div>
    `;
  }
}
