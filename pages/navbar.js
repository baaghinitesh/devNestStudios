document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navbarContainer = document.querySelector('.navbar-container');
    const mobileMenuButton = document.querySelector('.navbar__icon');
    const navItems = document.querySelectorAll('.nav__item');
    const navItemTitles = document.querySelectorAll('.nav__item-title');
    const navBoxes = document.querySelectorAll('.nav__box');
  
    // Variables for scroll behavior
    let lastScrollPosition = 0;
    const scrollThreshold = 100; // Minimum scroll distance to trigger hide/show
  
    // 1. Handle scroll behavior (hide/show navbar)
    window.addEventListener('scroll', function() {
      const currentScrollPosition = window.pageYOffset;
  
      // If scrolled down enough and scrolling down, hide navbar
      if (currentScrollPosition > scrollThreshold && currentScrollPosition > lastScrollPosition) {
        navbar.classList.add('navbar-hidden');
      } 
      // If scrolling up or near top, show navbar
      else if (currentScrollPosition < lastScrollPosition || currentScrollPosition < scrollThreshold) {
        navbar.classList.remove('navbar-hidden');
        
        // Add white background if scrolled past a certain point
        if (currentScrollPosition > 50) {
          navbar.classList.add('bg-white');
        } else {
          navbar.classList.remove('bg-white');
        }
      }
  
      lastScrollPosition = currentScrollPosition;
    });
  
    // 2. Mobile menu toggle
    mobileMenuButton.addEventListener('click', function() {
      navbar.classList.toggle('opened');
      mobileMenuButton.classList.toggle('active');
      
      // Close all dropdowns when mobile menu closes
      if (!navbar.classList.contains('opened')) {
        navBoxes.forEach(box => box.classList.remove('active'));
        navItemTitles.forEach(title => title.classList.remove('active'));
      }
    });
  
    // 3. Desktop dropdown menus
    navItemTitles.forEach(title => {
      title.addEventListener('click', function(e) {
        // Skip if this is a simple link (like Partnership)
        if (title.classList.contains('mod-link')) return;
        
        // Close all other dropdowns
        navItemTitles.forEach(otherTitle => {
          if (otherTitle !== title) {
            otherTitle.classList.remove('active');
            const otherBox = otherTitle.closest('.nav__item').querySelector('.nav__box');
            if (otherBox) otherBox.classList.remove('active');
          }
        });
  
        // Toggle current dropdown
        title.classList.toggle('active');
        const navBox = title.closest('.nav__item').querySelector('.nav__box');
        if (navBox) navBox.classList.toggle('active');
      });
    });
  
    // 4. Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav__item') && !e.target.closest('.navbar__icon')) {
        navBoxes.forEach(box => box.classList.remove('active'));
        navItemTitles.forEach(title => title.classList.remove('active'));
      }
    });
  
    // 5. Handle dropdowns on mobile (touch devices)
    if ('ontouchstart' in window) {
      navItemTitles.forEach(title => {
        title.addEventListener('touchend', function(e) {
          // Skip if this is a simple link
          if (title.classList.contains('mod-link')) return;
          
          e.preventDefault();
          title.click(); // Trigger the click handler
        });
      });
    }
  
    // 6. Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (navbar.classList.contains('opened')) {
          navbar.classList.remove('opened');
          mobileMenuButton.classList.remove('active');
        }
      });
    });
  });



//Complete Solution for Navigation Dropdowns

