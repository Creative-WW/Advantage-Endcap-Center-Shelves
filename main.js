//main.js

(() => {
  const config = window.projectConfig;

  // Cache DOM elements
  const pageTitle = document.getElementById('page-title');
  const metaDescription = document.getElementById('meta-description');
  const projectTitle = document.getElementById('project-title');
  const footerLogo = document.getElementById('footer-logo');
  const arButton = document.getElementById('ar-button');
  const fallback = document.getElementById('fallback');

  if (config) {
    document.title = `${config.title} AR`;
    pageTitle.textContent = `${config.title} AR`;
    metaDescription.setAttribute("content", config.description);
    projectTitle.textContent = config.title;

    if (footerLogo && config.logo) {
      footerLogo.src = config.logo;
    }

    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isiOS || isAndroid) {
      // Create hidden model-viewer element
      const modelViewer = document.createElement('model-viewer');
      modelViewer.setAttribute('src', config.glb);
      modelViewer.setAttribute('ios-src', config.usdz);
      modelViewer.setAttribute('ar', '');
      modelViewer.setAttribute('ar-modes', 'scene-viewer quick-look');
      modelViewer.setAttribute('camera-controls', '');
      modelViewer.setAttribute('reveal', 'manual');
      modelViewer.style.display = 'none';
      document.body.appendChild(modelViewer);

      // Add image and overlay icon inside #ar-button
      arButton.innerHTML = `
        <div class="ar-image-wrapper">
          <img src="${config.image}" class="main-image" alt="View in AR" loading="eager" />
          ${config.tapIcon ? `<img src="${config.tapIcon}" alt="Tap icon" class="ar-icon" aria-hidden="true" />` : ''}
        </div>
      `;

      arButton.style.cursor = 'pointer';

      arButton.querySelector('.ar-image-wrapper').addEventListener('click', () => {
        modelViewer.activateAR();
      });

      // Hide fallback container completely
      fallback.style.display = 'none';

    } else {
      // Unsupported device: show disabled button AND fallback message inside #ar-button
      arButton.innerHTML = `
        <button class="disabled-btn" disabled>AR Not Available</button>
        <div class="fallback">AR is only supported on iOS and Android devices.</div>
      `;

      // Make sure fallback container is visible (even though empty)
      fallback.style.display = 'block';
      fallback.textContent = '';
      
      // Disable cursor pointer on #ar-button
      arButton.style.cursor = 'default';
    }
  } else {
    console.error("projectConfig is not defined");
  }
})();
