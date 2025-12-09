// ===== GLOBAL VARIABLES =====
let phonesData = [];
let filteredPhones = [];
let currentFilter = 'all';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Load phones data
    loadPhonesData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup search functionality
    setupSearch();
    
    // Setup filter functionality
    setupFilters();
    
    // Setup scroll to top button
    setupScrollTop();
    
    // Setup mobile navigation
    setupMobileNavigation();
    
    // Setup smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Highlight active navigation link
    highlightActiveNavLink();
});

// ===== DATA LOADING =====
function loadPhonesData() {
    // Use sample data if phones.js is not loaded
    if (typeof window.phonesData === 'undefined') {
        window.phonesData = getSamplePhonesData();
    }
    
    phonesData = window.phonesData;
    filteredPhones = [...phonesData];
    
    // Load all sections
    loadAllPhones();
    loadUpcomingPhones();
    populateComparisonDropdowns();
}

// function getSamplePhonesData() {
//     return [
//         // ===== SAMSUNG PHONES =====
//         {
//             id: 1,
//             name: "Samsung Galaxy S24 Ultra",
//             brand: "samsung",
//             price: "₹1,29,999",
//             image: "https://images.unsplash.com/photo-1611791485440-24e8239a0377?auto=format&fit=crop&w=600",
//             specs: ["200MP Camera", "Snapdragon 8 Gen 3", "12GB RAM", "256GB Storage", "5000mAh Battery", "S Pen Support"],
//             launchDate: "2024-01-17",
//             category: "latest",
//             rating: 4.8,
//             os: "Android 14",
//             display: "6.8-inch Dynamic AMOLED 2X",
//             camera: "200MP + 12MP + 10MP + 10MP",
//             battery: "5000mAh"
//         },
//         {
//             id: 2,
//             name: "Samsung Galaxy S24+",
//             brand: "samsung",
//             price: "₹99,999",
//             image: "https://images.unsplash.com/photo-1611791485440-24e8239a0377?auto=format&fit=crop&w=600",
//             specs: ["Snapdragon 8 Gen 3", "12GB RAM", "256GB Storage", "4900mAh Battery", "QHD+ Display", "50MP Camera"],
//             launchDate: "2024-01-17",
//             category: "latest",
//             rating: 4.7,
//             os: "Android 14",
//             display: "6.7-inch Dynamic AMOLED 2X",
//             camera: "50MP + 12MP + 10MP",
//             battery: "4900mAh"
//         },
        
//         // ===== APPLE IPHONES =====
//         {
//             id: 100,
//             name: "iPhone 15 Pro Max",
//             brand: "apple",
//             price: "₹1,59,900",
//             image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600",
//             specs: ["A17 Pro Chip", "48MP Main Camera", "Titanium Design", "USB-C Port", "5x Optical Zoom", "6GB RAM"],
//             launchDate: "2023-09-22",
//             category: "latest",
//             rating: 4.8,
//             os: "iOS 17",
//             display: "6.7-inch Super Retina XDR",
//             camera: "48MP + 12MP + 12MP",
//             battery: "4422mAh"
//         },
//         {
//             id: 101,
//             name: "iPhone 15 Pro",
//             brand: "apple",
//             price: "₹1,34,900",
//             image: "https://images.unsplash.com/photo-1695653422902-9955faa579f3?auto=format&fit=crop&w=600",
//             specs: ["A17 Pro Chip", "48MP Main Camera", "Titanium Build", "USB-C", "Action Button", "6GB RAM"],
//             launchDate: "2023-09-22",
//             category: "latest",
//             rating: 4.7,
//             os: "iOS 17",
//             display: "6.1-inch Super Retina XDR",
//             camera: "48MP + 12MP + 12MP",
//             battery: "3274mAh"
//         },
        
//         // ===== XIAOMI PHONES =====
//         {
//             id: 200,
//             name: "Xiaomi 14 Pro",
//             brand: "xiaomi",
//             price: "₹79,999",
//             image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600",
//             specs: ["Snapdragon 8 Gen 3", "Leica Camera System", "120W Fast Charging", "12GB RAM", "512GB Storage", "AMOLED Display"],
//             launchDate: "2024-02-01",
//             category: "latest",
//             rating: 4.5,
//             os: "Android 14",
//             display: "6.73-inch LTPO AMOLED",
//             camera: "50MP + 50MP + 50MP",
//             battery: "4880mAh"
//         },
        
