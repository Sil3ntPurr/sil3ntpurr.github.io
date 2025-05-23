document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé');
    const modal = document.getElementById('modal');
    const sideMenu = document.querySelector('.side-menu');
    const burgerMenu = document.querySelector('.burger-menu');
    const closeButton = document.querySelector('.close-menu');
    const sections = document.querySelectorAll('.modal-body section');
    const skillCards = document.querySelectorAll('.skill-card');

    console.log('Burger menu:', burgerMenu);
    console.log('Side menu:', sideMenu);
    console.log('Close button:', closeButton);

    if (burgerMenu && sideMenu) {
        burgerMenu.addEventListener('click', (e) => {
            console.log('Clic sur le burger menu');
            e.stopPropagation();
            burgerMenu.classList.toggle('active');
            sideMenu.classList.toggle('active');
            console.log('Classes après toggle:', {
                burger: burgerMenu.classList.contains('active'),
                side: sideMenu.classList.contains('active')
            });
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sideMenu.contains(e.target) && !burgerMenu.contains(e.target)) {
                    console.log('Clic en dehors du menu');
                    burgerMenu.classList.remove('active');
                    sideMenu.classList.remove('active');
                }
            }
        });

        sideMenu.addEventListener('click', (e) => {
            console.log('Clic dans le menu');
            e.stopPropagation();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                console.log('Redimensionnement > 768px');
                burgerMenu.classList.remove('active');
                sideMenu.classList.remove('active');
            }
        });

        const menuLinks = sideMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    console.log('Clic sur un lien');
                    burgerMenu.classList.remove('active');
                    sideMenu.classList.remove('active');
                }
            });
        });

        if (closeButton) {
            closeButton.addEventListener('click', () => {
                console.log('Clic sur le bouton de fermeture');
                burgerMenu.classList.remove('active');
                sideMenu.classList.remove('active');
            });
        }
    }

    setTimeout(() => {
        modal.classList.add('active');
    }, 500);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    skillCards.forEach(card => {
        observer.observe(card);
    });

    const navLinks = document.querySelectorAll('.side-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                    
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else {
                window.location.href = href;
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        scrollObserver.observe(section);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const searchInput = document.querySelector('.search-box input');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.dataset.category;
                filterBlogCards(category);
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterBlogCards('all', searchTerm);
        });
    }

    function filterBlogCards(category, searchTerm = '') {
        blogCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardTitle = card.querySelector('h2').textContent.toLowerCase();
            const cardContent = card.querySelector('p').textContent.toLowerCase();
            
            const matchesCategory = category === 'all' || cardCategory === category;
            const matchesSearch = searchTerm === '' || 
                                cardTitle.includes(searchTerm) || 
                                cardContent.includes(searchTerm);

            card.style.display = matchesCategory && matchesSearch ? 'block' : 'none';
        });
    }
});

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skill-item')) {
                animateProgressBars();
            }
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.skill-item').forEach(item => {
    observer.observe(item);
});

const pageNumbers = document.querySelectorAll('.page-number');
if (pageNumbers.length > 0) {
    pageNumbers.forEach(number => {
        number.addEventListener('click', () => {
            pageNumbers.forEach(num => num.classList.remove('active'));
            number.classList.add('active');
        });
    });
}

const contactButton = document.getElementById('contact');
if (contactButton) {
    contactButton.addEventListener('click', function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('.profile-image');
    const easterEggModal = document.createElement('div');
    easterEggModal.className = 'easter-egg-modal';
    easterEggModal.style.display = 'none';
    easterEggModal.innerHTML = `
        <div class="easter-egg-content">
            <button class="close-modal">&times;</button>
            <div class="easter-egg-message">
                <h2>OULAH !</h2>
                <p>EH !</p>
                <p>slc nysqc q'gknmqc ?</p>
                <p><i>maybe it's a special kind of cipher ... ?</i></p>
            </div>
        </div>
    `;
    document.body.appendChild(easterEggModal);

    profileImage.addEventListener('click', function() {
        easterEggModal.style.display = 'flex';
    });

    const closeModal = easterEggModal.querySelector('.close-modal');
    closeModal.addEventListener('click', function() {
        easterEggModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === easterEggModal) {
            easterEggModal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const sideMenu = document.querySelector('.side-menu');
    const closeButton = document.querySelector('.close-menu');

    menuButton.addEventListener('click', function() {
        sideMenu.classList.toggle('active');
    });

    closeButton.addEventListener('click', function() {
        sideMenu.classList.remove('active');
    });

    document.addEventListener('click', function(event) {
        if (!sideMenu.contains(event.target) && !menuButton.contains(event.target)) {
            sideMenu.classList.remove('active');
        }
    });
});


const MAX_PETALS = 100;
let petalCount = 0;

function createPetal() {
    if (petalCount >= MAX_PETALS) return;
    
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    const startPosition = Math.random() < 0.7 
        ? Math.random() * window.innerWidth * 0.7 + window.innerWidth * 0.5  
        : Math.random() * window.innerWidth * 0.4;  
    
    petal.style.left = `${startPosition}px`;
    petal.style.top = '-50px';   
    
    const size = Math.random() * 20 + 25;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    
    petal.style.animation = 'falling 4s linear forwards';
    petal.style.animationDelay = `${Math.random() * 0.3}s`;
    
    document.body.appendChild(petal);
    petalCount++;
    
    petal.addEventListener('animationend', () => {
        petal.remove();
        petalCount--;
    });
}

function startCherryBlossomAnimation() {
    if (document.visibilityState === 'visible') {
        setInterval(createPetal, 200);
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        const petals = document.querySelectorAll('.petal');
        petals.forEach(petal => petal.remove());
        petalCount = 0;
    } else {
        startCherryBlossomAnimation();
    }
});

startCherryBlossomAnimation(); 
