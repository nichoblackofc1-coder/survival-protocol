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
    var target = document.getElementById('checkout-order-box');
    if (!target) return;

    ctaButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        // If it's a real checkout external URL, let it navigate.
        // If it's still #checkout anchor, smoothly scroll down to the offer box!
        if (this.getAttribute('href') === '#checkout') {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }

  // =========================================================================
  // META PIXEL INITIATE CHECKOUT TRACKING
  // =========================================================================
  function initPixelTracking() {
    var mainBtn = document.getElementById('main-cta-button');
    if (mainBtn) {
      mainBtn.addEventListener('click', function () {
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'InitiateCheckout', {
            content_name: 'The Civilian War Survival Protocol',
            value: 9.90,
            currency: 'USD'
          });
        }
      });
    }
  }

  // DOM Content Loaded
  document.addEventListener('DOMContentLoaded', function () {
    initFaq();
    initComments();
    initSmoothScroll();
    initPixelTracking();
  });

})();
