let breakingImg = document.querySelector('#breakingImg')
let breakingNews_title = document.querySelector('#breakingNews .title')
let breakingNews_desc = document.querySelector('#breakingNews .description')
let topNews = document.querySelector('.topNews')
let sportsNews = document.querySelector('#sportsNews .newsBox')
let businessNews = document.querySelector('#businessNews .newsBox')
let techNews = document.querySelector('#techNews .newsBox')

let header = document.querySelector('.header')
let toggleMenu = document.querySelector('.bar')
let menu = document.querySelector('nav ul')

const toggle = (e)=>{
    toggleMenu.classList.toggle('active')
    menu.classList.toggle('activeMenu')
}

toggleMenu.addEventListener('click',toggle)



window.addEventListener('scroll',()=>{
    if(window.scrollY>50){
        header.classList.add('sticky')
    }
    else{
        header.classList.remove('sticky')
    }
})







// fetching news data from a website providing api

const apiKey = ""

const fetchData = async (category,pageSize)=>{
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`
    const data = await fetch(url)
    const response = await data.json()
    console.log(response);
    return response.articles
    
}
// fetchData('general',5)

//adding breaking news

const add_breakingNews = (data)=>{
    breakingImg.innerHTML = `<img src=${data[0].urlToImage} alt="image">`
    breakingNews_title.innerHTML = `<a href=${data[0].url} target="_blank"><h2>${data[0].title}</h2></a>`
    breakingNews_desc.innerHTML = `${data[0].description}`
}
fetchData('general',5).then(add_breakingNews)

const add_topNews = (data)=>{
    let html = ''
    let title = ''
    data.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="news">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    topNews.innerHTML = html
}
fetchData('general',20).then(add_topNews)

const add_sportsNews = (data)=>{
    let html = ''
    let title = ''
    data.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="newsCard">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    sportsNews.innerHTML = html
}
fetchData('sports',5).then(add_sportsNews)
const add_businessNews = (data)=>{
    let html = ''
    let title = ''
    data.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="newsCard">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    businessNews.innerHTML = html
}
fetchData('business',5).then(add_businessNews)
const add_techNews = (data)=>{
    let html = ''
    let title = ''
    data.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="newsCard">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    techNews.innerHTML = html
}
fetchData('technology',5).then(add_techNews)



 // date/time
 document.addEventListener('DOMContentLoaded', function() {
    const clock = document.getElementById('clock');
});

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

// Format time as HH:MM:SS
hours = hours < 10 ? '0' + hours : hours;
minutes = minutes < 10 ? '0' + minutes : minutes;
seconds = seconds < 10 ? '0' + seconds : seconds;

const timeString = hours + ':' + minutes + ':' + seconds;
document.getElementById('clock').textContent = timeString;
}

function startClock() {
updateClock();
setInterval(updateClock, 1000); // Update the clock every second
}

window.onload = startClock;

/*=============== SEARCH ===============*/
const search = document.getElementById('search'),
      searchBtn = document.getElementById('search-btn'),
      searchClose = document.getElementById('search-close')

/* Search show */
searchBtn.addEventListener('click', () =>{
   search.classList.add('show-search')
})

/* Search hidden */
searchClose.addEventListener('click', () =>{
   search.classList.remove('show-search')
})







 // Function to open the popup
 function openPopup(image) {
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    popup.style.display = "block";
    popupImg.src = image.src;
}

// Function to close the popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}



















// Select the slider container
const slider = document.querySelector('.slider');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let animationID = 0;

// Event listeners for mouse and touch events
slider.addEventListener('mousedown', startDrag);
slider.addEventListener('touchstart', startDrag);

slider.addEventListener('mouseup', endDrag);
slider.addEventListener('mouseleave', endDrag);
slider.addEventListener('touchend', endDrag);

slider.addEventListener('mousemove', drag);
slider.addEventListener('touchmove', drag);

// Get X position of event (mouse or touch)
function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Start drag event
function startDrag(event) {
    isDragging = true;
    startPosition = getPositionX(event);
    slider.classList.add('grabbing');
    animationID = requestAnimationFrame(animation);
}

// End drag event
function endDrag() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    slider.classList.remove('grabbing');

    // Snapping logic
    const movedBy = currentTranslate - previousTranslate;
    const cardWidth = slider.querySelector('.slider-card').offsetWidth + 15; // Card width + margin
    const direction = movedBy > 0 ? 1 : -1;

    if (Math.abs(movedBy) > cardWidth / 3) {
        previousTranslate += direction * cardWidth;
    }
    currentTranslate = previousTranslate;
    setSliderPosition();
}

// Drag event
function drag(event) {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    currentTranslate = previousTranslate + currentPosition - startPosition;
}

// Animate the slider
function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

// Set the slider position
function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

// Navigation buttons for manual slide control
let sliderCards = document.querySelectorAll('.slider-card');
let cardWidth = sliderCards[0].offsetWidth + 15; // Card width + margin

// Previous and next buttons
document.querySelector('.next').addEventListener('click', () => {
    if (previousTranslate > -(sliderCards.length - 3) * cardWidth) {
        previousTranslate -= cardWidth;
        currentTranslate = previousTranslate;
        setSliderPosition();
    }
});

document.querySelector('.prev').addEventListener('click', () => {
    if (previousTranslate < 0) {
        previousTranslate += cardWidth;
        currentTranslate = previousTranslate;
        setSliderPosition();
    }
});
