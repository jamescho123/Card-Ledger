const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'..');
const read = file => JSON.parse(fs.readFileSync(path.join(root,'work',file)));
const before = read('scan-photo-before.json');
const after = read('scan-photo-after.json');
const recent = read('recent-image-scan-photo-results.json');
if (recent.count !== 20 || recent.results.some(row=>row.error)) throw new Error('A complete error-free 20-image run is required.');
const norm = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\bjr\.?\b/g,'').replace(/[^a-z0-9]/g,'');
const family = row => {
  const card = row.identity || {}, expected = row.sourceExpected;
  return norm(card.player)===norm(expected.player) && String(card.year||'').startsWith(expected.year.slice(0,4))
    && norm(card.brand)===norm(expected.brand) && [expected.setName,[expected.setName,expected.type].filter(Boolean).join(' ')]
      .some(set => norm(card.setName).replace(/^(panini|topps)/,'')===norm(set).replace(/^(panini|topps)/,''));
};
const players = recent.results.filter(row=>norm(row.identity?.player)===norm(row.sourceExpected.player)).length;
const families = recent.results.filter(family).length;
const wrongSelections = recent.results.filter(row=>row.selected && !family(row));
const report = `# Quick Scan Photo Robustness\n\nTested October 20, 2026.\n\n## Changes\n\n- OpenCV card-boundary detection and perspective correction.\n- Original, rectified and adaptive lighting-normalized images all participate in candidate retrieval.\n- Local grayscale contrast comparison reduces dependence on ambient brightness and color cast.\n- OCR retains strong original-photo name readings and tries a corrected photo for weak readings.\n- Original upload remains unchanged. Parallel names still require evidence or user review; similarity scores are not calibrated probabilities.\n\n## Synthetic Stress Test\n\nThree HCI references (Curry Topps #321, Luka Donruss #177, Wembanyama Mosaic #238), each in five conditions: clean, dim, uneven light, warm cast, and tilted on a background. No player/card hints were supplied.\n\n| Measure | Before | After |\n|---|---:|---:|\n| Correct top card family | ${before.familyCorrect}/15 | ${after.familyCorrect}/15 |\n| Source reference in top eight | ${before.referenceInTop8}/15 | ${after.referenceInTop8}/15 |\n\nThese are synthetic alterations of database references, not an independent real-camera accuracy estimate. An additional perspective-skewed background test passed; black, white and random-noise images did not meet image-only auto-selection criteria.\n\n## Existing Real-Image Regression\n\n20 previously downloaded public gallery images, neutral upload filenames, isolated fake account, cloud requests blocked. Source labels are evaluation-only.\n\n- Matching player: ${players}/20.\n- Matching player/year/brand/set family: ${families}/20.\n- Automatically selected families failing those four checks: ${wrongSelections.length}.\n- Browser errors: ${recent.pageErrors.length}.\n\nExact parallels, serial numbers, authenticity and severe glare are not established by these tests.\n\n## Reproduction\n\n- tests/scan-photo-robustness.py\n- tests/scan-photo-guards.py\n- tests/downloaded-image-scan.cjs\n- tests/scan-candidate-priority.cjs\n- tests/hci-card-identification.cjs\n\nOptional preprocessing dependency: hci-basketball-20260919/scan-requirements.txt, installed locally into .scan-deps (excluded from Git). Without it, the service retains its original image comparison path.\n\nOpenCV references: [Contour features](https://docs.opencv.org/4.x/dd/d49/tutorial_py_contour_features.html), [adaptive histogram equalization](https://docs.opencv.org/4.x/d5/daf/tutorial_py_histogram_equalization.html).\n`;
fs.writeFileSync(path.join(root,'SCAN-PHOTO-ROBUSTNESS-REPORT.md'),report);
console.log(JSON.stringify({syntheticBefore:before.familyCorrect,syntheticAfter:after.familyCorrect,players,families,wrongSelections:wrongSelections.length}));
