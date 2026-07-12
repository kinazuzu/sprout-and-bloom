console.log("catalog.js loaded!");

const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".product-card");

const difficultyFilters = document.querySelectorAll(".difficulty-filter");
const waterFilters = document.querySelectorAll(".water-filter");

function getSelected(filters) {
    return [...filters]
        .filter(filter => filter.checked)
        .map(filter => filter.value);
}

function filterPlants() {

    const search = searchInput.value.toLowerCase();

    const selectedDifficulty = getSelected(difficultyFilters);

    const selectedWater = getSelected(waterFilters);

    cards.forEach(card => {

        const name = card.dataset.name.toLowerCase();

        const difficulty = card.dataset.difficulty;

        const water = card.dataset.water;

        const matchesSearch = name.includes(search);

        const matchesDifficulty =
            selectedDifficulty.length === 0 ||
            selectedDifficulty.includes(difficulty);

        const matchesWater =
            selectedWater.length === 0 ||
            selectedWater.includes(water);

        if (matchesSearch && matchesDifficulty && matchesWater) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}

searchInput.addEventListener("input", filterPlants);

difficultyFilters.forEach(filter => {

    filter.addEventListener("change", filterPlants);

});

waterFilters.forEach(filter => {

    filter.addEventListener("change", filterPlants);

});

filterPlants();