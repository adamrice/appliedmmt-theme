// (function () {
//     const mediaQuery = window.matchMedia('(max-width: 767px)');

//     const head = document.querySelector('.gh-head');
//     const menu = head.querySelector('.gh-head-menu');
//     const nav = menu.querySelector('.nav');
//     if (!nav) return;

//     const logo = document.querySelector('.gh-head-logo');
//     const navHTML = nav.innerHTML;

//     if (mediaQuery.matches) {
//         const items = nav.querySelectorAll('li');
//         items.forEach(function (item, index) {
//             item.style.transitionDelay = 0.03 * (index + 1) + 's';
//         });
//     }

//     var windowClickListener;
//     const makeDropdown = function () {
//         if (mediaQuery.matches) return;
//         const submenuItems = [];

//         while ((nav.offsetWidth + 64) > menu.offsetWidth) {
//             if (nav.lastElementChild) {
//                 submenuItems.unshift(nav.lastElementChild);
//                 nav.lastElementChild.remove();
//             } else {
//                 return;
//             }
//         }

//         if (!submenuItems.length) {
//             document.body.classList.add('is-dropdown-loaded');
//             return;
//         }

//         const toggle = document.createElement('button');
//         toggle.setAttribute('class', 'nav-more-toggle');
//         toggle.setAttribute('aria-label', 'More');
//         toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor"><path d="M21.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0zM13.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0zM5.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0z"></path></svg>';

//         const wrapper = document.createElement('div');
//         wrapper.setAttribute('class', 'gh-dropdown');

//         if (submenuItems.length >= 10) {
//             document.body.classList.add('is-dropdown-mega');
//             wrapper.style.gridTemplateRows = 'repeat(' + Math.ceil(submenuItems.length / 2) + ', 1fr)';
//         } else {
//             document.body.classList.remove('is-dropdown-mega');
//         }

//         submenuItems.forEach(function (child) {
//             wrapper.appendChild(child);
//         });

//         toggle.appendChild(wrapper);
//         nav.appendChild(toggle);

//         document.body.classList.add('is-dropdown-loaded');

//         toggle.addEventListener('click', function () {
//             document.body.classList.toggle('is-dropdown-open');
//         });

//         windowClickListener = function (e) {
//             if (!toggle.contains(e.target) && document.body.classList.contains('is-dropdown-open')) {
//                 document.body.classList.remove('is-dropdown-open');
//             }
//         };
//         window.addEventListener('click', windowClickListener);
//     }

//     imagesLoaded(head, function () {
//         makeDropdown();
//     });

//     window.addEventListener('resize', function () {
//         setTimeout(function () {
//             window.removeEventListener('click', windowClickListener);
//             nav.innerHTML = navHTML;
//             makeDropdown();
//         }, 1);
//     });
// })();
/**
 * ghost-dynamic-dropdown 1.1.0 (https://github.com/themeix/ghost-dynamic-dropdown)
 * A simple script for dynamic dorpdown & mega menu for Ghost Blogging Platform.
 * Copyright 2022 Themeix (https://themeix.com)
 * Released under MIT License
 * Released on:  Jul 25, 2021
 */


/**
 * ghost-dynamic-dropdown 1.1.0 (https://github.com/themeix/ghost-dynamic-dropdown)
 * A simple script for dynamic dorpdown & mega menu for Ghost Blogging Platform.
 * Copyright 2022 Themeix (https://themeix.com)
 * Released under MIT License
 * Released on:  Jul 25, 2021
 */



