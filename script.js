$(document).ready(function() {

    // --- DOM Manipulation Logic ---
    const $megamenus = $('.has-megamenu');
    
    function restructureForMobile() {
        $megamenus.each(function() {
            const $menu = $(this);
            if ($menu.data('isMobile')) return;

            const $categories = $menu.find('.category-item');
            const $subcontents = $menu.find('.subcategory-content');

            $categories.each(function() {
                const $category = $(this);
                const categoryId = $category.data('category');
                const $contentToMove = $subcontents.filter(`#${categoryId}`);
                $category.after($contentToMove);
                  $categories.first().removeClass('active');
            });
            
            $menu.data('isMobile', true);
        });
    }

    function restoreForDesktop() {
        $megamenus.each(function() {
            const $menu = $(this);
            if (!$menu.data('isMobile')) return;

            const $subcategoriesColumn = $menu.find('.subcategories-column');
            const $subcontents = $menu.find('.subcategory-content'); // Now they are scattered
            $subcategoriesColumn.append($subcontents);
            
            $menu.data('isMobile', false);
        });
    }

    // --- Initial State and Resize Handler ---
    let isMobileView = window.innerWidth <= 991;

    if (isMobileView) {
        restructureForMobile();
        
    }

    $(window).on('resize', function() {
        const wasMobile = isMobileView;
        isMobileView = window.innerWidth <= 991;

        if (isMobileView && !wasMobile) {
            restructureForMobile();
        } else if (!isMobileView && wasMobile) {
            restoreForDesktop();
        }

        if (!isMobileView) {
            closeMenu();
            $('.sub-menu-content, .megamenu-container, .subcategory-content').css('display', '');
            $('.nav-item, .category-item').removeClass('is-open is-active');
            
            $('.has-megamenu').each(function() {
                 const $firstCategory = $(this).find('.category-item').first();
                 if ($firstCategory.length) {
                     $(this).find('.category-item').removeClass('active');
                     $(this).find('.subcategory-content').removeClass('active');
                     $firstCategory.addClass('active');
                     const categoryId = $firstCategory.data('category');
                     $(this).find(`#${categoryId}`).addClass('active');
                 }
            });
        }
    });

    // --- Event Handlers ---
    function openMenu() {
        $('.main-nav').addClass('is-open');
        $('.menu-overlay').addClass('is-visible');
        $('body').addClass('no-scroll');
    }

    function closeMenu() {
        $('.main-nav').removeClass('is-open');
        $('.menu-overlay').removeClass('is-visible');
        $('body').removeClass('no-scroll');
        // Reset accordion state on menu close
        $('.nav-item.is-open').removeClass('is-open').children('.sub-menu-content, .megamenu-container').slideUp(0);
        $('.category-item.is-active').removeClass('is-active').next('.subcategory-content').slideUp(0);
    }

    $('.mobile-menu-toggle').on('click', openMenu);
    $('.sidebar-close-btn, .menu-overlay').on('click', closeMenu);

    $('.has-submenu > a, .has-megamenu > a').on('click', function(e) {
        if (window.innerWidth <= 991) {
            e.preventDefault();
            const $parentLi = $(this).parent();
            const $submenu = $parentLi.children('.sub-menu-content, .megamenu-container');
            $parentLi.toggleClass('is-open');
            $submenu.slideToggle(300);
            $parentLi.siblings('.is-open').removeClass('is-open')
                .children('.sub-menu-content, .megamenu-container').slideUp(300);
        }
    });

    // Use event delegation for click handler as DOM is changing
    $('.main-nav').on('click', '.category-item', function(e) {
        if (window.innerWidth <= 991) {
            e.preventDefault();
            e.stopPropagation();
            const $category = $(this);
            const $content = $category.next('.subcategory-content');
            $category.toggleClass('is-active');
            $content.slideToggle(300);
            $category.siblings('.category-item.is-active').removeClass('is-active')
                .next('.subcategory-content').slideUp(300);
        }
    });

    $('.has-megamenu').each(function() {
        const $menuContainer = $(this);
        const $categories = $menuContainer.find('.category-item');
        const $subcategories = $menuContainer.find('.subcategory-content');

        function activateDesktopCategory($category) {
            const categoryId = $category.data('category');
            $categories.removeClass('active');
            $menuContainer.find('.subcategory-content').removeClass('active');
            $category.addClass('active');
            $menuContainer.find(`#${categoryId}`).addClass('active');
        }

        if (window.innerWidth > 991) {
            $categories.first().addClass('active');
            $menuContainer.find(`#${$categories.first().data('category')}`).addClass('active');
        }

        $menuContainer.on('mouseenter', '.category-item', function() {
            if (window.innerWidth > 991) {
                activateDesktopCategory($(this));
            }
        });
    });
});

  $(document).ready(function(){
    function resize(){   
        var calculatePadding = parseInt($('header').css("height"));
        
            $(".body-content").css({
                "padding-top": calculatePadding + "px"
            });
        
    }

    resize(); 
    $(window).resize(function(){ 
        resize();
    });
});

 $('.user').on('mouseenter',function(){
    $('.user-menu').addClass('active'); 
  })

   $('body').on('mouseover',function(e){
    if(!e.target.closest('.user')){
    $('.user-menu').removeClass('active');
    // $('.cart-menu-container').removeClass('active');
    }
  })
