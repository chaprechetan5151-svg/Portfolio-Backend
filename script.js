// ==========================================
// CONFIGURATION & STATE
// ==========================================
const API_URL = 'https://portfolio-backend-og3w.onrender.com/api/skills';

// ==========================================
// FEATURE 1: DYNAMIC SKILL LOADER (With Animations)
// ==========================================
const loadSkills = async () => {
    const container = document.querySelector('#skills-container');
    if (!container) return;

    try {
        const response = await fetch(API_URL);
        const skills = await response.json();

        // Clear loading state
        container.innerHTML = '';

        if (skills.length === 0) {
            container.innerHTML = `<p class="bio">No skills found. Use the admin panel to add some!</p>`;
            return;
        }

        // Feature: Staggered Animation Injection
        skills.forEach((skill, index) => {
            const card = document.createElement('div');
            card.className = 'project-card animate-in';
            card.style.animationDelay = `${index * 0.1}s`; // Stagger effect
            
            card.innerHTML = `
                <h3 style="color: var(--accent-color, #ff4d6d); margin-bottom: 5px;">${skill.category}</h3>
                <p>${skill.technologies}</p>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = `<p style="color: #ff4d6d;">⚠️ Connection lost to cloud database.</p>`;
        console.error("Cloud Fetch Error:", error);
    }
};

// ==========================================
// FEATURE 2: ADVANCED FORM HANDLING
// ==========================================
const setupAdminPanel = () => {
    const submitBtn = document.querySelector('#add-skill-btn');
    if (!submitBtn) return;

    submitBtn.addEventListener('click', async () => {
        const category = document.querySelector('#skill-category').value.trim();
        const tech = document.querySelector('#skill-tech').value.trim();
        const msg = document.querySelector('#form-message');

        if (!category || !tech) {
            msg.style.color = "#ff4d6d";
            msg.innerText = "Fields cannot be empty!";
            return;
        }

        // UI Feedback: Disable button during fetch
        submitBtn.disabled = true;
        submitBtn.innerText = "Syncing with Cloud...";

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category, technologies: tech })
            });

            if (response.ok) {
                msg.style.color = "#2ecc71";
                msg.innerText = "✨ Database updated successfully!";
                document.querySelector('#skill-category').value = '';
                document.querySelector('#skill-tech').value = '';
                loadSkills(); // Refresh the list without reloading the whole page
            }
        } catch (err) {
            msg.innerText = "Error: Database unreachable.";
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = "Add Skill to Database";
        }
    });
};

// ==========================================
// FEATURE 3: SECRET ADMIN ACCESS (Keyboard Shortcut)
// ==========================================
let combo = "";
window.addEventListener('keydown', (e) => {
    combo += e.key.toLowerCase();
    if (combo.includes("admin")) {
        const panel = document.querySelector('#admin-section');
        if (panel) {
            panel.style.display = "block";
            panel.scrollIntoView({ behavior: 'smooth' });
        }
        combo = "";
    }
    // Reset combo if it gets too long
    if (combo.length > 10) combo = "";
});

// ==========================================
// INITIALIZE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadSkills();
    setupAdminPanel();
});