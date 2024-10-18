let reviews = []
const selectElement = document.getElementById('categories');
const generateButton = document.getElementById('generate');

toggle_reviews(false)
toggle_recommendations(false);

fetch('/data?action=categories', {
    method: 'GET'
}).then(response => response.text()).then(data => {
    const payload = JSON.parse(data)
    reviews = payload.categories;

    reviews.forEach(item => {
        const optionElement = document.createElement('option');
        optionElement.value = item.category;
        optionElement.textContent = item.category;
        selectElement.appendChild(optionElement);
    });
});

selectElement.addEventListener('change', (event) => {
    const selectedValue = event.target.value;

    fetch('/data?action=top_3', {
        method: 'GET'
    }).then(response => response.text()).then(data => {
        const payload = JSON.parse(data)
        const items = payload.filter((element) => element.predicted_categorie === selectedValue);
        const best = items.filter((element) => element.label === 'best');
        const worst = items.filter((element) => element.label === 'worst');

        display_top_3(best, 'best')
        display_top_3(worst, 'worst')

        toggle_recommendations(true);
    });

    const review = reviews.find((element) => element.category === selectedValue);
    document.getElementById('review_title').textContent = review.product;
    document.getElementById('review_text').innerHTML = `<b>${review.intro}</b><br/>${review.review}`;

    toggle_reviews(true);
});

generateButton.addEventListener('click', (_event) => {
    const product = document.getElementById('product').value;
    const sentiment = document.getElementById('sentiment').value;
    generate_review(product, sentiment)
})

function display_top_3(items, label) {
    const list = document.getElementById(label);
    let content = '';
    items.forEach((item) => {
        content += `<li>${item.name}</li>`
    })
    list.innerHTML = content;
}

function toggle_reviews(show) {
    const reviewSection = document.getElementById('reviews');
    reviewSection.style.display = show ? 'block' : 'none';
}

function toggle_recommendations(show) {
    Array.from(document.getElementsByClassName('recommendations')).forEach(block => {
        block.style.display = show ? 'block' : 'none';
    })
}

function generate_review(product, sentiment) {
    fetch(`/data?action=generate&query=${product}&sentiment=${sentiment}` , {
        method: 'GET'
    }).then(response => response.text()).then(data => {
        const payload = JSON.parse(data)
        document.getElementById('generated_review').value = payload.review;
    });
}