$(document).ready(function(){
            var articlesCarousel = $('#baner-owl').owlCarousel({
                rtl: true,
                loop: true,
                margin: 10,
                nav: false,
                dots: true,
                center: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                smartSpeed: 1000,
                // stagePadding: 100,
                responsive: {
                    0: {
                        items: 1,
                        
                    },
                    
                  
                }
            });
            
            // Custom Navigation
            $('#baner-right').click(function() {
                articlesCarousel.trigger('prev.owl.carousel');
            });
            
            $('#baner-left').click(function() {
                articlesCarousel.trigger('next.owl.carousel');
            });
        });

          $(document).ready(function(){
             var productCarousel = $('#products-owl').owlCarousel({
                rtl: true,
                loop: true,
                // margin: 20,
                nav: true,
                dots: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                navText: ['<i class="bi bi-chevron-right"></i>', '<i class="bi bi-chevron-left"></i>'],
                responsive: {
                    0: {
                        items: 2
                    },
                    576: {
                        items: 2
                    },
                    768: {
                        items: 3.5
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: 6
                    }
                },
                });
                
            });


            $(document).ready(function(){
            var articlesCarousel = $('#baner-owl-two').owlCarousel({
                rtl: true,
                loop: true,
                margin: 10,
                nav: false,
                dots: false,
                center: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                smartSpeed: 1000,
                // stagePadding: 100,
                responsive: {
                    0: {
                        items: 1,
                        
                    },
                    
                  
                }
            });
            
            // Custom Navigation
            $('#baner-right').click(function() {
                articlesCarousel.trigger('prev.owl.carousel');
            });
            
            $('#baner-left').click(function() {
                articlesCarousel.trigger('next.owl.carousel');
            });
        });


            
           
       
         $(document).ready(function(){
            var articlesCarousel = $('.articles-carousel').owlCarousel({
                rtl: true,
                loop: true,
                // margin: 20,
                nav: false,
                dots: false,
                center: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                smartSpeed: 1000,
                stagePadding: 100,
                responsive: {
                    0: {
                        items: 1.2,
                        stagePadding: 30
                    },
                    576: {
                        items: 1.5,
                        stagePadding: 50
                    },
                    768: {
                        items: 1.8,
                        stagePadding: 70
                    },
                    992: {
                        items: 2.7,
                        stagePadding: 70
                    },
                    1200: {
                        items: 2.9,
                        stagePadding: 100
                    },
                    1600: {
                        items: 3,
                        stagePadding: 120
                    }
                }
            });
            
            // Custom Navigation
            $('.carousel-prev').click(function() {
                articlesCarousel.trigger('prev.owl.carousel');
            });
            
            $('.carousel-next').click(function() {
                articlesCarousel.trigger('next.owl.carousel');
            });
        });

          $(document).ready(function(){
             var productCarousel = $('#new-pro-owl').owlCarousel({
                rtl: true,
                loop: true,
                // margin: 20,
                nav: true,
                dots: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                navText: ['<i class="bi bi-chevron-right"></i>', '<i class="bi bi-chevron-left"></i>'],
                responsive: {
                    0: {
                        items: 2
                    },
                    576: {
                        items: 2
                    },
                    768: {
                        items: 3.5
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: 4
                    },
                      1600: {
                        items: 5
                    }
                },
                });
                
            });


            $('.map-point').each(function() {
        const point = $(this);
        
        
        const tooltip = $('<div class="point-tooltip"></div>');
        point.append(tooltip);
        
        
        const city = point.data('city');
        const projects = point.data('projects');
        
        let content = `<strong>${city}</strong>`;
        if (projects) content += `<br>${projects} نمایندگی فعال`;
        
        tooltip.html(content);
        
      
        point.on('mouseenter', function() {
            tooltip.addClass('show');
        });
        
        point.on('mouseleave', function() {
            tooltip.removeClass('show');
        });
    })
    
   


