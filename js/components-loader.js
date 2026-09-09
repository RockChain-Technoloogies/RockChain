// Dynamically load navbar and footer components
(function() {
    function initNavbar() {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (!navbarPlaceholder) return;

        fetch('components/navbar.html?v=' + Date.now(), { cache: 'no-store' })
            .then(response => response.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;

                // Initialize mean menu after navbar loads
                if (typeof jQuery !== 'undefined' && jQuery.fn.meanmenu) {
                    jQuery('.mean-menu').meanmenu({
                        meanScreenWidth: "991"
                    });
                }

                // Ensure expand controls are in place
                setupMobileDropdowns();
            })
            .catch(error => console.error('Error loading navbar:', error));
    }

    function initFooter() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (!footerPlaceholder) return;

        fetch('components/footer.html?v=' + Date.now(), { cache: 'no-store' })
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }

    function setupMobileDropdowns() {
        if (typeof jQuery === 'undefined') return;

        // Submenu starts hidden inside mobile MeanMenu
        jQuery('.mean-container .mean-nav .dropdown-menu').hide();

        // Ensure mean-expand button is present if MeanMenu didn't inject it
        jQuery('.mean-container .mean-nav li:has(.dropdown-menu)').each(function() {
            var $li = jQuery(this);
            if (!$li.find('> .mean-expand').length) {
                $li.append('<a class="mean-expand" href="javascript:void(0)" style="font-size: 18px">+</a>');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initNavbar();
            initFooter();
        });
    } else {
        initNavbar();
        initFooter();
    }
})();

// Global delegated handlers for mobile & desktop navigation
if (typeof jQuery !== 'undefined') {
    // Desktop: Prevent '#' jump on nav items
    jQuery(document).on('click', '.Techsolv-nav .navbar-nav .nav-item > a[href="#"], .Techsolv-nav .navbar-nav .nav-item > a[href="javascript:void(0)"]', function(e) {
        e.preventDefault();
    });
}