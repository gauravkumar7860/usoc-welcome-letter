/**
 * USoC Welcome Letter Generator — Main JS
 * Lamrin Tech Skills University
 */

/* ============================================================
   QUOTES COLLECTION (20+)
   ============================================================ */
const QUOTES = [
  "Dream big. Learn continuously. Lead confidently.",
  "Success begins with curiosity and sustained effort.",
  "Your future starts with today's determination.",
  "Innovation is born where knowledge meets imagination.",
  "Education is the passport to the future.",
  "The expert in anything was once a beginner.",
  "Knowledge is the bridge between who you are and who you want to become.",
  "Strive not to be a success, but rather to be of value.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Your potential is limitless when you embrace continuous learning.",
  "Excellence is not a destination but a continuous journey.",
  "The roots of education are bitter, but the fruit is sweet.",
  "Develop a passion for learning and you will never cease to grow.",
  "The more that you read, the more things you will know.",
  "An investment in knowledge pays the best interest.",
  "Education is the most powerful weapon you can use to change the world.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Technology is best when it brings people together.",
  "In the middle of every difficulty lies opportunity.",
  "Learning is not attained by chance; it must be sought with ardour.",
  "What we learn with pleasure, we never forget."
];

/* ============================================================
   UTILITY: Get today's formatted date
   ============================================================ */
function getTodayFormatted() {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString('en-IN', { month: 'long' });
  const year = now.getFullYear();
  return `${day} ${month} ${year}`;
}

/* ============================================================
   UTILITY: Random item from array
   ============================================================ */
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ============================================================
   CONFETTI
   ============================================================ */
function launchConfetti() {
  if (typeof confetti !== 'function') return;

  const end = Date.now() + 2800;
  const colors = ['#0B2E63', '#1F5DAA', '#FFD700', '#ffffff', '#4CAF50'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/* ============================================================
   TYPEWRITER
   ============================================================ */
function typewriterFill(container, htmlContent, speed = 6) {
  // Convert HTML to a text+node structure for typewriter effect
  // We'll do a character-by-character approach on the full innerHTML
  container.innerHTML = '';
  container.style.visibility = 'visible';

  // Strip tags approach: reveal full html in chunks
  const fullHtml = htmlContent;
  let i = 0;

  // For performance on long text, reveal in larger chunks
  const CHUNK = 3;

  function tick() {
    if (i >= fullHtml.length) {
      container.innerHTML = fullHtml; // Ensure final state is clean
      return;
    }
    // Reveal next CHUNK characters safely (respect open tags)
    i = Math.min(i + CHUNK, fullHtml.length);
    // Find a safe cut point (not inside a tag)
    let cut = i;
    if (fullHtml[cut - 1] === '<') cut--;
    // Slice and set
    const slice = fullHtml.slice(0, cut);
    // Count open vs close tags to avoid broken HTML
    container.innerHTML = slice;
    requestAnimationFrame(tick);
  }

  tick();
}

/* ============================================================
   QR CODE GENERATION
   ============================================================ */
function generateQR() {
  const qrContainer = document.getElementById('qrcode');
  qrContainer.innerHTML = '';

  if (typeof QRCode === 'undefined') {
    qrContainer.innerHTML = '<p style="font-size:0.7rem;color:#999;">QR unavailable</p>';
    return;
  }

  new QRCode(qrContainer, {
    text: 'https://www.lamrin.edu.in/',
    width: 90,
    height: 90,
    colorDark: '#0B2E63',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M
  });
}

/* ============================================================
   BUILD LETTER HTML
   ============================================================ */
function buildLetterHTML(data) {
  const { name, fatherName, gender, course } = data;
  const prefix  = gender === 'Female' ? 'Ms.' : 'Mr.';
  const relation = gender === 'Female' ? 'D/O' : 'S/O';
  const date     = getTodayFormatted();
  const quote    = randomFrom(QUOTES);

  return {
    date,
    quote,
    bodyHTML: `
      <p class="letter-greeting">Greetings from the University School of Computing!</p>

      <p class="letter-para salutation">
        Dear <span class="highlight-name">${prefix} ${name}</span>,
      </p>

      <p class="congrats">Congratulations!</p>

      <p class="letter-para">
        On behalf of the faculty, staff, and students of the University School of Computing,
        we are delighted to welcome <span class="highlight-name">${prefix} ${name}</span>,
        ${relation} Shri <span class="highlight-name">${fatherName}</span>, to the
        <span class="highlight-course">${course}</span> programme at
        <span class="highlight-course">Lamrin Tech Skills University</span>.
      </p>

      <p class="letter-para">
        Your admission marks the beginning of an exciting academic journey filled with learning,
        innovation, collaboration, and personal growth. We are confident that your time at our
        university will provide you with the knowledge, skills, and experiences needed to build
        a successful future.
      </p>

      <p class="letter-para">
        We warmly welcome you to the <span class="highlight-course">Orientation Programme</span>
        and look forward to supporting you throughout your academic journey.
      </p>

      <p class="letter-para">
        We wish you every success and hope your years at Lamrin Tech Skills University
        are enriching, inspiring, and memorable.
      </p>
    `
  };
}

/* ============================================================
   FORM SUBMISSION
   ============================================================ */
document.getElementById('welcome-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name       = document.getElementById('student-name').value.trim();
  const fatherName = document.getElementById('father-name').value.trim();
  const gender     = document.querySelector('input[name="gender"]:checked')?.value;
  const course     = document.getElementById('course').value;

  // Basic validation
  if (!name || !fatherName || !gender || !course) {
    alert('Please fill in all fields before generating the letter.');
    return;
  }

  // Hide form
  const formSection = document.getElementById('form-section');
  formSection.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  formSection.style.opacity = '0';
  formSection.style.transform = 'translateY(-20px)';

  setTimeout(() => {
    formSection.classList.add('hidden');
    renderLetter({ name, fatherName, gender, course });
  }, 400);
});

/* ============================================================
   RENDER LETTER
   ============================================================ */
function renderLetter(data) {
  const letterSection = document.getElementById('letter-section');
  const { date, quote, bodyHTML } = buildLetterHTML(data);

  // Set date
  document.getElementById('letter-date').innerHTML = `<strong>${date}</strong>`;

  // Set quote
  document.getElementById('quote-text').textContent = `"${quote}"`;

  // Show section
  letterSection.style.display = 'block';
  letterSection.style.animation = 'slide-up 0.7s cubic-bezier(0.4,0,0.2,1) both';

  // Render body with typewriter
  const bodyEl = document.getElementById('letter-body-content');
  bodyEl.innerHTML = '';

  // Generate QR
  generateQR();

  // Confetti
  launchConfetti();

  // Typewriter on body (slight delay for letter to appear)
  setTimeout(() => {
    bodyEl.innerHTML = bodyHTML;
    bodyEl.style.opacity = '0';

    // Simple fade-in for the body
    bodyEl.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bodyEl.style.opacity = '1';
      });
    });
  }, 500);

  // Scroll to letter
  setTimeout(() => {
    letterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 300);
}

