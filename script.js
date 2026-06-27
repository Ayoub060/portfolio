document.addEventListener('DOMContentLoaded', () => {

  const nav       = document.querySelector('nav');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const sections  = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {

    
    nav.classList.toggle('scrolled', window.scrollY > 40);

    
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  });


  const revealTargets = document.querySelectorAll(
    '.about-card, .skill-card, .exp-card, .form-card, .contact-card, .timeline-item'
  );

  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');

    const delay = (i % 4) + 1;
    el.classList.add(`reveal-delay-${delay}`);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const bars = document.querySelectorAll('.bar-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const target = bar.dataset.width;  
        setTimeout(() => { bar.style.width = target; }, 200);
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => {
    const w = bar.style.width || '0%';
    bar.dataset.width = w;
    bar.style.width = '0%';          
    barObserver.observe(bar);
  });

  const h1 = document.querySelector('h1');
  if (h1) {
    const textNode = [...h1.childNodes].find(n => n.nodeType === Node.TEXT_NODE);
    if (textNode) {
      const fullText = textNode.textContent.trim() + ' ';
      textNode.textContent = '';
      let i = 0;
      const type = () => {
        if (i <= fullText.length) {
          textNode.textContent = fullText.slice(0, i);
          i++;
          setTimeout(type, 80);
        }
      };
      setTimeout(type, 400);
    }
  }
  document.querySelector('nav .btn-contact')?.addEventListener('click', () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelector('.btn-send')?.addEventListener('click', () => {
    window.location.href = 'mailto:tighidetayoub98@outlook.fr?subject=Prise de contact – Portfolio';
  });

  document.querySelector('.badge')?.setAttribute('title', 'Disponible dès septembre 2026');

});
let langueActive = "fr";
let translations = {};

// Chargement du JSON au démarrage
async function chargerTraductions() {
  const response = await fetch("traductions.json");
  translations = await response.json();
  appliquerLangue(langueActive);
}

// Applique la langue sur tous les éléments data-i18n
function appliquerLangue(langue) {
  langueActive = langue;
  const textes = translations[langue];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const cle = el.getAttribute("data-i18n");
    if (textes[cle]) {
      el.innerHTML = textes[cle];
    }
  });
    // ← AJOUTE CES LIGNES
  const btnCV = document.getElementById("btn-cv");
  if (langue === "en") {
    btnCV.href = "documents/CV/TIGHIDET_Ayoub_CV_CDI___english_version (1).pdf";
  } else {
    btnCV.href = "documents/CV/TIGHIDET_Ayoub_CV_CDI___French_version.pdf";
  }
  // Met à jour le bouton actif
  document.getElementById("btn-fr").classList.toggle("active", langue === "fr");
  document.getElementById("btn-en").classList.toggle("active", langue === "en");

  // Change l'attribut lang de la page
  document.documentElement.lang = langue;
}

// Appelée au clic sur FR / EN
function changerLangue(langue) {
  if (langue === langueActive) return; // déjà actif, rien à faire
  appliquerLangue(langue);
}

// Lancement
chargerTraductions();