//         // ===== ONEPLUS PHONES =====
//         {
//             id: 300,
//             name: "OnePlus 12",
//             brand: "oneplus",
//             price: "₹69,999",
//             image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600",
//             specs: ["Snapdragon 8 Gen 3", "Hasselblad Camera", "100W Fast Charging", "16GB RAM", "256GB Storage", "AMOLED Display"],
//             launchDate: "2024-01-23",
//             category: "latest",
//             rating: 4.6,
//             os: "Android 14",
//             display: "6.82-inch LTPO AMOLED",
//             camera: "50MP + 48MP + 64MP",
//             battery: "5400mAh"
//         }
//     ];
// }

// ===== PHONES DISPLAY =====
function loadAllPhones() {
    const container = document.getElementById('phones-container');
    
    if (phonesData.length === 0) {
        container.innerHTML = '<div class="no-results">No phones found</div>';
        return;
    }
    
    // Show all latest phones
    const latestPhones = phonesData.filter(phone => phone.category === 'latest');
    container.innerHTML = latestPhones.map(phone => createPhoneCard(phone)).join('');
}
//upcoming phones
function loadUpcomingPhones() {
    const container = document.getElementById('upcoming-container');
    const upcomingPhones = [
        {
            name: "Samsung Galaxy S26 Ultra",
            expectedDate: "January 28, 2026",
            price: "₹1,45,999 (expected)",
            features: ["Snapdragon 8 Gen 5", "200MP Camera with AI", "6.9-inch Dynamic AMOLED 4X", "S Pen Support", "5500mAh"]
        },
        {
            name: "OnePlus 13R",
            expectedDate: "January 15, 2026",
            price: "₹39,999 (expected)",
            features: ["Snapdragon 8 Gen 4", "100W Fast Charging", "6.7-inch AMOLED 120Hz", "50MP Triple Camera", "Android 16"]
        },
         {
            name: "Xiaomi 15",
            expectedDate: "January 22, 2026",
            price: "₹54,999 (expected)",
            features: ["Snapdragon 8 Gen 5", "Leica Camera System", "6.8-inch LTPO AMOLED", "120W Charging", "IP68"]
        },
        {
            name: "Realme GT 6 Pro",
            expectedDate: "January 18, 2026",
            price: "₹44,999 (expected)",
            features: ["Snapdragon 8 Gen 4", "150W SuperDart Charge", "6.7-inch AMOLED 144Hz", "50MP Sony IMX890", "Android 16"]
        },
        {
            name: "Motorola Edge 50 Ultra (2026)",
            expectedDate: "January 12, 2026",
            price: "₹49,999 (expected)",
            features: ["Snapdragon 8 Gen 4", "6.7-inch pOLED 165Hz", "200MP Main Camera", "125W TurboPower", "IP68"]
        }
    ];
    
    container.innerHTML = upcomingPhones.map(phone => `
        <div class="upcoming-item">
            <div class="upcoming-info">
                <h4>${phone.name}</h4>
                <p class="upcoming-price">Expected: ${phone.price}</p>
                <p class="upcoming-features"><small>${phone.features.join(' • ')}</small></p>
            </div>
            <div class="expected-date">
                ${phone.expectedDate}
            </div>
        </div>
    `).join('');
}

function createPhoneCard(phone) {
    return `
        <div class="phone-card" data-brand="${phone.brand}" data-id="${phone.id}">
            <div class="phone-image">
                <img src="${phone.image}" alt="${phone.name}" />
            </div>
            <div class="phone-content">
                <h3 class="phone-title">${phone.name}</h3>
                <div class="phone-price">${phone.price}</div>
                <ul class="phone-specs">
                    ${phone.specs.slice(0, 5).map(spec => `<li>${spec}</li>`).join('')}
                </ul>
                <div class="phone-meta">
                    <span class="rating">⭐ ${phone.rating}/5</span>
                    <span class="launch-date">${formatDate(phone.launchDate)}</span>
                </div>
                <button class="btn btn-primary view-details" onclick="viewPhoneDetails(${phone.id})">
                    View Details
                </button>
            </div>
        </div>
    `;
}