let currentDealers = [];
let currentIndex = 0;

// باز کردن پاپ‌آپ
function openDealerPopup(button) {
    const cityName = button.dataset.city;
    const dealersData = JSON.parse(button.dataset.dealers);
    const dealersCount = parseInt(button.dataset.dealersCount);
    
    currentDealers = dealersData;
    currentIndex = 0;
    
    document.getElementById('cityName').textContent = cityName;
    // document.getElementById('dealersCount').textContent = `${dealersCount} نمایندگی فعال`;
    
    const tabsContainer = document.getElementById('dealerTabs');
 
    
    if (dealersCount > 1) {
        tabsContainer.style.display = 'flex';
     
        createTabs();
    } else {
        tabsContainer.style.display = 'none';
       
    }
    
    createPanels();
    
    document.getElementById('dealerPopup').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    switchDealer(0);
}

function createTabs() {
    const tabsContainer = document.getElementById('dealerTabs');
    tabsContainer.innerHTML = '';
    
    currentDealers.forEach((dealer, index) => {
        const tab = document.createElement('button');
        tab.className = `dealer-tab ${index === 0 ? 'active' : ''}`;
        tab.textContent = dealer.name;
        tab.onclick = () => switchDealer(index);
        tabsContainer.appendChild(tab);
    });
}

function createPanels() {
    const panelsContainer = document.getElementById('dealerPanels');
    panelsContainer.innerHTML = '';
    
    currentDealers.forEach((dealer, index) => {
        const panel = document.createElement('div');
        panel.className = `dealer-panel ${index === 0 ? 'active' : ''}`;
        panel.id = `panel-${index}`;
        
        panel.innerHTML = `
            <div class="dealer-name">${dealer.name}</div>
            
            <div class="info-item">
                <div class="info-icon"><i class="fas fa-user"></i></div>
                <div class="info-content">
                    <div class="info-label">نام مسئول</div>
                    <div class="info-value">${dealer.manager}</div>
                </div>
            </div>
            
            <div class="info-item">
                <div class="info-icon"><i class="fas fa-map-marker-alt"></i></div>
                <div class="info-content">
                    <div class="info-label">آدرس</div>
                    <div class="info-value">${dealer.address}</div>
                </div>
            </div>
            
            <div class="info-item">
                <div class="info-icon"><i class="fas fa-phone"></i></div>
                <div class="info-content">
                    <div class="info-label">شماره تماس</div>
                    <div class="info-value">${dealer.phone}</div>
                </div>
            </div>
            
            <div class="info-item">
                <div class="info-icon"><i class="fas fa-clock"></i></div>
                <div class="info-content">
                    <div class="info-label">ساعات کاری</div>
                    <div class="info-value">${dealer.hours}</div>
                </div>
            </div>
        
            
            <div class="contact-buttons">
                <button class="contact-btn primary" onclick="callDealer('${dealer.phone}')">
                    <i class="fas fa-phone"></i>
                    تماس تلفنی
                </button>
                <button class="contact-btn secondary" onclick="navigateToDealer('${dealer.address}')">
                    <i class="fas fa-map"></i>
                    مسیریابی
                </button>
            </div>
        `;
        
        panelsContainer.appendChild(panel);
    });
}

