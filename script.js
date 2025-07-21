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
        var calculatePadding = parseInt($('.header-container').css("height"));
        
            $(".body-content").css({
                "padding-top": calculatePadding + "px"
            });
        
    }

    resize(); 
    $(window).resize(function(){ 
        resize();
    });
});


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
                // autoplay: true,
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
                        items: 3,
                        stagePadding: 100
                    },
                    1400: {
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
                // autoplay: true,
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
        
        // ساخت tooltip مخصوص هر نقطه
        const tooltip = $('<div class="point-tooltip"></div>');
        $('body').append(tooltip);
        
        // محتوای tooltip
        const city = point.data('city');
        const projects = point.data('projects');
        const description = point.data('description');
        
        let content = `<strong>${city}</strong>`;
        if (projects) content += `<br>${projects} پروژه فعال`;
        if (description) content += `<br>${description}`;
        
        tooltip.html(content);
        
        // Events
        point.on('mouseenter', function(e) {
            tooltip.addClass('show');
            updateTooltipPosition(e, tooltip);
        });
        
        point.on('mouseleave', function() {
            tooltip.removeClass('show');
        });
        
        point.on('mousemove', function(e) {
            updateTooltipPosition(e, tooltip);
        });
    });
    
    // تابع موقعیت tooltip
    function updateTooltipPosition(e, tooltip) {
        const margin = 15;
        let x = e.pageX + margin;
        let y = e.pageY - tooltip.outerHeight() - margin;
        
        // چک مرزها
        if (x + tooltip.outerWidth() > $(window).width()) {
            x = e.pageX - tooltip.outerWidth() - margin;
        }
        if (y < 0) {
            y = e.pageY + margin;
        }
        
        tooltip.css({
            left: x + 'px',
            top: y + 'px'
        });
    }