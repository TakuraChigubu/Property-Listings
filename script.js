// Property Listing Website JavaScript

// Sample property data
const properties = [
    {
        id: 1,
        title: "Modern Downtown Apartment",
        type: "apartment",
        price: 75000,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        location: "Avenues, Harare",
        image: "/placeholder.svg?height=300&width=400",
        featured: true
    },
    {
        id: 2,
        title: "Luxury Family Villa",
        type: "villa",
        price: 2500000,
        bedrooms: 5,
        bathrooms: 4,
        sqft: 4500,
        location: "Borrowdale, Harare",
        image: "/placeholder.svg?height=300&width=400",
        featured: true
    },
    {
        id: 3,
        title: "Cozy Suburban House",
        type: "house",
        price: 450000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        location: "Highlands, Harare",
        image: "/placeholder.svg?height=300&width=400",
        featured: true
    },
    {
        id: 4,
        title: "Penthouse Condo",
        type: "condo",
        price: 1800000,
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2200,
        location: "CBD, Harare",
        image: "/placeholder.svg?height=300&width=400",
        featured: false
    },
    {
        id: 5,
        title: "lake front Property",
        type: "house",
        price: 3200000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 3000,
        location: "Kariba",
        image: "/placeholder.svg?height=300&width=400",
        featured: false
    },
    {
        id: 6,
        title: "Urban House",
        type: "apartment",
        price: 650000,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 900,
        location: "Madokero, Harare",
        image: "/placeholder.svg?height=300&width=400",
        featured: false
    }
];

let currentProperties = properties.filter(p => p.featured);
let filteredProperties = [...currentProperties];

// DOM Elements
const propertiesGrid = document.getElementById('properties-grid');
const searchBtn = document.getElementById('search-btn');
const loadMoreBtn = document.getElementById('load-more');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contact-form');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    renderProperties(currentProperties);
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    loadMoreBtn.addEventListener('click', loadMoreProperties);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    contactForm.addEventListener('submit', handleContactForm);
    
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
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
            }
        });
    });
}

// Render properties
function renderProperties(propertiesToRender) {
    propertiesGrid.innerHTML = '';
    
    propertiesToRender.forEach(property => {
        const propertyCard = createPropertyCard(property);
        propertiesGrid.appendChild(propertyCard);
    });
    
    // Add fade-in animation
    setTimeout(() => {
        document.querySelectorAll('.property-card').forEach(card => {
            card.classList.add('fade-in');
        });
    }, 100);
}

// Create property card
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card bg-card rounded-lg shadow-lg overflow-hidden border border-border';
    
    card.innerHTML = `
        <div class="relative">
            <img src="${property.image}" alt="${property.title}" class="w-full h-64 object-cover">
            <div class="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                $${property.price.toLocaleString()}
            </div>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold text-card-foreground mb-2 font-serif">${property.title}</h3>
            <p class="text-muted-foreground mb-4">${property.location}</p>
            <div class="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                <span>${property.bedrooms} bed</span>
                <span>${property.bathrooms} bath</span>
                <span>${property.sqft} sqft</span>
            </div>
            <button class="w-full bg-secondary text-secondary-foreground py-2 rounded-md hover:bg-accent transition-colors font-semibold">
                View Details
            </button>
        </div>
    `;
    
    return card;
}

// Handle search functionality
function handleSearch() {
    const location = document.getElementById('location-filter').value.toLowerCase();
    const type = document.getElementById('type-filter').value;
    const priceRange = document.getElementById('price-filter').value;
    const bedrooms = document.getElementById('bedrooms-filter').value;
    
    filteredProperties = properties.filter(property => {
        let matches = true;
        
        if (location && !property.location.toLowerCase().includes(location)) {
            matches = false;
        }
        
        if (type && property.type !== type) {
            matches = false;
        }
        
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(p => parseInt(p.replace('+', '')));
            if (max) {
                matches = matches && property.price >= min && property.price <= max;
            } else {
                matches = matches && property.price >= min;
            }
        }
        
        if (bedrooms && property.bedrooms < parseInt(bedrooms)) {
            matches = false;
        }
        
        return matches;
    });
    
    renderProperties(filteredProperties);
    
    // Show/hide load more button
    if (filteredProperties.length <= 6) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

// Load more properties
function loadMoreProperties() {
    const remainingProperties = properties.filter(p => !p.featured);
    currentProperties = [...currentProperties, ...remainingProperties];
    renderProperties(currentProperties);
    loadMoreBtn.style.display 
}