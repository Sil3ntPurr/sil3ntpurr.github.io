document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const sideMenu = document.querySelector('.side-menu');
    const sections = document.querySelectorAll('.modal-body section');
    const skillCards = document.querySelectorAll('.skill-card');

    setTimeout(() => {
        modal.classList.add('active');
        setTimeout(() => {
            sideMenu.style.opacity = '1';
            sideMenu.style.transform = 'translateX(0)';
        }, 300);
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
                <p>Une pause s'impose ?</p>
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