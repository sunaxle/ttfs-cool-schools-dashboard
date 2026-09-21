/**
 * Master Unified Executive Portal Hub v5 Logic
 * TTFS × UTRGV Project Cool Schools
 */

(function () {
  'use strict';

  const searchInput = document.getElementById('portalSearchInput');
  const categoryPills = document.querySelectorAll('.pill-btn');
  const cards = document.querySelectorAll('.module-card');

  let activeCategory = 'all';
  let searchTerm = '';

  function filterCards() {
    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-cat');
      const textContent = card.textContent.toLowerCase();

      const matchesCat = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesSearch = searchTerm === '' || textContent.includes(searchTerm);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Category Pill Clicks
  categoryPills.forEach(btn => {
    btn.addEventListener('click', function () {
      categoryPills.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      activeCategory = this.getAttribute('data-cat');
      filterCards();
    });
  });

  // Search Input
  searchInput.addEventListener('input', function (e) {
    searchTerm = e.target.value.trim().toLowerCase();
    filterCards();
  });

  // Keyboard shortcut '/' to search
  window.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });
})();
