#!/usr/bin/env node

// dependencies
var fs = require('fs');
var newYaml;

function addAds() {

  // Read in amp-ad file, and the ad vendors
  var ampAd = fs.readFileSync('../content/docs/reference/components/amp-ad.md', { encoding: 'utf8' });
  var supportPortion = (ampAd.split('## Supported ad networks')[1]).split('##')[0].trim();
  var vendorNames = supportPortion.split('\n');

  vendorNames = vendorNames.map(a => {
    var match = a.match(/\[([^\]]+)\]\(([^\)]+)\)/);
    var title = match[1];
    var link = match[2];
    return 'title: ' + title + '\n          link: ' + link;
  });

  newYaml += `
    - title@: Ads Components
      section_items:
        - `;

  newYaml += vendorNames.join('\n        - ');

}

function addAnalytics() {

  // Read in amp-ad file, and the ad vendors
  var ampAnalytics = fs.readFileSync('../content/docs/reference/components/amp-analytics.md', { encoding: 'utf8' });
  var supportPortion = (ampAnalytics.split('## Analytics vendors')[1]).split('\n## ')[0];
  var individualVendors = supportPortion.split('\n###');
  individualVendors.shift();

  individualVendors = individualVendors.map(function (a) {
    var title = a.match(/^.*/)[0].trim();
    var link = a.match(/\[[^\]]+\]\((http[^\)]+)\)/);

    return 'title: ' + title + '\n          link: ' + (link ? link[1] : '');
  });

  newYaml += `
    - title@: Analytics Components
      section_items:
        - `;

  newYaml += individualVendors.join('\n        - ');

}

function addContentPlatforms() {
  newYaml += `
    - title@: Distribution Platforms
      description: These platforms distribute AMP pages on their surfaces.
      section_items:
        - title: Google
          link: https://google.com
        - title: Hatena
          link: https://www.hatena.com/
        - title: LinkedIn
          link: https://www.linkedin.com/
        - title: Medium
          link: https://medium.com/
        - title: Nuzzel
          link: http://nuzzel.com/
        - title: Pinterest
          link: https://pinterest.com/
        - title: Reddit
          link: https://www.reddit.com/
        - title: Twitter
          link: https://twitter.com/
        - title: Ghost
          link: https://ghost.org`;
}

function addCMS() {
  newYaml += `
    - title@: CMS Providers
      description: These providers can create AMP pages with supported plug-ins or functionality
      section_items:
        - title: Drupal
          link: https://www.drupal.org/project/amp
        - title: Hatena
          link: http://help.hatenablog.com/entry/amp
        - title: Marfeel
          link: https://atenea.marfeel.com/atn/product/marfeel-press/360-platform/google-amp/marfeel-s-accelerated-mobile-pages-google-amp-solution
        - title: Squarespace
          link: https://support.squarespace.com/hc/en-us/articles/223766868-Using-AMP-with-Squarespace
        - title: WordPress
          link: https://wordpress.org/plugins/amp/`;
}

function addVideo() {
  newYaml += `
    - title@: Audio/Video Components
      section_items:
        - title: AOL O2
          link:
        - title: Beachfront Reach
          link:
        - title: Brid.tv
          link:
        - title: Brightcove
          link:
        - title: Dailymotion
          link:
        - title: Gfycat
          link:
        - title: JW Player
          link:
        - title: Kaltura
          link:
        - title: Soundcloud
          link:
        - title: Springboard
          link:
        - title: Vimeo
          link:
        - title: Vine
          link:
        - title: YouTube
          link:`;
}

function addBrowsers() {
  newYaml += `
browsers:
  - title: Chrome
    img: /static/img/platforms/chrome.png
  - title: Firefox
    img: /static/img/platforms/firefox.png
  - title: Safari
    img: /static/img/platforms/safari.png
  - title: Edge
    img: /static/img/platforms/edge.png
  - title: Opera
    img: /static/img/platforms/opera.png`;
}

// Put them into the right location in the YAML
newYaml = `page_title: "Participants"

tech_companies:
  section_title@: Technology Companies using AMP
  sections:`;

addContentPlatforms();
addCMS();
addAds();
addAnalytics();
addVideo();
addBrowsers();

// Save back to disk
fs.writeFileSync('../content/includes/who.yaml', newYaml);


