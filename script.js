/**
 * CIVILIAN WAR SURVIVAL PROTOCOL
 * Direct Response Sales Page Interactions
 */

(function () {
  'use strict';

  // =========================================================================
  // INTERACTIVE ACCORDION FAQ
  // =========================================================================
  function initFaq() {
    var faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(function (button) {
      button.addEventListener('click', function () {
        var currentItem = this.parentElement;
        var isActive = currentItem.classList.contains('active');

        // Collapse all others
        document.querySelectorAll('.faq-item').forEach(function (item) {
          item.classList.remove('active');
        });

        if (!isActive) {
          currentItem.classList.add('active');
        }
      });
    });
  }

  // =========================================================================
  // COMMUNITY DISCUSSION HELPFUL REACTIONS
  // =========================================================================
  function initComments() {
    var likeButtons = document.querySelectorAll('.comment-action-like');
    likeButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var countSpan = this.querySelector('.like-count');
        var isLiked = this.getAttribute('data-liked') === 'true';
        var currentCount = parseInt(countSpan.textContent, 10) || 0;

        if (!isLiked) {
          this.setAttribute('data-liked', 'true');
          countSpan.textContent = currentCount + 1;
          this.classList.add('active-liked');
        } else {
          this.setAttribute('data-liked', 'false');
          countSpan.textContent = Math.max(0, currentCount - 1);
          this.classList.remove('active-liked');
        }
      });
    });
  }

  // =========================================================================
  // SMOOTH SCROLLING FOR ORDER CTA BUTTONS
  // =========================================================================
  function initSmoothScroll() {
    var ctaButtons = document.querySelectorAll('a[href="#checkout"]');
    var target = document.getElementById('checkout') || document.getElementById('checkout-order-box');
    if (!target) return;

    ctaButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#checkout') {
          // If the button is already inside the checkout box, don't re-scroll
          if (this.id === 'main-cta-button') {
            return;
          }
          e.preventDefault();
          var headerOffset = 18;
          var elementPosition = target.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // =========================================================================
  // UTM & TRACKING PARAMETER FORWARDING TO CHECKOUT
  // =========================================================================
  function initUtmForwarding() {
    var rawSearch = window.location.search;
    if (!rawSearch || rawSearch.length <= 1) {
      return;
    }

    var pageParams = new URLSearchParams(rawSearch);
    var checkoutLinks = document.querySelectorAll('a[href*="centerpag.com"], a[href*="hotmart.com"], .btn-cta-master:not(#hero-first-cta)');

    checkoutLinks.forEach(function (link) {
      var rawHref = link.getAttribute('href');
      if (!rawHref || rawHref.startsWith('#')) {
        return;
      }

      try {
        var url = new URL(link.href);
        // Forward all query parameters from page URL to checkout URL
        pageParams.forEach(function (value, key) {
          url.searchParams.set(key, value);
        });

        // Tracking standard: sync src with utm_source if not explicitly set
        if (!url.searchParams.has('src') && url.searchParams.has('utm_source')) {
          url.searchParams.set('src', url.searchParams.get('utm_source'));
        }
        // Sync sck with utm_campaign if not explicitly set
        if (!url.searchParams.has('sck') && url.searchParams.has('utm_campaign')) {
          url.searchParams.set('sck', url.searchParams.get('utm_campaign'));
        }

        link.href = url.toString();
      } catch (err) {
        var cleanHref = link.href.replace(/\?$/, '');
        var separator = cleanHref.indexOf('?') !== -1 ? '&' : '?';
        link.href = cleanHref + separator + rawSearch.substring(1);
      }
    });
  }

  // =========================================================================
  // META PIXEL INITIATE CHECKOUT TRACKING
  // =========================================================================
  function initPixelTracking() {
    var checkoutButtons = document.querySelectorAll('a[href*="centerpag.com"], a[href*="hotmart.com"], .btn-cta-master:not(#hero-first-cta)');
    checkoutButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'InitiateCheckout', {
            content_name: 'The Civilian War Survival Protocol',
            value: 9.90,
            currency: 'USD'
          });
        }
      });
    });
  }

  // DOM Content Loaded
  document.addEventListener('DOMContentLoaded', function () {
    initFaq();
    initComments();
    initSmoothScroll();
    initUtmForwarding();
    initPixelTracking();
  });

})();
