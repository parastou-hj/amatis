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
    
   


$(document).ready(function() {

    let currentDealers = [];
    let currentIndex = 0;
    let activeMapPoint = null;

    // باز کردن پاپ‌آپ
    function openDealerPopup(button) {
        const $btn = $(button);
        const cityName = $btn.data('city');
        const dealersData = typeof $btn.data('dealers') === 'string' ? JSON.parse($btn.data('dealers')) : $btn.data('dealers');
        const dealersCount = parseInt($btn.data('dealers-count'));

        currentDealers = dealersData;
        currentIndex = 0;

        // پر کردن اطلاعات هدر پاپ‌آپ
        $('#cityName').text(cityName);
        // $('#dealersCount').text(`${dealersCount} نمایندگی فعال`);

        // مدیریت نمایش تب‌ها
        if (dealersCount > 1) {
            createTabs();
            $('#dealerTabs').show();
        } else {
            $('#dealerTabs').hide();
        }

        // ایجاد پنل‌ها و نمایش پاپ‌آپ
        createPanels();
        $('#dealerPopup').css('display', 'flex'); // یا .show() اگر flexbox مهم نیست
        $('body').css('overflow', 'hidden');

        // فعال‌سازی اولین نمایندگی
        switchDealer(0);
    }

    // ایجاد تب‌ها
    function createTabs() {
        const $tabsContainer = $('#dealerTabs').empty(); // خالی کردن محتوای قبلی
        $.each(currentDealers, function(index, dealer) {
            const $tab = $('<button></button>')
                .addClass('dealer-tab')
                .text(dealer.name)
                .data('index', index); // ذخیره ایندکس برای کلیک
            $tabsContainer.append($tab);
        });
    }

    // ایجاد پنل‌ها
    function createPanels() {
        const $panelsContainer = $('#dealerPanels').empty();
        $.each(currentDealers, function(index, dealer) {
            // استفاده از Template Literals همچنان بهترین راه برای ایجاد HTML پیچیده است
            const panelHTML = `
                <div class="dealer-panel" id="panel-${index}">
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
                        <button class="contact-btn primary" data-phone="${dealer.phone}">
                            <i class="fas fa-phone"></i> تماس تلفنی
                        </button>
                        <button class="contact-btn secondary" data-address="${dealer.address}">
                            <i class="fas fa-map"></i> مسیریابی
                        </button>
                    </div>
                </div>
            `;
            $panelsContainer.append(panelHTML);
        });
    }

    // تغییر نمایندگی فعال
    function switchDealer(index) {
        if (index < 0 || index >= currentDealers.length) return;

        // غیرفعال کردن همه تب‌ها و پنل‌ها
        $('.dealer-tab').removeClass('active');
        $('.dealer-panel').removeClass('active');

        // فعال کردن تب و پنل مورد نظر
        // .eq(index) برای انتخاب المان n-ام استفاده می‌شود
        $('.dealer-tab').eq(index).addClass('active');
        $(`#panel-${index}`).addClass('active');

        currentIndex = index;
    }

    // بستن پاپ‌آپ
    function closePopup() {
        $('#dealerPopup').hide();
        $('body').css('overflow', 'auto');
    }
    
    // توابع کمکی نقشه
    function findMapPointByCity(cityName) {
        return $(`.map-point[data-city="${cityName}"]`);
    }

    function findCityButtonByCity(cityName) {
        return $(`.city-btn[data-city="${cityName}"]`);
    }

    function highlightMapPoint(cityName) {
        if (activeMapPoint) {
            activeMapPoint.removeClass('highlighted');
        }
        const $mapPoint = findMapPointByCity(cityName);
        if ($mapPoint.length) {
            $mapPoint.addClass('highlighted');
            activeMapPoint = $mapPoint;
        }
    }

    function removeHighlight() {
        if (activeMapPoint) {
            activeMapPoint.removeClass('highlighted');
            activeMapPoint = null;
        }
    }
    
    function openDealerPopupFromElement(element) {
        const $element = $(element);
        const cityName = $element.data('city');
        const $cityButton = findCityButtonByCity(cityName);

        if ($cityButton.length) {
            openDealerPopup($cityButton.get(0)); // .get(0) المان خام DOM را برمی‌گرداند
        } else {
             const dealersData = [{
                name: "نمایندگی " + cityName,
                manager: $element.data("manager") || "در حال بروزرسانی",
                address: $element.data("address") || "آدرس در دسترس نیست",
                phone: $element.data("phone") || "تلفن در دسترس نیست",
                hours: $element.data("workhours") || "ساعات کاری در دسترس نیست",
            }];
            
            currentDealers = dealersData;
            currentIndex = 0;
            
            $('#cityName').text(cityName);
            $('#dealerTabs').hide();
            
            createPanels();
            $('#dealerPopup').css('display', 'flex');
            $('body').css('overflow', 'hidden');
            
            switchDealer(0);
        }
    }


    // --- Event Handlers ---

    // رویداد کلیک روی دکمه‌های شهر
    $('.city-btn').on('click', function() {
        openDealerPopup(this);
    });
    
    // رویداد هاور (ورود و خروج موس) روی دکمه‌های شهر برای هایلایت نقشه
    $('.city-btn').on('mouseenter', function() {
        highlightMapPoint($(this).data('city'));
    }).on('mouseleave', function() {
        removeHighlight();
    });

    // رویدادهای مربوط به نقاط روی نقشه
    $('.map-point').on('click', function(e) {
        e.stopPropagation();
        openDealerPopupFromElement(this);
    }).on('mouseenter', function() {
        findCityButtonByCity($(this).data('city')).addClass('highlighted');
    }).on('mouseleave', function() {
        findCityButtonByCity($(this).data('city')).removeClass('highlighted');
    });

    // Event Delegation برای تب‌ها (چون به صورت داینامیک ساخته می‌شوند)
    $('#dealerTabs').on('click', '.dealer-tab', function() {
        const index = $(this).data('index');
        switchDealer(index);
    });

    // Event Delegation برای دکمه‌های تماس و مسیریابی
    $('#dealerPanels').on('click', '.contact-btn.primary', function() {
        window.location.href = `tel:${$(this).data('phone')}`;
    });

    $('#dealerPanels').on('click', '.contact-btn.secondary', function() {
        const address = $(this).data('address');
        window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
    });
    $('.dealer-popup-close').on('click', function(e) {
            closePopup();
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });

    $('#dealerPopup').on('click', function(e) {
        if ($(e.target).is('#dealerPopup')) {
            closePopup();
        }
    });
});


