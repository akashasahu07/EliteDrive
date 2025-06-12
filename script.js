// Car data
const cars = [
    {
        id: 1,
        brand: 'toyota',
        name: 'Toyota Camry 2020',
        year: 2020,
        price: 28500,
        image: 'https://cdn.pixabay.com/photo/2016/05/06/16/32/car-1376190_960_720.jpg',
        mileage: '35,000 miles',
        description: 'Excellent condition Toyota Camry with full service history. Features include leather seats, navigation system, and backup camera.'
    },
    {
        id: 2,
        brand: 'honda',
        name: 'Honda Civic 2019',
        year: 2019,
        price: 22000,
        image: 'https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_960_720.jpg',
        mileage: '42,000 miles',
        description: 'Reliable Honda Civic with excellent fuel economy. Well-maintained with recent oil change and new tires.'
    },
    {
        id: 3,
        brand: 'bmw',
        name: 'BMW 3 Series 2021',
        year: 2021,
        price: 35000,
        image: 'https://cdn.pixabay.com/photo/2019/07/14/22/28/bmw-4338257_1280.jpg',
        mileage: '28,000 miles',
        description: 'Luxury BMW 3 Series with premium interior, advanced safety features, and powerful engine performance.'
    },
    {
        id: 4,
        brand: 'mercedes',
        name: 'Mercedes C-Class 2020',
        year: 2020,
        price: 38000,
        image: 'https://images.unsplash.com/photo-1635011747457-d12e594be1c6?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        mileage: '31,000 miles',
        description: 'Elegant Mercedes C-Class with luxury appointments, smooth ride, and comprehensive warranty coverage.'
    },
    {
        id: 5,
        brand: 'toyota',
        name: 'Toyota RAV4 2018',
        year: 2018,
        price: 26000,
        image: 'https://cdn.pixabay.com/photo/2016/04/01/12/16/car-1300629_960_720.png',
        mileage: '48,000 miles',
        description: 'Versatile Toyota RAV4 SUV perfect for families. All-wheel drive, spacious interior, and excellent safety ratings.'
    },
    {
        id: 6,
        brand: 'honda',
        name: 'Honda Accord 2021',
        year: 2021,
        price: 31000,
        image: 'https://cdn.pixabay.com/photo/2019/08/04/23/28/honda-4384888_1280.jpg',
        mileage: '25,000 miles',
        description: 'Nearly new Honda Accord with advanced tech features, comfortable seating, and impressive fuel efficiency.'
    }
];

// DOM Elements
const navbar = document.getElementById('navbarx');
const themeToggle = document.getElementById('themeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');
const mobileNavLinks = document.getElementById('mobileNavLinks');
const carGrid = document.getElementById('carGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('carModal');
const closeModal = document.getElementById('closeModal');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileNavLinks.classList.add('active');
});

mobileCloseBtn.addEventListener('click', () => {
    mobileNavLinks.classList.remove('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links.mobile a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNavLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileNavLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileNavLinks.classList.remove('active');
    }
});

// Theme Toggle
let isDark = false;
themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Render Cars
function renderCars(carsToShow = cars) {
    carGrid.innerHTML = '';
    carsToShow.forEach((car, index) => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card loading';
        // Convert USD price to INR (approximate rate: 1 USD = 83 INR)
        const inrPrice = (car.price * 83).toLocaleString('en-IN');
        carCard.innerHTML = `
                <img src="${car.image}" alt="${car.name}" class="car-image">
                <div class="car-info">
                <h3 class="car-title">${car.name}</h3>
                <div class="car-details">
                    <span>Year: ${car.year}</span>
                    <span>${car.mileage}</span>
                </div>
                <div class="car-price">₹${inrPrice}</div>
                </div>
            `;

        carCard.addEventListener('click', () => openModal(car));
        carGrid.appendChild(carCard);

        // Animate card appearance
        setTimeout(() => {
            carCard.classList.remove('loading');
            carCard.classList.add('loaded');
        }, index * 100);
    });
}

// Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active filter
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cars
        const filter = btn.getAttribute('data-filter');
        const filteredCars = filter === 'all' ? cars : cars.filter(car => car.brand === filter);
        renderCars(filteredCars);
    });
});

// Modal Functionality
function openModal(car) {
    const modalContent = document.getElementById('modalContent');
    // Convert USD price to INR (approximate rate: 1 USD = 83 INR)
    const inrPrice = (car.price * 83).toLocaleString('en-IN');
    modalContent.innerHTML = `
                <img src="${car.image}" alt="${car.name}" class="modal-image">
                <h2>${car.name}</h2>
                <div style="display: flex; justify-content: space-between; margin: 1rem 0;">
                    <span><strong>Year:</strong> ${car.year}</span>
                    <span><strong>Mileage:</strong> ${car.mileage}</span>
                </div>
                <div style="font-size: 2rem; color: var(--primary-color); font-weight: bold; margin: 1rem 0;">
                    ₹${inrPrice}
                </div>
                <p style="line-height: 1.6; color: #f8fafc;">
                    ${car.description}
                </p>
                <button style="margin-top: 2rem; padding: 1rem 2rem; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 1.1rem;" onclick="contactAboutCar('${car.name}')">
                    Contact About This Car
                </button>
            `;
    modal.style.display = 'block';
}

function contactAboutCar(carName) {
    modal.style.display = 'none';
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('message').value = `I'm interested in the ${carName}. Please provide more details.`;
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate form submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCars();

    // Observe sections for animations
    document.querySelectorAll('.section-title, .section-subtitle').forEach(el => {
        observer.observe(el);
    });
});

// Add floating particles animation
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                opacity: 0.6;
            `;

    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';

    document.body.appendChild(particle);

    const animation = particle.animate([
        { transform: 'translateY(0px)', opacity: 0.6 },
        { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'linear'
    });

    animation.onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 300);