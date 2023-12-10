document.addEventListener("DOMContentLoaded", function () {
    let jsForm = document.querySelector(".js-form");

    let star_list = document.querySelector(".stars");
    let stars = document.querySelectorAll(".star");
    let output = document.querySelector(".info-message");
    let rating_val = document.getElementById("ratingValue");

    for (let i = 0; i < stars.length; i++) {
        stars[i].addEventListener("mouseover", () => {
            setStarColors(i);
        });
        stars[i].addEventListener("mouseout", () => {
            resetStarColors();
        });
        stars[i].addEventListener("click", (event) => {
            event.preventDefault();
            let rating = stars[i].id;
            rating_val.value = rating;
            if (i >= 3) {
                output.value = "Thanks for " + rating + " star rating!";
            } else {
                output.value =
                    "Thanks for your feedback of " +
                    rating +
                    " stars. We'll try to do better!";
            }
            output.style.display = "block";
            star_list.style.display = "none";

            let newForm = new FormData(jsForm);
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

    let setStarColors = (star_index) => {
        for (let i = 0; i < stars.length; i++) {
            if (i <= star_index) {
                stars[i].style.color = "gold";
            } else {
                stars[i].style.color = "grey";
            }
        }
    };

    let resetStarColors = () => {
        for (let i = 0; i < stars.length; i++) {
            stars[i].style.color = "grey";
        }
    };
    
    jsForm.style.display = "block";
});