(function ($) {
    "use strict";

    function multiLevel(targetElement = "ul li", mLhasSubmenu = "mL-has-submenu", mLsubmenu = "mL-submenu") {
        let mLparentDetecttext = "[-]";
        let mLchildDetectText = "[--]";
        let mLdomArrayElement = [];
        let mLparentIndex = [];
        let mLparentLen = 0;

        // Find Dropdown parent element
        $(`${targetElement} li`).each(function (index, element) {
            if ($(this).text().includes(mLparentDetecttext)) {
                mLparentIndex.push(index); // Make dropdown parent array index
                mLparentLen++;

                $(this).push(element);
                if (!$(this).hasClass('menu-item-has-children')) {
                    $(this).addClass(mLhasSubmenu); // Add claas in dropdown   element
                }
                $(this).append(`<ul class="${mLsubmenu}"></ul>`); // Append submenu element
            }
        });



        let elIndex;
        // Code last multilevel 
        let lastMlElementText = $(`.${mLhasSubmenu}`).last().text();
        // console.log(lastMlElement);

        // Using loop to reach dropdown parent element
        for (let i = 0; i < mLparentLen; i++) {

            elIndex = 0 // Initial elemet value

            // Find subitem element
            $(`${targetElement} li`).each(function (index, element) {
                let mLsubitem = $(this).text().includes(mLchildDetectText); // Find subitem element


                if (mLsubitem) {

                    if (elIndex + 1 >= mLparentIndex[i + 1] + 1) { // Each loop will be break
                        return false; //Stoped each loop 
                    }

                    if (elIndex <= mLparentIndex[i + 1] || elIndex >= mLparentIndex[mLparentIndex.length - 1]) {

                        if (!mLparentIndex.includes(index)) { //Check if not index already insert 
                            mLdomArrayElement.push(element); // Incert subitem element in dom array
                            mLparentIndex.push(index); // incert subitem index in indexPush array
                        }
                    }

                }
                elIndex++; // increase element index value
            });


            $(`.${mLhasSubmenu} ul.${mLsubmenu}:eq(${i})`).append(mLdomArrayElement); // Append related subitem dom element into submenu 

            mLdomArrayElement = []; // Make dom array element empty. 
        }

        let lastMlElementIndex = 0; // Find subitem element
        let lastChildIndex = 0, lastChildElementText;


        $(`${targetElement} li`).each(function (index, element) {
            let lastMlElement = $(this).text().includes(lastMlElementText); // Find subitem element

            if (lastMlElement) {
                if (!$(this).hasClass('mLlastPrentElement')) {
                    $(this).addClass('mLlastPrentElement');
                    lastChildElementText = $(this).parent().children('li').last().text();
                    lastMlElementIndex = index;
                }

            }

            if ($(this).text().includes(lastChildElementText)) {
                lastChildIndex = index;
            }

            if (lastMlElementIndex < index && lastMlElementIndex > 0) {
                $(this).addClass('mLlastChildElements');
                $(".mLlastPrentElement ul").append($(`.mLlastChildElements`));
                if (lastChildIndex == index) {
                    return false;
                }
            }
        });

        remove_text(mLhasSubmenu, mLparentDetecttext);
        remove_text('subitem', mLchildDetectText);

    }

    function remove_text(textClass, replacedText) {

        const mLhasSubmenuEL = $(`.${textClass}`);
        mLhasSubmenuEL.each(function () {
            if ($(this).find("> a:first").text().includes(replacedText)) {
                let textFull = $(this).find("> a:first").text(); // Find has child inner text
                $(this).find("> a:first").text(textFull.replaceAll(replacedText, ""));
            }
        });
    }


    function megamenu(hasMegaMenuClasses = "menu-item-has-megamenu", col = 3, item_slice = 4, hasMegaMenuDetectText = "[has_megamenu]", submenuUlClasses = "ghost-submenu") {
        let megaMenuEl = $(`.${hasMegaMenuClasses} li`);
        $(`.${hasMegaMenuClasses} .${submenuUlClasses}`).addClass('row');
        let titleText = [];
        let titleIndex = 0;
        megaMenuEl.each(function (index, element) {
            if ($(this).text().includes("[title]")) {
                titleIndex++;
                $(this).addClass("megamenu-title");
                titleText.push($(this).text())
                $(".megamenu-title").empty();
            }
        });

        for (let i = 0; i < megaMenuEl.length; i += item_slice) {
            megaMenuEl.slice(i, i + item_slice).wrapAll(`<div class='col-md-${col}'></div>`);
            // console.log(titleText[i]);
            // console.log(titleText);
        }

        for (let i = 0; i < titleText.length; i++) {
            $(`.${submenuUlClasses} > div:eq(${i})`).prepend(`<h6 class="megamenu-title-text text-danger">${titleText[i]}</h6>`);
            $(".megamenu-title-text").text(titleText[i].replaceAll("[title]", ""));
        }
        remove_text(hasMegaMenuClasses, hasMegaMenuDetectText);
    }

    function ghost_dropdown(options) {

        // Default options
        let defultOptions = {
            targetElement: "nav.ul li",
            hasChildrenClasses: "menu-item-has-children",
            hasChildDetectText: "[has_child]",
            hasChildrenIcon: "<svg width='19' height='10' viewBox='0 0 19 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.74805 1.52002L9.54883 9.00002L17.3496 1.52002' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>",
            hasMegaMenuDetectText: "[has_megamenu]",
            hasMegaMenuClasses: "menu-item-has-megamenu",
            submenuUlClasses: "ghost-submenu",
            subitemDetectText: "[subitem]",
            subitemLiClasses: "subitem"
        }

        //Marge defaultOptions 
        options = {
            ...defultOptions,
            ...options
        }


        // Target Element
        let targetElement = options.targetElement;

        //Default value 
        let hasChildrenClasses = options.hasChildrenClasses;
        let hasChildDetectText = options.hasChildDetectText;
        let hasMegaMenuClasses = options.hasMegaMenuClasses;
        let hasMegaMenuDetectText = options.hasMegaMenuDetectText;
        let hasChildrenIcon = options.hasChildrenIcon;
        let submenuUlClasses = options.submenuUlClasses;
        let subitemDetectText = options.subitemDetectText;
        let subitemLiClasses = options.subitemLiClasses;


        // Declare neccesary variable
        let parentEl = $(targetElement);
        let childEL = $(targetElement);
        let parentLen = 0;
        let domArrayElement = [];
        let indexPush = [];
        let elIndex = 0;
        let parentIndex = [];

        $(`${targetElement}`).parent().addClass('ghost-dropdown-menu');

        let that;
        // Find Dropdown parent element
        parentEl.each(function (index, element) {
            if ($(this).text().indexOf(hasChildDetectText) >= 0) {
                parentIndex.push(index); // Make dropdown parent array index
                parentLen++;

                $(this).push(element);
                $(this).addClass(hasChildrenClasses); // Add claas in dropdown   element

                $(this).append(`<ul class='${submenuUlClasses}'></ul>`); // Append submenu element

                $(targetElement).css("opacity", "1");
            }

            if ($(this).text().includes(hasMegaMenuDetectText)) {
                $(this).addClass(hasMegaMenuClasses);
                that = $(this);
            }
        });

        $(targetElement).css("opacity", "1");

        $(`.${hasChildrenClasses}`).append(hasChildrenIcon);

        if(!$(hasChildrenClasses).length){
            $(targetElement).css("opacity", "1");
        }

        // Using loop to reach dropdown parent element
        for (let i = 0; i < parentLen; i++) {

            elIndex = 0 // Initial elemet value

            // Find subitem element
            childEL.each(function (index, element) {
                let subitem = $(this).text().includes(subitemDetectText); // Find subitem element

                if (subitem) {

                    if (elIndex >= parentIndex[i + 1]) { // Each loop will be break
                        return false; //Stoped each loop 
                    }

                    if (elIndex <= parentIndex[i + 1] || elIndex >= parentIndex[parentIndex.length - 1]) {

                        if (!indexPush.includes(index)) { //Check if not index already insert 
                            $(this).addClass(subitemLiClasses); // Add class in subitem element
                            let st = $(this).children().text(); // Find subitem inner text
                            $(this).children().text(st.replaceAll(subitemDetectText, "")); // Replace subitem inner text

                            domArrayElement.push(element); // Incert subitem element in dom array
                            indexPush.push(index); // incert subitem index in indexPush array

                        }
                    }

                }
                elIndex++; // increase element index value
            });


            $(`.${hasChildrenClasses} ul.${submenuUlClasses}:eq(${i})`).append(domArrayElement); // Append related subitem dom element into submenu 

            domArrayElement = []; // Make dom array element empty. 

        }
        remove_text(hasChildrenClasses, hasChildDetectText);


        if (options.multi_level) {
            multiLevel();
        }
        if (options.mega_menu) {
            megamenu(hasMegaMenuClasses, 3, 4, hasMegaMenuDetectText, submenuUlClasses);
        }
       

    }

    $(document).ready(function () {
        ghost_dropdown({
            targetElement: "ul.nav li",
            hasChildrenClasses: "menu-item-has-children",
            hasChildrenIcon: "<svg width='19' height='10' viewBox='0 0 19 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.74805 1.52002L9.54883 9.00002L17.3496 1.52002' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>",
            hasChildDetectText: "[has_child]",
            submenuUlClasses: "ghost-submenu",
            subitemDetectText: "[subitem]",
            subitemLiClasses: "subitem",
            multi_level: true,
            mega_menu: true
        });
        if (window.matchMedia("(max-width: 767px)").matches) {
            document.querySelectorAll(".menu-item-has-children > a").forEach((elm)=>{
                elm.innerHTML += "<svg class='m-svg' width='19' height='10' viewBox='0 0 19 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.74805 1.52002L9.54883 9.00002L17.3496 1.52002' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>"
                elm.addEventListener("click",(event)=>{
                    event.preventDefault()
                    event.target.parentElement.classList.toggle("show-submenu")
                })
            })
            // for the svg
            document.querySelectorAll(".m-svg").forEach((elm)=>{
                elm.addEventListener("click",(event)=>{
                    event.preventDefault()
                    event.target.parentElement.parentElement.classList.toggle("show-submenu")
                })
            })
        }
        
        document.body.classList.add('is-dropdown-loaded');
    });


}(jQuery));
