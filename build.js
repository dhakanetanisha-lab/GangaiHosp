console.log("build.js loaded");

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Handlebars = require('handlebars');

/* =====================================================
   HELPERS
===================================================== */

function loadYAML(file) {
  return yaml.load(fs.readFileSync(file, 'utf8'));
}

function loadReviews() {
  const file = './data/reviews.json';
  if (!fs.existsSync(file)) return { pending: [], approved: [] };

  const raw = fs.readFileSync(file, 'utf8').trim();
  return raw ? JSON.parse(raw) : { pending: [], approved: [] };
}

/* =====================================================
   BUILD PAGE (CORE FUNCTION)
===================================================== */

function buildPage(data, pageTemplatePath, outputPath, title) {

  const layoutTemplatePath = './templates/layout.html';

  const layoutSource = fs.readFileSync(layoutTemplatePath, 'utf8');
  const pageSource = fs.readFileSync(pageTemplatePath, 'utf8');

  const layoutTemplate = Handlebars.compile(layoutSource);
  const pageTemplate = Handlebars.compile(pageSource);

  // render page body first
  const bodyHTML = pageTemplate(data);

  // inject body into layout
  const finalHTML = layoutTemplate({
    ...data,
    title,
    body: bodyHTML
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, finalHTML, 'utf8');

  console.log(`✔ Built: ${outputPath}`);
}

/* =====================================================
   READ MORE PAGE BUILDER (FOR ADMIN)
===================================================== */

function buildReadMorePage(filename) {

  const layoutData = loadYAML('./content/layout.yml');
  const readmore = loadYAML('./content/readmore.yml');

  buildPage(
    {
      ...layoutData,
      ...readmore
    },
    './templates/readmore.html',
    `./public/${filename}.html`,
    'Read More | Gangai Hospital'
  );

}

/* =====================================================
   FULL SITE BUILD
===================================================== */

function buildSite() {

  const layoutData = loadYAML('./content/layout.yml');
  const reviews = loadReviews();

  /* ==============================
     HOMEPAGE
  ============================== */

  const homepage = loadYAML('./content/homepage.yml');

  homepage.testimonials ||= {};
  homepage.testimonials.items = reviews.approved.map(r => ({
    message: r.message,
    name: r.name
  }));

  buildPage(
    {
      ...layoutData,
      ...homepage
    },
    './templates/homepage.html',
    './public/index.html',
    'Gangai Hospital'
  );

  /* ==============================
     ABOUT US
  ============================== */

  const aboutus = loadYAML('./content/aboutus.yml');

  buildPage(
    {
      ...layoutData,
      ...aboutus
    },
    './templates/aboutus.html',
    './public/aboutus.html',
    'About Us | Gangai Hospital'
  );

  /* ==============================
     PRODUCTS
  ============================== */

  const products = loadYAML('./content/products.yml');

  buildPage(
    {
      ...layoutData,
      ...products
    },
    './templates/products.html',
    './public/products.html',
    'Products | Gangai Hospital'
  );

  /* ==============================
     SERVICES
  ============================== */

  const services = loadYAML('./content/services.yml');

  buildPage(
    {
      ...layoutData,
      ...services
    },
    './templates/services.html',
    './public/services.html',
    'Services | Gangai Hospital'
  );

  /* ==============================
     GALLERY
  ============================== */

  const gallery = loadYAML('./content/gallery.yml');
  gallery.images ||= [];

  buildPage(
    {
      ...layoutData,
      ...gallery
    },
    './templates/gallery.html',
    './public/gallery.html',
    'Gallery | Gangai Hospital'
  );

  /* ==============================
     VIDEOS
  ============================== */

  const videos = loadYAML('./content/videos.yml');

  buildPage(
    {
      ...layoutData,
      ...videos
    },
    './templates/videos.html',
    './public/videos.html',
    'Videos | Gangai Hospital'
  );

  /* ==============================
     PANCHAKARMA
  ============================== */

  const panchakarma = loadYAML('./content/panchakarma.yml');

  buildPage(
    {
      ...layoutData,
      ...panchakarma
    },
    './templates/panchakarma.html',
    './public/panchakarma.html',
    'Panchakarma | Gangai Hospital'
  );

  console.log('✔ Full site build complete');

}

/* =====================================================
   RUN BUILD ONLY IF FILE EXECUTED DIRECTLY
===================================================== */

if (require.main === module) {
  buildSite();
}

/* =====================================================
   EXPORT FUNCTIONS FOR SERVER
===================================================== */

module.exports = {
  buildPage,
  buildReadMorePage,
  buildSite
};