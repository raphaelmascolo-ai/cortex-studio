function openModal(businessPlanUrl) {
  const modal = document.querySelector('.modal-overlay');
  if (!modal) return;

  // Store the download URL
  modal.dataset.bpUrl = businessPlanUrl;

  // Reset to form state
  const form = modal.querySelector('.modal-form');
  const success = modal.querySelector('.modal-success');
  if (form) { form.style.display = 'block'; form.reset(); }
  if (success) success.style.display = 'none';

  // Clear validation
  modal.querySelectorAll('.form-input').forEach(input => input.classList.remove('invalid'));
  modal.querySelectorAll('.form-error').forEach(err => err.style.display = 'none');

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus first input
  const firstInput = modal.querySelector('input');
  if (firstInput) setTimeout(() => firstInput.focus(), 100);
}

function closeModal() {
  const modal = document.querySelector('.modal-overlay');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function handleModalSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const modal = document.querySelector('.modal-overlay');

  // Validate
  const firstName = form.querySelector('[name="firstName"]');
  const email = form.querySelector('[name="email"]');
  let valid = true;

  if (!firstName.value.trim()) {
    firstName.classList.add('invalid');
    firstName.nextElementSibling.style.display = 'block';
    valid = false;
  } else {
    firstName.classList.remove('invalid');
    firstName.nextElementSibling.style.display = 'none';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    email.classList.add('invalid');
    email.nextElementSibling.style.display = 'block';
    valid = false;
  } else {
    email.classList.remove('invalid');
    email.nextElementSibling.style.display = 'none';
  }

  if (!valid) return;

  // Submit to Make webhook
  const formData = new FormData(form);
  const jsonData = {};
  formData.forEach((value, key) => { if (key !== '_gotcha') jsonData[key] = value; });
  jsonData.source = 'business-plan';
  jsonData.page = window.location.pathname;
  jsonData.timestamp = new Date().toISOString();

  fetch(form.action, {
    method: 'POST',
    body: JSON.stringify(jsonData),
    headers: { 'Content-Type': 'application/json' },
    mode: 'no-cors'
  })
  .then(() => {
    // Show success state
    form.style.display = 'none';
    const success = modal.querySelector('.modal-success');
    if (success) {
      success.style.display = 'block';
      const downloadLink = success.querySelector('.download-link');
      if (downloadLink) {
        downloadLink.href = modal.dataset.bpUrl;
      }
    }
  })
  .catch(() => {
    const errorEl = form.querySelector('.form-submit-error');
    if (errorEl) errorEl.style.display = 'block';
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Close modal on overlay click
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Close button
  const closeBtn = document.querySelector('.modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Form submit
  const modalForm = document.querySelector('.modal-form');
  if (modalForm) modalForm.addEventListener('submit', handleModalSubmit);

  // Download buttons
  document.querySelectorAll('[data-bp-url]').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.bpUrl);
    });
  });
});