function switchDealer(index) {
    if (index < 0 || index >= currentDealers.length) return;
    
    document.querySelectorAll('.dealer-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.dealer-panel').forEach(panel => panel.classList.remove('active'));
    
    const targetTab = document.querySelectorAll('.dealer-tab')[index];
    const targetPanel = document.getElementById(`panel-${index}`);
    
    if (targetTab) targetTab.classList.add('active');
    if (targetPanel) targetPanel.classList.add('active');
    
    currentIndex = index;
   
}





function closePopup() {
    document.getElementById('dealerPopup').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function callDealer(phone) {
    window.location.href = `tel:${phone}`;
}

function navigateToDealer(address) {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
}

document.querySelectorAll('.city-btn').forEach(button => {
    button.addEventListener('click', () => openDealerPopup(button));
});

// بستن با ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// بستن با کلیک روی overlay
document.getElementById('dealerPopup').addEventListener('click', (e) => {
    if (e.target.id === 'dealerPopup') {
        closePopup();
    }
});
let activeMapPoint = null;

function findMapPointByCity(cityName) {
    return document.querySelector(`.map-point[data-city="${cityName}"]`);
}

function findCityButtonByCity(cityName) {
    return document.querySelector(`.city-btn[data-city="${cityName}"]`);
}

function highlightMapPoint(cityName) {
    if (activeMapPoint) {
        activeMapPoint.classList.remove('highlighted');
    }
    
    const mapPoint = findMapPointByCity(cityName);
    if (mapPoint) {
        mapPoint.classList.add('highlighted');
        activeMapPoint = mapPoint;
    }
}

function removeHighlight() {
    if (activeMapPoint) {
        activeMapPoint.classList.remove('highlighted');
        activeMapPoint = null;
    }
}

function openDealerPopupFromElement(element) {
    const cityName = element.dataset.city;
    
    const cityButton = findCityButtonByCity(cityName);
    
    if (cityButton) {
        openDealerPopup(cityButton);
    } else {
        const dealersData = [{
            name: "نمایندگی " + cityName,
            manager: element.dataset.manager || "در حال بروزرسانی",
            address: element.dataset.address || "آدرس در دسترس نیست",
            phone: element.dataset.phone || "تلفن در دسترس نیست",
            hours: element.dataset.workhours || "ساعات کاری در دسترس نیست",
            // projects: element.dataset.projects || "0",
            // customers: element.dataset.customers || "0"
        }];
        
        currentDealers = dealersData;
        currentIndex = 0;
        
        document.getElementById('cityName').textContent = cityName;
        
        document.getElementById('dealerTabs').style.display = 'none';
        
        createPanels();
        
        document.getElementById('dealerPopup').style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        switchDealer(0);
    }
}

document.querySelectorAll('.city-btn').forEach(button => {
    button.addEventListener('click', () => openDealerPopup(button));
    
    button.addEventListener('mouseenter', () => {
        const cityName = button.dataset.city;
        highlightMapPoint(cityName);
    });
    
    button.addEventListener('mouseleave', () => {
        removeHighlight();
    });
});

document.querySelectorAll('.map-point').forEach(point => {
    point.addEventListener('click', (e) => {
        e.stopPropagation();
        openDealerPopupFromElement(point);
    });
    
    point.addEventListener('mouseenter', () => {
        const cityName = point.dataset.city;
        const cityButton = findCityButtonByCity(cityName);
        if (cityButton) {
            cityButton.classList.add('highlighted');
        }
    });
    
    point.addEventListener('mouseleave', () => {
        const cityName = point.dataset.city;
        const cityButton = findCityButtonByCity(cityName);
        if (cityButton) {
            cityButton.classList.remove('highlighted');
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

document.getElementById('dealerPopup').addEventListener('click', (e) => {
    if (e.target.id === 'dealerPopup') {
        closePopup();
    }
});