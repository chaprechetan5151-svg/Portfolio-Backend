// 1. The URL of your LIVE Render Backend
const API_URL = 'https://portfolio-backend-og3w.onrender.com/api/skills';

// 2. Function to FETCH skills from the Database
async function fetchSkills() {
    const container = document.getElementById('skills-container');
    
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Clear the "Loading..." message
        container.innerHTML = ''; 

        if (data.length === 0) {
            container.innerHTML = '<p>No skills added yet.</p>';
            return;
        }

        // Loop through data and show it on the page
        data.forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = 'project-card';
            skillCard.innerHTML = `
                <strong>${skill.category}:</strong> ${skill.technologies}
            `;
            container.appendChild(skillCard);
        });
    } catch (error) {
        console.error("Fetch Error:", error);
        container.innerHTML = '<p style="color: red;">Failed to load skills. Check if Backend is live!</p>';
    }
}

// 3. Function to ADD a new skill (for your Admin Panel)
const addBtn = document.getElementById('add-skill-btn');
if (addBtn) {
    addBtn.addEventListener('click', async () => {
        const category = document.getElementById('skill-category').value;
        const technologies = document.getElementById('skill-tech').value;
        const message = document.getElementById('form-message');

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category, technologies })
            });

            if (response.ok) {
                message.innerText = "Skill added! Refreshing...";
                setTimeout(() => location.reload(), 1500);
            }
        } catch (error) {
            message.innerText = "Error adding skill.";
        }
    });
}

// 4. Run the fetch function when the page loads
fetchSkills();

// 5. Secret Admin Key: Type 'admin' on your keyboard to show the form
let keys = '';
window.addEventListener('keydown', (e) => {
    keys += e.key;
    if (keys.includes('admin')) {
        const adminSection = document.getElementById('admin-section');
        if (adminSection) adminSection.style.display = 'block';
        keys = ''; 
    }
});