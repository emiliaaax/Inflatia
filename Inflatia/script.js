
document.addEventListener('DOMContentLoaded', function() {

    const navLinks = document.querySelectorAll('nav a');
    

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {

            navLinks.forEach(l => l.classList.remove('active'));
            

            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', function() {
        let currentSection = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2c3e50;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        font-size: 20px;
        transition: background-color 0.3s;
    }
    
    .back-to-top:hover {
        background-color: #34495e;
    }
    
    nav a.active {
        background-color: #2c3e50;
    }
`;
document.head.appendChild(style);

const correctAnswers = {
    q1: 'b', // 25%
    q2: 'b', // 3um
    q3: 'a', // 125 dacă prețul în perioada de bază a fost 8 um
    q4: 'b', // 1440, 2160, 150%
    q5: 'a', // A scăzut cu 0,334 lei
    q6: 'b'  // Puterea de cumpărare a leului este de 0,80 lei
};

document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let score = 0;
    
    for (let i = 1; i <= 6; i++) {
        const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        const resultDiv = document.getElementById(`result${i}`);
        
        if (selectedAnswer) {
            if (selectedAnswer.value === correctAnswers[`q${i}`]) {
                score++;
                resultDiv.textContent = 'Răspuns corect!';
                resultDiv.className = 'result correct';
            } else {
                resultDiv.textContent = 'Răspuns incorect. Răspunsul corect este: ' + 
                    document.querySelector(`label[for="q${i}${correctAnswers[`q${i}`]}"]`).textContent;
                resultDiv.className = 'result incorrect';
            }
        } else {
            resultDiv.textContent = 'Vă rugăm să selectați un răspuns';
            resultDiv.className = 'result incorrect';
        }
    }

    const scoreDiv = document.getElementById('score');
    scoreDiv.textContent = `Scorul dvs: ${score} din 6 (${Math.round(score/6*100)}%)`;
}); 