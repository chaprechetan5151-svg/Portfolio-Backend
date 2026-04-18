// ==========================================
// BLOCK 1: JAVASCRIPT FUNDAMENTALS
// (Press F12 in your browser to see these console.log results)
// ==========================================

// 1. Variables
const myName = "Chetan"; 
let projectCount = 1;    
projectCount = 2;        

// 2. Functions
const greetUser = () => {
    console.log("Hello, welcome to my portfolio!");
};
greetUser(); // Triggers the function above

// 3. Control Flow
let hour = 14;
if (hour < 12) {
    console.log("Good morning!");
} else {
    console.log("Good afternoon!");
}

// ==========================================
// BLOCK 2: THE DOM (Bridging JS and HTML)
// ==========================================

// Selecting Elements & Modifying Text
// This reaches into your HTML, finds the <h1> tag, and changes its text.
const heading = document.querySelector('h1');
heading.textContent = "Chetan's Developer Portfolio";

// ==========================================
// BLOCK 3: DARK MODE TOGGLE
// ==========================================

// 1. Grab the button and the body elements from the HTML
const themeButton = document.querySelector('#theme-toggle');
const bodyElement = document.querySelector('body');

// 2. Add the click listener to the button
themeButton.addEventListener('click', () => {
    
    // .toggle() adds the 'dark-theme' class if it is missing, 
    // and removes it if it is already there.
    bodyElement.classList.toggle('dark-theme');
    
    // 3. Change the button text based on the current theme
    if (bodyElement.classList.contains('dark-theme')) {
        themeButton.textContent = 'Light Mode';
    } else {
        themeButton.textContent = 'Dark Mode';
    }
});

// ==========================================
// BLOCK 4: FETCHING DATA FROM AN API (DAY 3)
// ==========================================

// 1. Grab the container where we will put the data
const testimonialContainer = document.querySelector('#testimonial-container');

// 2. Create an ASYNC function
const getTestimonial = async () => {
    try {
        // 3. AWAIT the fetch request to a fake user API
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        
        // 4. AWAIT the conversion of the response into JSON format
        const data = await response.json();
        
        // 5. Inject the dynamic data into our HTML
        // We use backticks ( ` ) for Template Literals to easily mix text and variables
        testimonialContainer.innerHTML = `
            <h3>${data.name}</h3>
            <p>"Fantastic developer to work with. Highly recommend for freelance projects!"</p>
            <small>- Works at ${data.company.name}</small>
        `;
    } catch (error) {
        // If the server is down or the internet disconnects, handle the error gracefully
        testimonialContainer.innerHTML = `<p>Failed to load testimonial.</p>`;
        console.error("Error fetching data:", error);
    }
};

// 6. Trigger the function so it runs when the page loads
getTestimonial();

// ==========================================
// BLOCK 5: SENDING DATA FROM FRONTEND TO BACKEND
// ==========================================

// 1. Grab the HTML elements
const categoryInput = document.querySelector('#skill-category');
const techInput = document.querySelector('#skill-tech');
const submitBtn = document.querySelector('#add-skill-btn');
const formMessage = document.querySelector('#form-message');

// 2. Add a click event listener to the button
submitBtn.addEventListener('click', async () => {
    // Grab the text the user typed in
    const categoryValue = categoryInput.value;
    const techValue = techInput.value;

    // Basic validation to make sure fields aren't empty
    if (!categoryValue || !techValue) {
        formMessage.style.color = "red";
        formMessage.innerText = "Please fill out both fields!";
        return;
    }

    try {
        formMessage.style.color = "blue";
        formMessage.innerText = "Sending to database...";

        // 3. The Fetch POST Request
        const response = await fetch('http://localhost:3000/api/skills', {
            method: 'POST', // Tell the server we are SENDING data
            headers: {
                'Content-Type': 'application/json' // Tell the server it's JSON format
            },
            body: JSON.stringify({
                category: categoryValue,
                technologies: techValue
            })
        });

        const data = await response.json();

        // 4. Handle the success
        if (response.ok) {
            formMessage.style.color = "green";
            formMessage.innerText = "Success! Skill added to database.";
            
            // Clear the input boxes
            categoryInput.value = '';
            techInput.value = '';

            // Refresh the skills list on the page to show the new data
            getMySkills(); 
        } else {
            formMessage.style.color = "red";
            formMessage.innerText = "Server Error: Could not save skill.";
        }

    } catch (error) {
        console.error("Error:", error);
        formMessage.style.color = "red";
        formMessage.innerText = "Make sure your backend server is running!";
    }
});

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // This is key for cloud providers like Render
  }
});