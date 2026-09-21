/**
 * Presentation September 2026 Updates Engine
 * Interactive slide deck controller with keyboard navigation, full-screen, and speaker notes
 */
(function() {
  'use strict';

  var currentSlide = 0;
  var slides = [];
  var totalSlides = 0;
  var notesDrawer = null;
  var notesContent = null;
  var progressBar = null;
  var counterEl = null;
  var notesBtn = null;
  var fsBtn = null;
  var prevBtn = null;
  var nextBtn = null;

  var speakerNotes = [
    "Good morning, everyone. Today we are presenting our Month 4 milestone delivery for the Texas Trees Cool Schools Program. In September, we transitioned from prototype validation to building offline-ready field architecture, publication standards, curriculum portals, and comprehensive governance dossiers.",
    "We are exactly on schedule and within budget. Month 4 billings total $7,022.00, bringing our cumulative earnings to $91,063.00 (57.8% of the total contract award) across Deliverables A and C.",
    "Our campus data directly operationalizes the findings of the latest Nature Communications paper on urban cooling (McDonald et al., 2026). We are demonstrating in real time how native schoolyard canopies provide maximum heat relief (3.1x WBGT reduction) where children need it most.",
    "One of our primary feedback points from Donna ISD was that outdoor campus boundaries have weak cellular reception. Our new Service Worker pre-caches all map data and libraries so tablets function flawlessly 100% offline.",
    "We built two new interactive portals: a TEKS-aligned lesson plan engine that turns schoolyard trees into living science labs, and a sponsorship portal that calculates the exact environmental return on investment for community tree adopters.",
    "To ensure all baseline reports and future peer-reviewed papers meet the highest visual standards, we locked in publication-grade figure conventions, accessible color scales, and strict caption structures.",
    "Our usability dossier gives superintendents a powerful financial justification: schoolyard trees aren't just aesthetic amenities; they protect hundreds of thousands of dollars in State ADA attendance revenues by preventing heat-induced asthma absences.",
    "We delivered complete classroom-ready materials: slide decks, printable double-sided student worksheets, and an updated monitoring standard operating procedure that makes outdoor science safe, structured, and easy for teachers to lead.",
    "Every line of code and every document adheres strictly to our COPPA and FERPA privacy mandates. The platform is entirely open, static, and portable for seamless client handoff.",
    "Thank you for your partnership and support. All September milestones are complete and validated, and we look forward to advancing our Month 5 goals in October. We are now open for questions and feedback."
  ];

  function init() {
    slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
    totalSlides = slides.length;
    notesDrawer = document.getElementById('notes-drawer');
    notesContent = document.getElementById('notes-content');
    progressBar = document.getElementById('progress-bar');
    counterEl = document.getElementById('slide-counter');
    notesBtn = document.getElementById('btn-notes');
    fsBtn = document.getElementById('btn-fullscreen');
    prevBtn = document.getElementById('btn-prev');
    nextBtn = document.getElementById('btn-next');

    if (totalSlides === 0) return;

    showSlide(0);
    bindEvents();
  }

  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    currentSlide = index;

    slides.forEach(function(slide, i) {
      if (i === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update Progress
    var pct = ((currentSlide + 1) / totalSlides) * 100;
    if (progressBar) {
      progressBar.style.width = pct + '%';
    }

    if (counterEl) {
      counterEl.textContent = (currentSlide + 1) + ' / ' + totalSlides;
    }

    // Update Speaker Notes
    if (notesContent) {
      notesContent.textContent = speakerNotes[currentSlide] || 'No speaker notes for this slide.';
    }

    // Update Buttons
    if (prevBtn) prevBtn.disabled = (currentSlide === 0);
    if (nextBtn) nextBtn.disabled = (currentSlide === totalSlides - 1);
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      showSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      showSlide(currentSlide - 1);
    }
  }

  function toggleNotes() {
    if (!notesDrawer) return;
    var isOpen = notesDrawer.classList.toggle('open');
    if (notesBtn) {
      if (isOpen) {
        notesBtn.classList.add('pres-btn--active');
      } else {
        notesBtn.classList.remove('pres-btn--active');
      }
    }
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(function(err) {
        console.warn('Error attempting to enable fullscreen:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  function bindEvents() {
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (notesBtn) notesBtn.addEventListener('click', toggleNotes);
    if (fsBtn) fsBtn.addEventListener('click', toggleFullScreen);

    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        toggleNotes();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullScreen();
      } else if (e.key === 'Home') {
        e.preventDefault();
        showSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        showSlide(totalSlides - 1);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