// ===== SEARCH FUNCTIONALITY =====
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    
    let searchTimeout;
    
    // Search on button click
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
        searchResults.style.display = 'none';
    });
    
    // Search on Enter key
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
            searchResults.style.display = 'none';
        }
    });
    
    // Real-time search suggestions
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const searchTerm = e.target.value.trim();
        
        if (searchTerm.length > 0) {
            searchTimeout = setTimeout(() => {
                showSearchSuggestions(searchTerm);
            }, 300);
        } else {
            searchResults.style.display = 'none';
        }
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.style.display = 'none';
        }
    });
}

function showSearchSuggestions(searchTerm) {
    const searchResults = document.getElementById('search-results');
    const searchTermLower = searchTerm.toLowerCase().trim();
    
    if (searchTermLower.length < 2) {
        searchResults.style.display = 'none';
        return;
    }
    
    const results = phonesData.filter(phone => 
        phone.name.toLowerCase().includes(searchTermLower) ||
        phone.brand.toLowerCase().includes(searchTermLower) ||
        phone.specs.some(spec => spec.toLowerCase().includes(searchTermLower)) ||
        phone.price.toLowerCase().includes(searchTermLower)
    );
    
    if (results.length > 0) {
        searchResults.innerHTML = results.slice(0, 8).map(phone => `
            <div class="search-result-item" onclick="selectSearchResult(${phone.id}, '${phone.name}')">
                <div class="result-image">
                    <img src="${phone.image}" alt="${phone.name}" />
                </div>
                <div class="result-info">
                    <h4>${phone.name}</h4>
                    <p>${phone.price} • ${phone.brand.charAt(0).toUpperCase() + phone.brand.slice(1)}</p>
                    <small>${phone.specs.slice(0, 2).join(' • ')}</small>
                </div>
            </div>
        `).join('');
        searchResults.style.display = 'block';
    } else {
        searchResults.innerHTML = `
            <div class="no-results">
                <p>No phones found for "${searchTerm}"</p>
                <p style="font-size: 12px; margin-top: 5px;">Try searching by brand, feature, or price</p>
            </div>
        `;
        searchResults.style.display = 'block';
    }
}

function selectSearchResult(phoneId, phoneName) {
    const searchInput = document.getElementById('search-input');
    searchInput.value = phoneName;
    document.getElementById('search-results').style.display = 'none';
    highlightPhoneCard(phoneId);
}

function performSearch(searchTerm) {
    const searchTermLower = searchTerm.toLowerCase().trim();
    
    if (searchTermLower.length === 0) {
        // Reset to current filter if search is empty
        filterPhonesByBrand(currentFilter);
        return;
    }
    
    // Filter phones based on search term
    const searchResults = phonesData.filter(phone => 
        phone.name.toLowerCase().includes(searchTermLower) ||
        phone.brand.toLowerCase().includes(searchTermLower) ||
        phone.specs.some(spec => spec.toLowerCase().includes(searchTermLower)) ||
        phone.price.toLowerCase().includes(searchTermLower)
    );
    
    // Update phones grid with search results
    const container = document.getElementById('phones-container');
    
    if (searchResults.length > 0) {
        container.innerHTML = searchResults.map(phone => createPhoneCard(phone)).join('');
        
        // Show search count
        const sectionTitle = document.querySelector('.section-title');
        const originalTitle = "🔥 Latest Phone Launches";
        sectionTitle.innerHTML = `${originalTitle} <span style="font-size: 1rem; color: var(--gray);">(${searchResults.length} found)</span>`;
    } else {
        container.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 60px;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--gray-light); margin-bottom: 20px;"></i>
                <h3 style="color: var(--gray); margin-bottom: 10px;">No phones found</h3>
                <p>Try searching with different keywords like "Samsung", "camera", or "iPhone"</p>
            </div>
        `;
    }
    
    // Highlight search term in results
    highlightSearchTerms(searchTermLower);
}

function highlightSearchTerms(searchTerm) {
    const phoneTitles = document.querySelectorAll('.phone-title');
    phoneTitles.forEach(title => {
        const text = title.textContent;
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes(searchTerm)) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            const highlighted = text.replace(regex, '<span style="background-color: #fef3c7; padding: 2px 4px; border-radius: 3px;">$1</span>');
            title.innerHTML = highlighted;
        }
    });
}

function highlightPhoneCard(phoneId) {
    // Remove previous highlights
    document.querySelectorAll('.phone-card').forEach(card => {
        card.style.borderColor = 'transparent';
        card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
    
    // Highlight the target phone
    const targetCard = document.querySelector(`.phone-card[data-id="${phoneId}"]`);
    if (targetCard) {
        targetCard.style.borderColor = 'var(--primary)';
        targetCard.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.3)';
        
        // Scroll to the phone card
        targetCard.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
            targetCard.style.borderColor = 'transparent';
            targetCard.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }, 3000);
    }
}

// ===== FILTER FUNCTIONALITY =====
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            currentFilter = filter;
            
            // Apply filter
            filterPhonesByBrand(filter);
        });
    });
}

function filterPhonesByBrand(brand) {
    const container = document.getElementById('phones-container');
    let filtered = [];
    
    if (brand === 'all') {
        filtered = phonesData.filter(phone => phone.category === 'latest');
    } else {
        filtered = phonesData.filter(phone => 
            phone.category === 'latest' && phone.brand === brand
        );
    }
    
    // Update display
    if (filtered.length > 0) {
        container.innerHTML = filtered.map(phone => createPhoneCard(phone)).join('');
    } else {
        container.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 60px;">
                <i class="fas fa-filter" style="font-size: 3rem; color: var(--gray-light); margin-bottom: 20px;"></i>
                <h3 style="color: var(--gray); margin-bottom: 10px;">No phones found</h3>
                <p>No ${brand === 'all' ? '' : brand + ' '}phones in the latest category</p>
            </div>
        `;
    }
}