/* ============================================================
   PRINT
   ============================================================ */
document.getElementById('btn-print').addEventListener('click', () => {
  window.print();
});

/* ============================================================
   PDF DOWNLOAD via html2pdf.js
   ============================================================ */
document.getElementById('btn-pdf').addEventListener('click', async () => {
  const btn = document.getElementById('btn-pdf');
  btn.textContent = '⏳ Generating PDF…';
  btn.disabled = true;

  await new Promise(r => setTimeout(r, 300));

  const element = document.querySelector('.letter-card');

  const opt = {
    margin:       [8, 8, 8, 8],
    filename:     'USoC_Welcome_Letter.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['avoid-all'] }
  };

  html2pdf().set(opt).from(element).save()
    .then(() => {
      btn.innerHTML = '⬇ Download PDF';
      btn.disabled = false;
    })
    .catch(() => {
      btn.innerHTML = '⬇ Download PDF';
      btn.disabled = false;
    });
});

/* ============================================================
   GENERATE ANOTHER
   ============================================================ */
document.getElementById('btn-another').addEventListener('click', () => {
  const letterSection = document.getElementById('letter-section');
  const formSection   = document.getElementById('form-section');

  letterSection.style.transition = 'opacity 0.4s ease';
  letterSection.style.opacity = '0';

  setTimeout(() => {
    letterSection.style.display = 'none';
    letterSection.style.opacity = '1';

    // Reset form
    document.getElementById('welcome-form').reset();

    formSection.classList.remove('hidden');
    formSection.style.opacity = '0';
    formSection.style.transform = 'translateY(20px)';
    formSection.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        formSection.style.opacity = '1';
        formSection.style.transform = 'translateY(0)';
      });
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 400);
});
