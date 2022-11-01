$(document).ready(function () {
    svg4everybody();

    // === toggle attr
    $.fn.toggleAttr = function (attr, attr1, attr2) {
        return this.each(function () {
            var self = $(this);
            if (self.attr(attr) == attr1) {
                self.attr(attr, attr2);
            } else {
                self.attr(attr, attr1);
            }
        });
    };


    // === header product menu ===
    $('.header-burger').on('click', function (){
        $('.header').toggleClass('opened');
        $('body').toggleAttr('style', 'overflow: hidden', 'overflow: visible');
    });
    // $('.header-menu a[href^="#"]').on('click', function () {
    // })



    // === header links ===
    $('.header-menu a[href^="#"]').on('click', function () {
        $('.header').removeClass('opened');
        $('body').css('overflow', 'visible');
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 50
        }, 1000);

        return false;
    });


    if (window.matchMedia("(min-width: 767px)").matches) {
        $('.soon').height($(window).height() - $('header').height());
    }

    $('[data-fancybox]').fancybox({
        autoFocus: false
    });


    // === accordion
    $('.accordion-head').click(function() {
        var dropDown = $(this).closest('.accordion').find('.accordion-body'),
            card = $(this).parent();
        card.parent().find('.accordion-body').not(dropDown).slideUp('fast');
        if (card.hasClass('active')) {
            card.removeClass('active');
        } else {
            card.parent().find('.accordion.active').removeClass('active');
            card.addClass('active');
        }
        dropDown.stop(false, true).slideToggle('fast');
    });

    $('#showAllFaq').click(function() {
        $('.faq-other').addClass('show');
        $('#showAllFaq').addClass('hidden');
    });

    // === timer
    (function ($) {

        "use strict";
        var defaults = {
            endDate: moment().add(4, 'day'),
            showSecond: false
        }
        var move = function (el, args) {

            var $this = $('.time-countdown');
            var sDate = moment();
            var eDate = args.endDate;

            var diff = moment(eDate.diff(sDate))

            $this.find('.counter--day > span').html(diff.get('date'));
            $this.find('.counter--hour > span').html(diff.get('hour'));
            $this.find('.counter--minute > span').html(diff.get('minute'));
            // if (args.showSecond)
            //     $this.find('.counter--second > span').html(diff.get('second'));
            setTimeout(move, 1000, el, args);
        };

        var init = function (el, args) {
            var tpl = '<p>In</p>\n' +
                '<p class="counter--day"><span></span>days</p>\n' +
                '<p class="counter--hour"><span></span>hours</p>\n' +
                '<p class="counter--minute"><span></span>minutes</p>';
            // if (args.showSecond)
            //     tpl += '<p class="counter--second"><span></span>seconds</p>';
            el.append(tpl);
            move(el, args);
        }

        $.fn.timeCountdown = function (options) {

            var el = $(this);
            var opts = $.extend({}, defaults, options);

            if (el.attr('data-end-date')) {
                opts.endDate = moment(el.attr('data-end-date'));
            }

            init(el, opts);
        }

    }(jQuery));

    $('.time-countdown').timeCountdown({showSecond: true});


});
