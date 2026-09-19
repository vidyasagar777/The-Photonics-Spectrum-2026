  // Mobile nav toggle
  const burger = document.getElementById('burger');
  const navlinks = document.getElementById('navlinks');
  burger.addEventListener('click', () => {
    const open = navlinks.style.display === 'flex';
    navlinks.style.display = open ? 'none' : 'flex';
    navlinks.style.flexDirection = 'column';
    navlinks.style.position = 'absolute';
    navlinks.style.top = '68px';
    navlinks.style.left = '0';
    navlinks.style.right = '0';
    navlinks.style.background = '#0A1F44';
    navlinks.style.padding = '18px 28px';
    navlinks.style.gap = '16px';
    burger.setAttribute('aria-expanded', String(!open));
  });
  navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (window.innerWidth <= 680) navlinks.style.display = 'none';
  }));

  // Active nav link highlighting
  const sections = ['about','topics','speakers','committee','register','contact']
    .map(id => document.getElementById(id)).filter(Boolean);
  const navA = Array.from(navlinks.querySelectorAll('a'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => io.observe(s));

  // Hero prism animation, once
  const prismBox = document.getElementById('prismBox');
  requestAnimationFrame(() => prismBox.classList.add('animate'));

  // Countdown to Oct 1, 2026, 10:00 IST
  const target = new Date('2026-10-01T10:00:00+05:30').getTime();
  function tickCountdown(){
    const now = Date.now();
    let diff = target - now;
    const els = {
      d: document.getElementById('cd-days'),
      h: document.getElementById('cd-hours'),
      m: document.getElementById('cd-mins'),
      s: document.getElementById('cd-secs'),
    };
    if (diff <= 0){
      els.d.textContent = '00'; els.h.textContent = '00'; els.m.textContent = '00'; els.s.textContent = '00';
      return;
    }
    const day = Math.floor(diff / 86400000); diff -= day * 86400000;
    const hr  = Math.floor(diff / 3600000);  diff -= hr * 3600000;
    const min = Math.floor(diff / 60000);    diff -= min * 60000;
    const sec = Math.floor(diff / 1000);
    els.d.textContent = String(day).padStart(2,'0');
    els.h.textContent = String(hr).padStart(2,'0');
    els.m.textContent = String(min).padStart(2,'0');
    els.s.textContent = String(sec).padStart(2,'0');
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  // ---- Speaker data — edit the "photo" field for each speaker to add their image ----
  // Leave photo: "" to keep the "Releasing soon" placeholder box.
  const SPEAKERS = [
    { name: "Dr. Avinash Upadhyay",  role: "Research Associate NSUT", photo: "https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=kUR345QAAAAJ&citpid=9" },
    { name: "Dr. Neeraj Goel",  role: "Assistant Professor NSUT", photo: "https://nsut.ac.in/sites/default/files/styles/node_image_/public/2021-07/ngl_0.jpg?itok=MNq3Mky6" },
    { name: "Shri. Vivek Narayan",  role: "Retd.DDG (DS), DoT", photo: "https://broadbandindiaforum.in/wp-content/uploads/2023/04/Vivek-Narayan.jpg" },
    { name: "Dr. Jhonattan Cordoba Ramirez",  role: "Department of Electronic Engineering - Universidade Federal de Minas Gerais (UFMG)", photo: "https://www.cpdee.ufmg.br/~jcordoba/images/image.jpg" },
    { name: "Dr. Nitesh Mudgal",  role: "Associate Professor Poornima College of Engineering, Jaipur", photo: "https://www.poornima.org/uploads/team/1716897839.jpg" },
    { name: "Dr. Deepak Punetha",  role: "MNIT Allahabad Prayagraj", photo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgTO8MLoZzAryQxHG0TtjtuFYn90x07ASDz7mtfZeDS3QQiTiDTkxOs8V9OS3gqZdyStiX-kPtQIQ0FW1ZudYu2p-vPzY8vIxCcTIQ2rl953nB21ZtZ3IspZuQxZ5qAToZ6TSTY4UekvwRK-GX9EUyV5QuwdaiGP_kLmz8TrIicutuqxhIJrEAMXxiu/w226-h283/52259-255x319.jpg" },
    { name: "Dr. Syed Sadique Anwer Askari",  role: "Assistant Professor Aligarh Muslim University (AMU), Aligarh, India.", photo: "https://api.amu.ac.in/storage/images/empphoto/10081353-1787031772.jpg" },
    
    { name: "Dr. Travis Sawyer",  role: "Wyant College of Optical Sciences The University of Arizona", photo: "https://optics.arizona.edu/sites/default/files/styles/az_medium/public/2025-09/Portrait-Websize-33-Travis-Sawyer.png.webp?itok=h5gPGdCk" },
    { name: "Dr. Garima Bawa",  role: "Postdoctoral Research Associate at CREOL University of Central Florida, Orlando", photo: "https://www.optica.org/getattachment/8f48695a-ab82-4be7-b001-504331b5e1ba/Garima_Bawa_Headshot.jpg?lang=en-US&ext=.jpg" },
    { name: "Dr. Abhijit Roy",  role: "Assistant Professor MAHE Manipal, India", photo: "images/Abhijit.jpg.jpeg" },
    { name: "Dr. VINOD MISHRA",  role: "Senior Technical Officer CSIR & Assistant Professor AcSIR Chandigarh", photo: "https://icsio.csio.res.in/empimg/949.jpg" },
    { name: "Dr. Tatevik Chalyan",  role: "Vrije Universiteit Brussel, Belgium", photo: "https://optica-org-web-afd-f9abf4byhbacgfgk.z02.azurefd.net/optica/media/osa.media/osaf/siegman%20school/tatevik.jpg?t=637538415384608071" },
    { name: "Dr. Aisha Bibi", role: "Photonics Integration Engineer Salience Labs Ltd U.K.", photo: "https://www.optica.org/getattachment/87b76959-e228-4187-ad0f-8391b4363a3a/Aisha_Bibi_headshot.jpeg?lang=en-US&ext=.jpeg" },
    { name: "Dr. Saswatee Banerjee", role: "Senior Optics & Photonics Engineer Photonic Wave Solutions LLC U.S.A.", photo: "https://media.licdn.com/dms/image/v2/D4E03AQHryQsmFMCwvQ/profile-displayphoto-shrink_400_400/B4EZWf0LneG0Ak-/0/1742143011726?e=1791417600&v=beta&t=tCpEV6v6aRZv8Mno3FGqRGGWa2qFxeKIuJI3_TbjCZ0" },
    { name: "Dr. Rohit Sangwan",  role: "Tech Lead  ARK Infosolutions Pvt. Ltd.", photo: "https://media.licdn.com/dms/image/v2/D4D03AQECmYapJ1_8Jw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1669381761088?e=1791417600&v=beta&t=vXI15_PSBbfj-LDBAmf98Xc-t7htXVrLmIaJlRFxP84" },
    { name: "Dr. Rahul Kumar",  role: "Assistant Professor Institute of Infrastructure, Technology, Research And Management", photo: "https://iitram.ac.in/upload/employee/common/rahulkumar.jpg" },
    { name: "Dr. Amit Singhal",  role: "Associate Professor NSUT", photo: "https://www.nsut.ac.in/sites/default/files/styles/node_image_/public/2021-08/as1.jpg?itok=fi84TBRR" },
    { name: "Dr. Tatjana Pladere", role: "Associate Professor University of Latvia", photo: "https://www.optica.org/getattachment/15038c4b-afea-434b-ad45-ea4420efd1be/Tatjana_Pladere_headshot_(2).jpg?lang=en-US&ext=.jpg" },
    { name: "Dr. Swapnil Sonawane",  role: "Assistant Professor NSUT", photo: "https://nsut.ac.in/sites/default/files/styles/node_image_/public/2025-11/jpg.jpg?itok=SLNFZ3N5" },
    { name: "Dr. Fabian Ruf",  role: "Integrated Optics & Photonics Designer", photo: "https://opticaorg-dev-cac7d2csctagc8bm.z01.azurefd.net/$web/optica/media/files/headshots/fabian_1.jpg?ext=.jpg" },
    { name: "Dr. Jayakrishnan K",  role: "Application Engineer ARK Infosolutions Pvt. Ltd", photo: "https://media.licdn.com/dms/image/v2/D5603AQFWdCKM47ht8A/profile-displayphoto-crop_800_800/B56ZesJ5KmHoAI-/0/1750939967492?e=1791417600&v=beta&t=EA-QSlABpt5z2t66ZB7CkexObZ4Dptaqcc9BONKlAjY" },
    { name: "Arun Kumar", role: "Director AMBITION TECHNOLOGIES", photo: "https://media.licdn.com/dms/image/v2/C5103AQEFy2nrEt-Wfg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517582382921?e=1791417600&v=beta&t=iNw9zZW7pE0U-No4rjWy8GVYfJ0eb6qqIEvjRPFbUog" },
    { name: "Dr. Juan Rafael Alvarez Velasquez", role: "Associate Professor Télécom Paris", photo: "https://www.telecom-paris.fr/wp-content-EvDsK19/uploads/2025/03/juan-rafael-alvarez-630x630-1.jpg" },
    { name: "Dr. Balwinder Raj", role: "Associate Professor - NIT , Jalandhar", photo: "https://www.nitj.ac.in/images/faculty/16101412343.jpg" },
    { name: "Dr. Ashish Maurya", role: "Assistant Professor Bennett University", photo: "https://www.bennett.edu.in/wp-content/uploads/2025/09/Dr.-Ashish-Maurya.webp" },
    { name: "Dr. Saheer Cheemadan", role: "SO HSS Areekode", photo: "https://www.optica.org/getattachment/8b131818-8365-43d8-8dc7-ccc7614c9b94/Saheer_Cheemadan_headshot.png?lang=en-US&ext=.png" },
    { name: "Dr. Anirudha Kulkarni",  role: "Director at RF AQUA SOLUTIONS", photo: "https://media.licdn.com/dms/image/v2/D4E03AQE335K0HVbtYQ/profile-displayphoto-crop_800_800/B4EZsMDR29HgAI-/0/1765433745655?e=1791417600&v=beta&t=6IieVs-lwBc27yt2Nry9tdTKu7w-bboz67AGqWEpJs0" },
    { name: "Dr. Chandra Prakash", role: " Assistant Professor NIT Kurukshetra", photo: "https://nitkkr.ac.in/wp-content/uploads/2025/11/Chandra-Prakash.jpg" },
    { name: "Dr. John Healy", role: "Assistant Professor University College Dublin", photo: "https://people.ucd.ie/john.healy/thumbnail" },
    { name: "Dr. Mahima Sharma", role: "postdoctoral associate IIT Hyderabad", photo: "https://media.licdn.com/dms/image/v2/D4E03AQF5H4YoGKnhsA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1706129096077?e=1791417600&v=beta&t=ing9mZwy0ymCYJWgkM0FoxukGDqbTsOWN_Ntk9woLSU" },
    { name: "Dr. Lewis Hill", role: "General Manager at Photonics Leadership Group", photo: "https://www.optica.org/getattachment/3e586e19-7ccd-4571-8406-a195695fbe92/Lewis_Hill_Headshot.png?lang=en-US&ext=.png" },
   // { name: "Speaker 22", role: "Affiliation & topic — TBA", photo: "" },
    
  ];

  const speakersGrid = document.getElementById('speakersGrid');
  SPEAKERS.forEach((sp) => {
    const el = document.createElement('div');
    el.className = 'speaker';
    const photoTag = sp.photo
      ? `<img class="speaker-photo" src="${sp.photo}" alt="${sp.name}">`
      : `<div class="speaker-photo photo-empty"><span class="tag">Releasing soon</span></div>`;
    el.innerHTML = `
      ${photoTag}
      <h4>${sp.name}</h4>
      <div class="srole">${sp.role}</div>
    `;
    speakersGrid.appendChild(el);
  });

  // ---- Student committee data — edit the "photo" field to add an image ----
  const STUDENT_COMMITTEE = [
    { name: "Rohit Kumar Rai", role: "President", photo: "images/president.jpg" },
    { name: "Km Priyanka", role: "Vice President", photo: "images/vp.jpeg" },
    { name: "Neetu Raj Bharti", role: "Secretary", photo: "images/secretary.jpg" },
    { name: "Pradnya Moon", role: "Treasurer", photo: "images/treasurer.jpg" },
    { name: "Saumya Mishra", role: "Technical Officer", photo: "images/toc.jpg" },
    { name: "Upasana Tripathi", role: "Technical Officer", photo: "images/toc1.jpg" },
  ];

  const studentGrid = document.getElementById('studentCommitteeGrid');
  STUDENT_COMMITTEE.forEach((st) => {
    const el = document.createElement('div');
    el.className = 'cmember';
    const photoTag = st.photo
      ? `<img class="avatar" src="${st.photo}" alt="${st.name}">`
      : `<div class="avatar photo-empty-round"></div>`;
    el.innerHTML = `
      ${photoTag}
      <div><h4>${st.name}</h4><p>${st.role}</p></div>
    `;
    studentGrid.appendChild(el);
  });



(function(){
  const overlay = document.getElementById('speakerModalOverlay');
  const closeBtn = document.getElementById('speakerModalClose');
  if(!overlay) return;

  function openModal(){ overlay.classList.add('open'); document.body.style.overflow='hidden'; }
  function closeModal(){ overlay.classList.remove('open'); document.body.style.overflow=''; }

  // Shows once per browser tab/session — remove this "if" check to show every visit
  setTimeout(openModal, 600);

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if(e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
})();
// ---- Student volunteers data — edit the "photo" field to add an image ----
const STUDENT_VOLUNTEERS = [
  { name: "Amit Kumar Gupta", role: "PhD Student NSUT", photo: "images/Amit Sir.jpeg" },
  { name: "Dandetikar Vidyasagar", role: "PhD Student NSUT", photo: "https://media.licdn.com/dms/image/v2/D5603AQFvioz80tMeuA/profile-displayphoto-crop_800_800/B56Z8Sysz.JoAM-/0/1782726709746?e=1791417600&v=beta&t=nRDdICqvRPC__yeL3grg_SusuIMu1lHtfEM_CGsXaKs" },
  { name: "Shubham Singh", role: "PhD Student NSUT", photo: "images/shubham.jpeg" },
  { name: "Neha Kumari", role: "PhD Student NSUT", photo: "https://media.licdn.com/dms/image/v2/D5603AQFTTy-ptvyb1Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1706887269930?e=2147483647&v=beta&t=vASAiwU_o6kZqzkHapXlJhaChRL1cAPBXj_MNprr75A" },
  { name: "Sanjeev Kumar", role: "PhD Student NSUT", photo: "images/sanjeev.jpeg" },
  { name: "Chanchal Nigam", role: "PhD Student NSUT", photo: "images/chanchal.jpeg" },
  { name: "Shashwat Saxena", role: "PhD Student NSUT", photo: "images/sash.jpeg" },
];

const volunteersGrid = document.getElementById('studentVolunteersGrid');
STUDENT_VOLUNTEERS.forEach((v) => {
  const el = document.createElement('div');
  el.className = 'cmember';
  const photoTag = v.photo
    ? `<img class="avatar" src="${v.photo}" alt="${v.name}">`
    : `<div class="avatar photo-empty-round"></div>`;
  el.innerHTML = `
    ${photoTag}
    <div><h4>${v.name}</h4><p>${v.role}</p></div>
  `;
  volunteersGrid.appendChild(el);
});