// ===== COMPARISON FUNCTIONALITY =====
function populateComparisonDropdowns() {
    const phone1Select = document.getElementById('phone1');
    const phone2Select = document.getElementById('phone2');
    
    // Clear existing options except the first one
    while (phone1Select.options.length > 1) phone1Select.remove(1);
    while (phone2Select.options.length > 1) phone2Select.remove(1);
    
    // Add phone options
    phonesData.forEach(phone => {
        const option1 = new Option(phone.name, phone.id);
        const option2 = new Option(phone.name, phone.id);
        
        phone1Select.add(option1);
        phone2Select.add(option2);
    });
    
    // Setup comparison button
    document.getElementById('compare-btn').addEventListener('click', comparePhones);
}

function comparePhones() {
    const phone1Id = document.getElementById('phone1').value;
    const phone2Id = document.getElementById('phone2').value;
    
    if (!phone1Id || !phone2Id) {
        alert("Please select two phones to compare");
        return;
    }
    
    if (phone1Id === phone2Id) {
        alert("Please select two different phones to compare");
        return;
    }
    
    const phone1 = phonesData.find(p => p.id == phone1Id);
    const phone2 = phonesData.find(p => p.id == phone2Id);
    
    if (!phone1 || !phone2) {
        alert("Selected phones not found in database");
        return;
    }
    
    displayComparisonResult(phone1, phone2);
}