document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const navbar = document.querySelector('.navbar');
  const nav = document.querySelector('.nav');
  const mobileMenuButton = document.querySelector('.navbar__icon');
  const navItemTitles = document.querySelectorAll('.nav__item-title:not(.mod-link)');

  // Track the currently open dropdown
  let currentOpenDropdown = null;

  // 1. Mobile Menu Toggle
  function toggleMobileMenu() {
    navbar.classList.toggle('opened');
    nav.classList.toggle('opened');
    mobileMenuButton.classList.toggle('active');
    
    // Close all dropdowns when closing mobile menu
    if (!nav.classList.contains('opened')) {
      closeAllDropdowns();
      currentOpenDropdown = null;
    }
  }

  // 2. Dropdown Toggle Functionality (Click Only)
  function toggleDropdown(title) {
    const navItem = title.closest('.nav__item');
    const dropdown = navItem.querySelector('.nav__box');
    
    // Check if we're clicking the already open dropdown
    const isSameDropdown = currentOpenDropdown === navItem;
    
    // Close all dropdowns first (except if clicking the same one)
    if (!isSameDropdown) {
      closeAllDropdowns();
    }
    
    // Toggle current dropdown if not the same one
    if (!isSameDropdown) {
      title.classList.add('is-open');
      if (dropdown) {
        dropdown.classList.add('is-open');
        currentOpenDropdown = navItem;
        
        // For mobile, handle height transitions
        if (window.innerWidth < 1280) {
          dropdown.style.height = 'auto';
          dropdown.style.paddingTop = '32px';
        }
      }
    } else {
      // Clicking the same dropdown - close it
      title.classList.remove('is-open');
      if (dropdown) {
        dropdown.classList.remove('is-open');
        if (window.innerWidth < 1280) {
          dropdown.style.height = '0';
          dropdown.style.paddingTop = '0';
        }
      }
      currentOpenDropdown = null;
    }
  }

  // 3. Close All Dropdowns
  function closeAllDropdowns() {
    navItemTitles.forEach(title => {
      title.classList.remove('is-open');
      const dropdown = title.closest('.nav__item').querySelector('.nav__box');
      if (dropdown) {
        dropdown.classList.remove('is-open');
        if (window.innerWidth < 1280) {
          dropdown.style.height = '0';
          dropdown.style.paddingTop = '0';
        }
      }
    });
  }

  // 4. Event Listeners
  mobileMenuButton.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMobileMenu();
  });

  navItemTitles.forEach(title => {
    // Remove any hover events and only keep click
    title.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown(title);
    });
    
    // Prevent hover from opening dropdowns
    title.addEventListener('mouseenter', function(e) {
      e.stopPropagation();
    });
  });

  // 5. Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav__item') && !e.target.closest('.navbar__icon')) {
      closeAllDropdowns();
      currentOpenDropdown = null;
    }
  });

  // 6. Handle window resize
  function handleResize() {
    if (window.innerWidth >= 1280) {
      // Desktop - reset mobile states
      nav.classList.remove('opened');
      mobileMenuButton.classList.remove('active');
    } else {
      // Mobile - ensure proper mobile states
      closeAllDropdowns();
      currentOpenDropdown = null;
    }
  }

  // Initial setup
  handleResize();
  window.addEventListener('resize', handleResize);
});


// for service
document.querySelectorAll('.nvService__item-title').forEach(title => {
  title.addEventListener('click', function(e) {
    const parent = title.closest('.nvService__item');
    const subLinks = parent.querySelector('.nvService__sub-links');
    if (subLinks) {
      e.preventDefault();
      subLinks.classList.toggle('visible');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const subtitles = document.querySelectorAll('.nvService-subtitle');
  const linksBlocks = document.querySelectorAll('.nvService__links');

  subtitles.forEach((subtitle, index) => {
    subtitle.addEventListener('click', () => {
      // Remove active/opened from all
      subtitles.forEach(s => s.classList.remove('is-open'));
      linksBlocks.forEach(block => block.classList.remove('opened'));

      // Add active/opened to clicked one
      subtitle.classList.add('is-open');
      if (linksBlocks[index]) {
        linksBlocks[index].classList.add('opened');
      }
    });
  });
});

document.querySelector('.nav__item-title').addEventListener('click', function () {
  // Open the dropdown (toggle classes etc. already handled)
  
  // Automatically open the first service section
  const firstSubtitle = document.querySelector('.nvService-subtitle');
  if (firstSubtitle) {
    firstSubtitle.click();
  }
});


// for small screen
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.navbar__icon');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('opened'); // Toggle the transition class
  });
});




