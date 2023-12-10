class RatingWidget extends HTMLElement {
    constructor() {
        super();

        this.jsForm = document.createElement('form');
        this.jsForm.classList.add('js-form');
        this.jsForm.action = 'https://httpbin.org/post';
        this.jsForm.method = 'POST';
        this.jsForm.style.display = 'block';

        this.question = document.createElement('input');
        this.question.type = 'hidden';
        this.question.name = 'question';
        this.question.value = 'How satisfied are you?';

        this.rating = document.createElement('input');
        this.rating.type = 'hidden';
        this.rating.name = 'rating';
        this.rating.value = '';

        this.starList = document.createElement('div');
        this.starList.classList.add('stars');
        this.stars = [];
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.id = i;
            star.classList.add('star');
            star.innerHTML = '&#x2605;';
            this.addStarEvents(star, i);
            this.starList.appendChild(star);
            this.stars.push(star);
        };

        this.output = document.createElement('output');
        this.output.classList.add('info-message');
        this.output.setAttribute('type', 'hidden');
        this.output.htmlFor = 'rating';
        
        this.jsForm.appendChild(this.question);
        this.jsForm.appendChild(this.rating);
        this.jsForm.appendChild(this.starList);
        this.jsForm.appendChild(this.output);

        this.appendChild(this.jsForm);
    }

    addStarEvents(star, id) {
        star.addEventListener('mouseover', () => {
            this.setStarColors(id);
        });
        star.addEventListener('mouseout', () => {
            this.resetStarColors();
        });
        star.addEventListener('click', (event) => {
            event.preventDefault();
            this.rating.value = id;
            if (id >= 3) {
                this.output.value = `Thanks for ${id} star rating!`;
            } else {
                this.output.value = `Thanks for your feedback of ${id} stars. We'll try to do better!`;
            }
            this.starList.style.display = 'none';
            this.output.style.display = 'block';
            
            let newForm = new FormData(this.jsForm);
            newForm.append("sentBy", "JS");
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://httpbin.org/post", true);
            xhr.setRequestHeader("X-Sent-By", "JS");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                }
            };
            xhr.send(newForm);
        });
    }

    setStarColors(starid) {
        for (let i = 0; i < this.stars.length; i++) {
            if (i < starid) {
                this.stars[i].style.color = 'gold';
            } else {
                this.stars[i].style.color = 'grey';
            }
        }
    }

    resetStarColors() {
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].style.color = 'grey';
        }
    }
}

customElements.define("rating-widget", RatingWidget);