$(document).ready(function() {
    function populateCityDropdown() {
        const dropdown = $('#cityDropdown');
        const cityButtons = $('.city-btn');
        
        dropdown.find('option:not(:first)').remove();
        
        const cities = [];
        cityButtons.each(function() {
            const cityName = $(this).data('city');
            if (cityName) {
                cities.push(cityName);
            }
        });
        
        cities.sort();
        
        cities.forEach(function(cityName) {
            dropdown.append(`<option value="${cityName}">${cityName}</option>`);
        });
    }
    
    populateCityDropdown();
    
    $('.filter-submit').on('click', function(e) {
        e.preventDefault();
        
        const selectedCity = $('#cityDropdown, .dropdown').val();
        
        if (selectedCity && selectedCity !== '' && selectedCity !== 'انتخاب شهر' && selectedCity !== 'نام شهر') {
            const cityButton = $(`.city-btn[data-city="${selectedCity}"]`);
            
            if (cityButton.length > 0) {
                try {
                    openDealerPopup(cityButton[0]);
                    
                    if (typeof highlightMapPoint === 'function') {
                        highlightMapPoint(selectedCity);
                    }
                    
                    $('.city-btn').removeClass('active highlighted');
                    cityButton.addClass('active');
                    
                    if (cityButton[0]) {
                        cityButton[0].scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }
                    
                } catch (error) {
                    console.error('خطا در باز کردن پاپ‌آپ:', error);
                    alert('خطا در نمایش اطلاعات نمایندگی');
                }
            } else {
                alert('اطلاعات این شهر در دسترس نیست.');
            }
        } else {
            alert('لطفاً یک شهر انتخاب کنید.');
        }
    });
    
    $('#cityDropdown, .dropdown').on('change', function() {
        const selectedCity = $(this).val();
        
        if (selectedCity && selectedCity !== '' && selectedCity !== 'انتخاب شهر' && selectedCity !== 'نام شهر') {
            if (typeof highlightMapPoint === 'function') {
                highlightMapPoint(selectedCity);
            }
            
            $('.city-btn').removeClass('highlighted active');
            $(`.city-btn[data-city="${selectedCity}"]`).addClass('highlighted');
        } else {
            if (typeof removeHighlight === 'function') {
                removeHighlight();
            }
            $('.city-btn').removeClass('highlighted active');
        }
    });
    
    if (window.innerWidth <= 768) {
        $('#cityDropdown, .dropdown').attr('placeholder', 'انتخاب شهر');
    }
    
    $('#cityDropdown, .dropdown').on('keypress', function(e) {
        if (e.which === 13) { // Enter key
            $('.filter-submit').trigger('click');
        }
    });
});

