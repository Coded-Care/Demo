function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (hardcoded for now)
    if (username === 'teacher' && password === '123') {
        // Hide login screen
        document.getElementById('loginScreen').style.display = 'none';
        
        // Show dashboard with animation
        const dashboard = document.getElementById('dashboardScreen');
        dashboard.style.display = 'block';
        dashboard.style.opacity = '0';
        dashboard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            dashboard.style.transition = 'all 0.5s ease';
            dashboard.style.opacity = '1';
            dashboard.style.transform = 'translateY(0)';
        }, 50);
        
        // Initialize first tab and animate stat cards
        initializeTabs();
        animateStatCards();
        
    } else {
        // Show error message
        showError('Invalid credentials. Use: teacher / 123');
    }
}

function logout() {
    // Add logout animation
    const dashboard = document.getElementById('dashboardScreen');
    dashboard.style.transition = 'all 0.3s ease';
    dashboard.style.opacity = '0';
    dashboard.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        dashboard.style.display = 'none';
        document.getElementById('loginScreen').style.display = 'flex';
        
        // Clear login fields
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        
        // Reset to overview tab
        const tabSwitch = document.getElementById('tabSwitch');
        if (tabSwitch) {
            tabSwitch.checked = false;
        }
        resetTabs();
        
        // Hide notification dropdown
        const notificationDropdown = document.getElementById('notificationDropdown');
        if (notificationDropdown) {
            notificationDropdown.classList.remove('show');
        }
    }, 300);
}

function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function clearAllNotifications() {
    const notificationList = document.querySelector('.notification-list');
    if (notificationList) {
        notificationList.innerHTML = '<div style="padding: 20px; text-align: center; color: rgba(255,255,255,0.5);">No notifications</div>';
    }
    
    // Update badge
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = '0';
        badge.style.display = 'none';
    }
    
    // Hide dropdown after clearing
    setTimeout(() => {
        const dropdown = document.getElementById('notificationDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }, 1000);
}

// Initialize tabs on dashboard load
function initializeTabs() {
    const overviewTab = document.getElementById('overviewTab') || document.getElementById('overview-tab');
    const attendanceTab = document.getElementById('attendanceTab') || document.getElementById('attendance-tab');
    
    if (overviewTab) {
        overviewTab.style.display = 'block';
        overviewTab.classList.add('active');
    }
    
    if (attendanceTab) {
        attendanceTab.style.display = 'none';
        attendanceTab.classList.remove('active');
    }
}

// Reset tabs to initial state
function resetTabs() {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active', 'slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
        tab.style.display = 'none';
    });
    
    // Show overview tab as default
    const overviewTab = document.getElementById('overviewTab') || document.getElementById('overview-tab');
    if (overviewTab) {
        overviewTab.style.display = 'block';
        overviewTab.classList.add('active');
    }
}

// Enhanced tab switching with animations
function switchTab(targetTab) {
    const overviewTab = document.getElementById('overviewTab') || document.getElementById('overview-tab');
    const attendanceTab = document.getElementById('attendanceTab') || document.getElementById('attendance-tab');
    
    if (!overviewTab || !attendanceTab) {
        console.warn('Tab elements not found. Falling back to basic tab switching.');
        showTab(targetTab);
        return;
    }
    
    // Determine direction
    const isGoingToAttendance = targetTab === 'attendance';
    const currentTab = isGoingToAttendance ? overviewTab : attendanceTab;
    const newTab = isGoingToAttendance ? attendanceTab : overviewTab;
    
    // Skip animation if switching to already active tab
    if (newTab.classList.contains('active')) {
        return;
    }
    
    // Add exit animation to current tab
    if (isGoingToAttendance) {
        currentTab.classList.add('slide-out-left');
        currentTab.classList.remove('active');
    } else {
        currentTab.classList.add('slide-out-right');
        currentTab.classList.remove('active');
    }
    
    // After exit animation, show new tab
    setTimeout(() => {
        currentTab.style.display = 'none';
        currentTab.classList.remove('slide-out-left', 'slide-out-right');
        
        // Show and animate in new tab
        newTab.style.display = 'block';
        if (isGoingToAttendance) {
            newTab.classList.add('slide-in-left');
        } else {
            newTab.classList.add('slide-in-right');
        }
        
        setTimeout(() => {
            newTab.classList.add('active');
            newTab.classList.remove('slide-in-left', 'slide-in-right');
        }, 50);
        
    }, 300);
}

// Fallback function for basic tab switching (backwards compatibility)
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.style.display = 'none';
        tab.classList.remove('active');
    });
    
    // Show selected tab
    if (tabName === 'overview') {
        const overviewTab = document.getElementById('overviewTab') || document.getElementById('overview-tab');
        if (overviewTab) {
            overviewTab.style.display = 'block';
            overviewTab.classList.add('active');
        }
    } else if (tabName === 'attendance') {
        const attendanceTab = document.getElementById('attendanceTab') || document.getElementById('attendance-tab');
        if (attendanceTab) {
            attendanceTab.style.display = 'block';
            attendanceTab.classList.add('active');
        }
    }
}

function showError(message) {
    // Create error message element
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 12px 20px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        animation: slideInDown 0.3s ease;
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutUp 0.3s ease';
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

function animateStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
}

// Enhanced event listeners
document.addEventListener('DOMContentLoaded', function() {
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    const tabSwitch = document.getElementById('tabSwitch');
    
    // Login functionality
    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            login();
        }
    }
    
    if (usernameField) {
        usernameField.addEventListener('keypress', handleEnterKey);
    }
    if (passwordField) {
        passwordField.addEventListener('keypress', handleEnterKey);
    }
    
    // Enhanced tab switch functionality with animations
    if (tabSwitch) {
        tabSwitch.addEventListener('change', function() {
            if (this.checked) {
                switchTab('attendance');
            } else {
                switchTab('overview');
            }
        });
    }
    
    // Close notification dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const notificationContainer = document.querySelector('.notification-container');
        const dropdown = document.getElementById('notificationDropdown');
        
        if (notificationContainer && dropdown && !notificationContainer.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
    
    // Add intersection observer for dashboard sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Initialize intersection observer after login
    function initializeObserver() {
        const sections = document.querySelectorAll('.chart-section, .alerts-section, .schedule-section, .attendance-section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Check if dashboard is already visible and initialize observer
    setTimeout(() => {
        const dashboard = document.getElementById('dashboardScreen');
        if (dashboard && dashboard.style.display !== 'none') {
            initializeObserver();
        }
    }, 1000);
    
    // Add mutation observer to detect dashboard visibility changes
    const dashboardObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const dashboard = document.getElementById('dashboardScreen');
                if (dashboard && dashboard.style.display === 'block') {
                    setTimeout(initializeObserver, 500);
                }
            }
        });
    });
    
    const dashboard = document.getElementById('dashboardScreen');
    if (dashboard) {
        dashboardObserver.observe(dashboard, {
            attributes: true,
            attributeFilter: ['style']
        });
    }
});

// Enhanced CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Ensure smooth transitions for all animated elements */
    .tab-content * {
        transition: all 0.3s ease;
    }
    
    /* Enhanced error message styling */
    .error-message {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        letter-spacing: 0.5px;
    }
`;
document.head.appendChild(style);