function displayComparisonResult(phone1, phone2) {
    const resultDiv = document.getElementById('comparison-result');
    
    // Calculate which phone is better for each category
    const price1 = parsePhonePrice(phone1.price);
    const price2 = parsePhonePrice(phone2.price);
    const ram1 = parsePhoneRAM(phone1.specs);
    const ram2 = parsePhoneRAM(phone2.specs);
    
    resultDiv.innerHTML = `
        <div class="comparison-table">
            <h3 style="text-align: center; margin-bottom: 30px; color: var(--dark);">
                <span style="color: var(--primary);">${phone1.name}</span> 
                <span style="color: var(--gray);">VS</span> 
                <span style="color: var(--primary);">${phone2.name}</span>
            </h3>
            
            <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px;">
                <div style="text-align: center;">
                    <img src="${phone1.image}" alt="${phone1.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 10px;" />
                    <p><strong>${phone1.name}</strong></p>
                </div>
                <div style="text-align: center;">
                    <img src="${phone2.image}" alt="${phone2.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 10px;" />
                    <p><strong>${phone2.name}</strong></p>
                </div>
            </div>
            
            <table>
                <tr>
                    <th>Feature</th>
                    <th>${phone1.name}</th>
                    <th>${phone2.name}</th>
                </tr>
                <tr>
                    <td>Price</td>
                    <td class="${price1 < price2 ? 'better' : 'worse'}">${phone1.price}</td>
                    <td class="${price2 < price1 ? 'better' : 'worse'}">${phone2.price}</td>
                </tr>
                <tr>
                    <td>Brand</td>
                    <td>${phone1.brand.charAt(0).toUpperCase() + phone1.brand.slice(1)}</td>
                    <td>${phone2.brand.charAt(0).toUpperCase() + phone2.brand.slice(1)}</td>
                </tr>
                <tr>
                    <td>Rating</td>
                    <td class="${phone1.rating > phone2.rating ? 'better' : phone1.rating < phone2.rating ? 'worse' : ''}">⭐ ${phone1.rating}/5</td>
                    <td class="${phone2.rating > phone1.rating ? 'better' : phone2.rating < phone1.rating ? 'worse' : ''}">⭐ ${phone2.rating}/5</td>
                </tr>
                <tr>
                    <td>Launch Date</td>
                    <td>${formatDate(phone1.launchDate)}</td>
                    <td>${formatDate(phone2.launchDate)}</td>
                </tr>
                <tr>
                    <td>Specs (Top 3)</td>
                    <td>${phone1.specs.slice(0, 3).join(', ')}</td>
                    <td>${phone2.specs.slice(0, 3).join(', ')}</td>
                </tr>
                <tr>
                    <td>RAM</td>
                    <td class="${ram1 > ram2 ? 'better' : ram1 < ram2 ? 'worse' : ''}">${ram1}GB</td>
                    <td class="${ram2 > ram1 ? 'better' : ram2 < ram1 ? 'worse' : ''}">${ram2}GB</td>
                </tr>
            </table>
            
            <div class="comparison-verdict">
                <h4><i class="fas fa-award"></i> Comparison Verdict:</h4>
                <p>${getComparisonVerdict(phone1, phone2)}</p>
            </div>
        </div>
    `;
}

function parsePhonePrice(priceString) {
    const match = priceString.match(/₹([\d,]+)/);
    if (match) {
        return parseInt(match[1].replace(/,/g, ''));
    }
    return 0;
}

function parsePhoneRAM(specs) {
    for (const spec of specs) {
        const ramMatch = spec.match(/(\d+)GB.*RAM/i);
        if (ramMatch) {
            return parseInt(ramMatch[1]);
        }
    }
    return 0;
}

function getComparisonVerdict(phone1, phone2) {
    const price1 = parsePhonePrice(phone1.price);
    const price2 = parsePhonePrice(phone2.price);
    
    if (price1 < price2 && phone1.rating >= phone2.rating) {
        return `${phone1.name} is the better choice with similar features at a lower price.`;
    } else if (price2 < price1 && phone2.rating >= phone1.rating) {
        return `${phone2.name} offers better value for money with comparable features.`;
    } else if (phone1.rating > phone2.rating) {
        return `${phone1.name} has better user ratings and might be the more reliable choice.`;
    } else if (phone2.rating > phone1.rating) {
        return `${phone2.name} has higher user satisfaction ratings.`;
    } else {
        return "Both phones are excellent choices. Consider your brand preference and design taste.";
    }
}

// ===== UTILITY FUNCTIONS =====
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function viewPhoneDetails(phoneId) {
    const phone = phonesData.find(p => p.id === phoneId);
    if (!phone) return;
    
    const details = `
        📱 ${phone.name}
        💰 Price: ${phone.price}
        ⭐ Rating: ${phone.rating}/5
        📅 Launched: ${formatDate(phone.launchDate)}
        🏷️ Brand: ${phone.brand.charAt(0).toUpperCase() + phone.brand.slice(1)}
        📋 Specs:
        ${phone.specs.map(spec => `   • ${spec}`).join('\n')}
        
        🔍 Full details coming soon on our detailed review page!
    `;
    
    alert(details);
}

// ===== UI ENHANCEMENTS =====
function setupEventListeners() {
    // Add any additional event listeners here
}

function setupScrollTop() {
    const scrollBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function setupMobileNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMobileNav = document.querySelector('.close-mobile-nav');
    const mobileNav = document.getElementById('mobile-nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeMobileNav.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close mobile nav when clicking on links
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.viewPhoneDetails = viewPhoneDetails;
window.selectSearchResult = selectSearchResult;