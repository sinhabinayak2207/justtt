/* RAKESH — cinematic descent: space -> Canada -> Ontario, continuous, satellite view.
 *
 * A photoreal three.js globe (sun + lit moon + stars behind it) zooms in on one long
 * continuous move and rotates to bring the Great Lakes to centre. As the world texture
 * reaches its limit and softens, the frame focus-pulls (crossfade through a thin haze —
 * no hard cut) straight into real ESRI satellite imagery of Ontario, which settles to
 * frame the province. A faint border traces Ontario; twelve cities plant flag markers.
 * Then the overlay lifts to reveal the homepage.
 *
 * Once per session (survives language-switch reloads). Honors reduced-motion, skips with
 * no WebGL, watchdog-guarded so it can never trap the page. ?intro=1 replays.
 *
 * Texture/image URLs come from window.INTRO_TEX / INTRO_SAT when present (the standalone
 * inlines them). Geometry is embedded below. */
(function () {
  'use strict';
  var SAT = {"iw":2000,"ih":926,"pins":[{"n":"Toronto","x":1328.1,"y":667.9,"p":1,"lx":4,"ly":-80},{"n":"Barrie","x":1295.8,"y":590.4,"p":0,"lx":-96,"ly":-58},{"n":"Mississauga","x":1300.6,"y":674.6,"p":0,"lx":-146,"ly":-6},{"n":"Hamilton","x":1276.7,"y":709.7,"p":0,"lx":-98,"ly":72},{"n":"Kitchener","x":1211.3,"y":689.1,"p":0,"lx":-156,"ly":44},{"n":"London","x":1132.1,"y":738.2,"p":0,"lx":-44,"ly":88},{"n":"Windsor","x":943.5,"y":808.7,"p":0,"lx":-72,"ly":66},{"n":"Ottawa","x":1716.1,"y":481.8,"p":0,"lx":-104,"ly":-10},{"n":"Kingston","x":1633.1,"y":607.0,"p":0,"lx":-104,"ly":44},{"n":"Sudbury","x":1158.6,"y":369.2,"p":0,"lx":-98,"ly":-42},{"n":"North Bay","x":1319.9,"y":388.4,"p":0,"lx":92,"ly":-56},{"n":"Thunder Bay","x":289.7,"y":170.4,"p":0,"lx":90,"ly":-40}],"outline":"M1311.8 -100.9 1314.6 256.2 1307.7 269.2 1322.2 287.8 1321.7 304.0 1336.3 321.9 1352.0 335.4 1373.6 367.1 1394.2 378.8 1399.6 385.4 1520.5 404.9 1545.1 418.1 1549.6 427.5 1557.3 433.8 1578.7 443.0 1587.3 441.3 1588.4 432.5 1599.5 435.1 1601.8 446.0 1609.4 451.1 1614.1 464.0 1620.2 468.0 1648.7 478.2 1664.8 471.3 1676.1 472.1 1700.3 486.9 1741.8 471.0 1802.5 458.6 1826.7 459.3 1853.0 466.8 1844.3 492.8 1860.6 505.0 1849.1 510.4 1841.4 518.6 1817.2 526.9 1792.8 531.5 1754.8 546.1 1686.6 591.0 1631.3 607.4 1611.8 608.5 1580.6 623.9 1571.6 621.7 1590.9 612.7 1574.0 617.7 1577.7 609.1 1520.3 618.6 1518.4 623.1 1545.8 615.3 1545.5 621.9 1570.9 612.5 1565.5 627.8 1577.3 626.4 1595.1 618.9 1574.5 636.8 1594.9 637.3 1564.8 646.6 1554.4 644.0 1561.0 636.2 1550.0 640.8 1544.4 636.2 1552.1 634.6 1527.8 637.4 1517.8 631.1 1522.2 629.3 1504.9 627.0 1501.4 628.9 1507.5 631.3 1494.2 629.6 1358.7 649.6 1330.3 668.9 1319.2 668.5 1306.5 677.2 1286.8 702.9 1294.4 710.9 1332.1 716.8 1360.6 708.4 1361.5 725.9 1360.1 728.0 1365.1 730.6 1364.1 735.8 1376.3 746.0 1358.0 753.4 1320.6 749.5 1241.7 758.7 1215.7 777.4 1251.1 784.9 1208.2 781.5 1165.8 771.8 1122.8 773.3 1075.2 800.0 1067.7 814.8 1063.8 814.8 1067.6 808.1 1060.9 814.4 1045.1 815.2 1011.8 828.8 1002.1 838.4 999.4 850.9 986.5 838.1 958.9 843.7 934.3 834.5 944.2 808.9 1000.7 808.9 1007.7 804.6 1008.5 789.4 990.0 788.2 985.4 784.3 990.9 783.0 998.0 775.1 1002.8 761.5 1002.9 747.3 1008.5 739.5 1034.2 729.1 1079.4 700.2 1084.4 685.3 1079.5 622.5 1093.1 608.3 1096.8 594.9 1115.2 585.3 1129.7 566.5 1121.1 529.0 1112.2 528.0 1095.6 510.1 1097.3 505.9 1082.1 503.4 1084.7 498.3 1128.0 499.9 1123.6 509.6 1129.9 515.2 1131.2 526.0 1146.3 530.3 1142.1 535.5 1163.3 530.0 1143.9 551.6 1158.1 546.2 1169.2 548.1 1164.0 568.7 1178.4 557.4 1194.7 555.0 1201.6 566.9 1253.7 582.1 1263.4 572.8 1264.5 559.5 1251.2 552.2 1252.2 545.1 1268.9 540.3 1276.1 550.5 1299.0 552.3 1292.5 548.5 1296.5 538.9 1290.8 540.3 1290.8 546.8 1285.9 545.3 1281.2 532.9 1272.2 532.0 1270.0 524.7 1252.6 513.2 1264.4 510.5 1249.5 501.1 1259.2 493.1 1256.9 485.9 1249.7 482.8 1242.9 486.6 1245.8 490.4 1238.6 490.2 1227.8 480.3 1226.3 485.9 1221.0 462.3 1210.4 466.2 1184.4 429.2 1153.3 425.5 1141.6 428.7 1140.1 419.0 1131.5 425.4 1105.5 423.5 1105.5 418.8 1087.3 426.6 1097.3 421.2 1090.0 419.3 1104.9 416.5 1083.8 419.0 1100.7 414.6 1092.5 408.0 1079.6 413.7 1077.8 419.5 1076.1 414.2 1082.7 409.9 1038.4 408.6 1013.7 403.5 1018.7 400.9 981.7 403.6 986.3 398.0 948.7 402.8 856.3 389.8 854.4 385.7 836.9 386.6 829.5 381.4 834.2 367.9 823.9 362.8 787.7 370.2 780.0 361.4 797.7 347.7 793.1 341.1 784.4 347.3 784.8 334.1 800.7 333.3 805.1 328.0 795.1 322.1 781.4 321.6 778.6 326.0 760.2 317.6 773.3 291.9 781.2 285.3 776.3 277.7 733.9 251.3 740.3 244.0 737.8 240.2 748.2 232.6 744.0 225.7 753.2 215.8 678.2 218.3 646.3 212.0 617.7 185.1 603.9 149.0 585.8 128.7 573.4 133.4 557.6 125.2 541.5 131.4 529.4 125.3 526.0 128.9 495.8 129.7 479.6 121.7 468.7 122.7 465.7 117.2 457.9 119.6 425.7 110.4 417.3 102.9 401.8 108.8 393.6 106.0 394.3 118.7 410.0 127.6 410.2 135.6 399.5 146.6 394.4 147.8 396.9 143.5 391.2 146.9 386.1 141.3 388.2 149.2 379.9 153.5 375.8 150.1 370.2 160.9 362.1 165.2 358.9 158.9 362.5 153.0 384.2 139.1 388.0 130.4 383.1 122.4 370.5 120.5 363.4 130.0 367.4 135.1 363.0 136.9 364.2 142.6 355.3 144.7 354.4 155.5 348.1 157.0 343.1 171.6 322.3 177.4 341.1 149.4 301.2 159.5 290.2 169.6 294.9 176.3 280.2 198.2 259.9 210.3 236.9 207.7 221.0 211.2 211.9 208.0 207.7 201.4 195.2 198.6 151.9 200.7 150.8 197.6 132.3 201.1 119.5 183.7 102.4 189.9 80.1 201.9 45.1 205.9 45.4 199.5 31.2 198.4 30.3 189.7 2.2 184.1 -3.7 173.0 -13.2 171.9 -29.1 173.4 -31.6 179.1 -29.1 184.7 -38.9 187.2 -49.8 172.8 -48.0 168.1 -52.4 164.1 -74.4 162.0 -73.5 158.4 -65.9 157.5 -67.5 153.6 -76.7 153.6 -99.7 144.3 -137.3 143.4 -153.4 148.1 -154.2 152.6 -159.4 154.2 -187.5 156.6 -190.8 155.2 -194.1 144.7 -234.8 141.8 -241.3 136.0 -270.5 135.4 -283.6 128.6 -282.2 118.2 -298.1 70.4 -331.8 66.1 -331.6 -297.4 -173.9 -391.7 -40.9 -487.0 121.7 -596.4 283.6 -697.4 296.9 -722.8 311.8 -719.3 328.5 -721.7 352.1 -704.6 369.5 -698.9 383.8 -689.6 423.6 -677.4 427.0 -671.1 450.1 -652.8 451.8 -647.8 464.9 -639.4 461.5 -631.7 468.6 -636.6 489.3 -630.6 488.2 -625.8 528.5 -624.2 530.6 -621.5 581.3 -611.3 602.4 -602.8 637.4 -599.6 676.0 -585.4 695.4 -569.2 723.3 -562.6 724.0 -558.1 714.3 -554.9 694.9 -536.7 696.5 -532.8 692.2 -525.1 716.4 -551.8 736.6 -557.4 779.0 -551.6 808.1 -556.7 832.4 -554.7 850.5 -559.7 870.5 -553.4 869.8 -548.8 875.1 -551.8 884.1 -549.7 888.2 -539.9 885.9 -550.3 873.8 -555.9 928.5 -546.9 951.1 -550.7 958.4 -544.2 953.0 -537.3 959.6 -542.3 984.2 -544.0 994.2 -540.8 996.1 -543.4 1019.0 -532.9 1017.0 -536.6 1020.2 -539.0 1016.8 -543.5 1026.8 -537.0 1022.4 -530.0 1025.8 -523.5 1024.1 -518.9 1032.1 -509.8 1006.2 -459.0 1006.9 -442.9 1014.4 -436.0 1012.5 -433.4 1018.7 -433.9 1027.0 -428.1 1038.9 -399.8 1029.8 -379.2 1040.6 -344.5 1026.3 -338.0 1020.9 -311.6 1041.9 -303.1 1055.4 -292.6 1053.8 -290.7 1060.9 -282.2 1099.2 -258.4 1099.7 -247.5 1107.6 -242.3 1098.8 -243.7 1079.2 -236.9 1071.3 -237.2 1064.9 -230.2 1078.1 -235.6 1105.1 -235.0 1120.8 -221.1 1159.1 -211.3 1168.4 -199.4 1177.3 -197.8 1200.1 -180.3 1208.9 -160.4 1217.2 -154.1 1218.5 -143.5 1194.5 -134.5 1184.2 -123.9 1174.2 -121.0 1156.3 -108.2 1165.0 -110.5 1163.8 -106.0 1172.4 -117.4 1190.1 -121.7 1207.3 -135.1 1221.9 -140.9 1263.5 -132.0 1290.4 -118.2 1296.3 -110.0 1311.8 -100.9Z"};
  var TEX = window.INTRO_TEX || {
    day: 'assets/earth_day.jpg', clouds: 'assets/earth_clouds.png',
    normal: 'assets/earth_normal.jpg', spec: 'assets/earth_spec.jpg', moon: 'assets/moon.jpg'
  };
  var SAT_IMG = window.INTRO_SAT || 'assets/ontario_sat.jpg';
  var FORCE = /[?&]intro=1/.test(location.search);
  var SEEN = 'rakesh-intro-seen';

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  try { if (!FORCE && sessionStorage.getItem(SEEN)) return; } catch (e) {}
  if (typeof gsap === 'undefined') return;

  if (window.THREE) main();
  else {
    var _s = document.createElement('script');
    _s.src = 'js/three.min.js';
    _s.onload = main;
    _s.onerror = function () { try { sessionStorage.setItem(SEEN, '1'); } catch (e) {} };
    (document.head || document.documentElement).appendChild(_s);
  }

  function main() {
  var DEG = Math.PI / 180;
  var root = document.documentElement;

  var probe = document.createElement('canvas');
  var hasGL = !!(window.WebGLRenderingContext && (probe.getContext('webgl') || probe.getContext('experimental-webgl')));
  if (!hasGL) { try { sessionStorage.setItem(SEEN, '1'); } catch (e) {} return; }

  // ---------------------------------------------------------------- build DOM
  var ov = document.createElement('div');
  ov.id = 'intro';
  ov.innerHTML =
    '<canvas class="intro__canvas"></canvas>' +
    '<div class="intro__haze"></div>' +
    '<div class="intro__sat">' +
      '<img class="intro__sat-img" src="' + SAT_IMG + '" alt="Satellite view of Ontario and the Great Lakes"/>' +
      '<svg class="intro__sat-ov" viewBox="0 0 ' + SAT.iw + ' ' + SAT.ih + '" preserveAspectRatio="xMidYMid slice">' +
        '<path class="intro__ontario-line" d="' + SAT.outline + '"/>' +
        '<g class="intro__pins"></g>' +
      '</svg>' +
    '</div>' +
    '<div class="intro__vignette"></div>' +
    '<div class="intro__caption"><span class="intro__cap-item">' +
      '<span class="cap-line"></span><span class="cap-text" id="intro-cap"></span><span class="cap-line"></span>' +
    '</span></div>' +
    '<button class="intro__skip" type="button">Skip intro &rarr;</button>';
  document.body.insertBefore(ov, document.body.firstChild);
  root.classList.add('intro-lock');

  var canvas = ov.querySelector('.intro__canvas');
  var haze = ov.querySelector('.intro__haze');
  var sat = ov.querySelector('.intro__sat');
  var ontarioLine = ov.querySelector('.intro__ontario-line');
  var pinsG = ov.querySelector('.intro__pins');
  var capItem = ov.querySelector('.intro__cap-item');
  var capText = ov.querySelector('#intro-cap');
  var skipBtn = ov.querySelector('.intro__skip');

  // --------------------------------------------------------------- three.js
  var W = innerWidth, H = innerHeight;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 200);
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(W, H, false);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x05070d, 1);

  var loader = new THREE.TextureLoader();
  loader.crossOrigin = 'anonymous';
  var mat = new THREE.MeshPhongMaterial({
    map: loader.load(TEX.day), normalMap: loader.load(TEX.normal),
    specularMap: loader.load(TEX.spec), specular: new THREE.Color(0x2a2f36), shininess: 14
  });
  var earth = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 96), mat);
  scene.add(earth);
  var clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.013, 64, 64),
    new THREE.MeshPhongMaterial({ map: loader.load(TEX.clouds), transparent: true, opacity: 0.85, depthWrite: false })
  );
  scene.add(clouds);

  scene.add(new THREE.AmbientLight(0x2b3a4d, 1.1));
  var sunLight = new THREE.DirectionalLight(0xfff6ec, 1.5);
  sunLight.position.set(-1.1, 0.6, 2.9);
  scene.add(sunLight);

  function sunTexture() {
    var c = document.createElement('canvas'); c.width = c.height = 128;
    var g = c.getContext('2d');
    var rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    rg.addColorStop(0, 'rgba(255,251,240,1)');
    rg.addColorStop(0.16, 'rgba(255,240,205,0.98)');
    rg.addColorStop(0.42, 'rgba(255,201,120,0.5)');
    rg.addColorStop(1, 'rgba(255,180,80,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }
  var sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: sunTexture(), blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }));
  sun.scale.set(11, 11, 1); sun.position.set(14, 6.5, -26); scene.add(sun);
  var moon = new THREE.Mesh(new THREE.SphereGeometry(0.85, 48, 48),
    new THREE.MeshPhongMaterial({ map: loader.load(TEX.moon), shininess: 2 }));
  moon.position.set(-13, -4.5, -18); scene.add(moon);

  var starGeo = new THREE.BufferGeometry();
  var sv = [];
  for (var i = 0; i < 1700; i++) {
    var r = 60, u = Math.random(), v = Math.random();
    var th = 2 * Math.PI * u, ph = Math.acos(2 * v - 1);
    sv.push(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph));
  }
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(sv, 3));
  var starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.28, sizeAttenuation: true, transparent: true, opacity: 0 });
  var stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  var S = { camZ: 8.6, rotY: -6 * DEG - 3.1, rotX: 5 * DEG, cloudRotY: 0, stars: 0 };
  var running = true;
  var clock = (window.performance && performance.now) ? performance.now.bind(performance) : Date.now;
  var t0 = clock();
  function render() {
    var t = (clock() - t0) / 1000;
    earth.rotation.set(S.rotX, S.rotY, 0);
    clouds.rotation.set(S.rotX, S.rotY + S.cloudRotY, 0);
    camera.position.z = S.camZ;
    moon.position.set(-13 + Math.cos(t * 0.16) * 1.8, -4.5 + Math.sin(t * 0.16) * 1.15, -18);
    moon.rotation.y += 0.0013;
    stars.rotation.y = S.rotY * 0.12;
    starMat.opacity = S.stars;
    renderer.render(scene, camera);
  }
  function frame() { if (!running) return; render(); requestAnimationFrame(frame); }
  requestAnimationFrame(frame);
  window.addEventListener('resize', function () {
    W = innerWidth; H = innerHeight;
    camera.aspect = W / H; camera.updateProjectionMatrix(); renderer.setSize(W, H, false);
  });

  // ------------------------------------------------------------- flag pins
  var SVGNS = 'http://www.w3.org/2000/svg';
  function ns(t) { return document.createElementNS(SVGNS, t); }
  var pinNodes = [];
  SAT.pins.forEach(function (p) {
    var primary = p.p === 1, fs = primary ? 21 : 16;
    var lx = p.lx, ly = p.ly;  // banner centre, offset from the pin (leader line between)
    var g = ns('g'); g.setAttribute('transform', 'translate(' + p.x + ' ' + p.y + ')');
    var ring = ns('circle'); ring.setAttribute('class', 'pin-ring'); ring.setAttribute('r', 7);
    var inner = ns('g'); inner.setAttribute('class', 'pin-inner');
    var lead = ns('line'); lead.setAttribute('class', 'pin-pole');
    lead.setAttribute('x1', 0); lead.setAttribute('y1', 0); lead.setAttribute('x2', lx); lead.setAttribute('y2', ly);
    var rect = ns('rect'); rect.setAttribute('class', 'pin-banner' + (primary ? ' is-primary' : ''));
    var text = ns('text');
    text.setAttribute('class', 'pin-flag-label' + (primary ? ' is-primary' : ''));
    text.setAttribute('text-anchor', 'middle'); text.setAttribute('font-size', fs);
    text.textContent = p.n;
    var dot = ns('circle'); dot.setAttribute('class', 'pin-dot' + (primary ? ' is-primary' : '')); dot.setAttribute('r', primary ? 8 : 6);
    inner.appendChild(lead); inner.appendChild(rect); inner.appendChild(text); inner.appendChild(dot);
    g.appendChild(ring); g.appendChild(inner); pinsG.appendChild(g);
    var tw = 70; try { tw = text.getComputedTextLength(); } catch (e) {}
    var bw = tw + 30, bh = fs + 15;
    rect.setAttribute('x', lx - bw / 2); rect.setAttribute('y', ly - bh / 2); rect.setAttribute('width', bw); rect.setAttribute('height', bh); rect.setAttribute('rx', 6);
    text.setAttribute('x', lx); text.setAttribute('y', ly + fs * 0.35);
    pinNodes.push({ inner: inner, ring: ring, primary: primary });
  });

  function cap(text, at, out) {
    tl.call(function () { capText.textContent = text; }, null, at);
    tl.fromTo(capItem, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, at);
    tl.to(capItem, { opacity: 0, y: -12, duration: 0.6, ease: 'power2.in' }, out);
  }

  // ------------------------------------------------------------- timeline
  var lineLen = ontarioLine.getTotalLength();
  gsap.set(ontarioLine, { strokeDasharray: lineLen, strokeDashoffset: lineLen, opacity: 0 });
  gsap.set(sat, { autoAlpha: 0, scale: 1.12, transformOrigin: '71% 75%' });

  var done = false;
  function finish() {
    if (done) return; done = true;
    clearTimeout(watchdog);
    try { sessionStorage.setItem(SEEN, '1'); } catch (e) {}
    running = false;
    try { if (ov && ov.parentNode) ov.parentNode.removeChild(ov); } catch (e) {}
    root.classList.remove('intro-lock');
    try { if (renderer) renderer.dispose(); } catch (e) {}
    window.dispatchEvent(new Event('rakesh:intro-done'));
  }
  var watchdog = setTimeout(finish, 16000);

  var tl = gsap.timeline({ onComplete: finish });

  // ---- Stage 1: long continuous descent on the real globe (space -> Canada)
  tl.to(S, { stars: 1, duration: 1.7, ease: 'power1.out' }, 0);
  tl.to(S, { camZ: 1.2, duration: 7.2, ease: 'power2.inOut' }, 0);
  tl.to(S, { rotY: -6 * DEG, rotX: 30 * DEG, duration: 7.2, ease: 'power1.inOut' }, 0);
  tl.to(S, { cloudRotY: 0.07, duration: 8, ease: 'none' }, 0);
  cap('Canada', 3.1, 5.9);

  // ---- Stage 2: focus-pull through haze into satellite Ontario (no hard cut)
  tl.to(haze, { opacity: 0.42, duration: 0.9, ease: 'power1.inOut' }, 6.3);
  tl.to(sat, { autoAlpha: 1, duration: 1.4, ease: 'power1.inOut' }, 6.5);
  tl.to(canvas, { autoAlpha: 0, duration: 1.2, ease: 'power1.inOut' }, 6.9);
  tl.to(haze, { opacity: 0, duration: 1.6, ease: 'power2.out' }, 7.5);
  // dive settles to frame the province, then a slow living zoom
  tl.to(sat, { scale: 1.0, duration: 2.8, ease: 'power2.out' }, 6.6);
  tl.to(sat, { scale: 1.05, duration: 5.5, ease: 'sine.inOut' }, 9.6);
  cap('Ontario', 7.4, 9.8);

  // faint border traces Ontario
  tl.to(ontarioLine, { opacity: 0.72, duration: 0.8, ease: 'power1.out' }, 7.7);
  tl.to(ontarioLine, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }, 7.8);

  // ---- Stage 3: cities plant flags (Toronto leads, rest ripple out)
  var primary = pinNodes.filter(function (p) { return p.primary; });
  var rest = pinNodes.filter(function (p) { return !p.primary; });
  primary.concat(rest).forEach(function (p, idx) {
    var at = 8.7 + idx * 0.13;
    tl.fromTo(p.inner, { opacity: 0, scale: 0.4, transformOrigin: '0px 0px' },
      { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(2.2)' }, at);
    tl.fromTo(p.ring, { attr: { r: 7 }, opacity: 0.8 },
      { attr: { r: 26 }, opacity: 0, duration: 1.2, ease: 'power2.out' }, at + 0.14);
  });

  // ---- Stage 4: lift away to reveal the site
  tl.to({}, { duration: 0.7 }, 12.4);
  tl.to(ov, { opacity: 0, duration: 1.0, ease: 'power2.inOut' }, 12.7);
  tl.to(sat, { scale: 1.1, duration: 1.0, ease: 'power2.in' }, 12.7);

  // ---- test/debug hooks
  var shot = /[?&]shot=([\d.]+)/.exec(location.search);
  var freeze = /[?&]freeze=([\d.]+)/.exec(location.search);
  if (shot) {
    var st = parseFloat(shot[1]);
    var out = (/[?&]out=([\w.]+)/.exec(location.search) || [])[1] || 'shot.jpg';
    tl.pause();
    setTimeout(function () {
      tl.pause(st);
      requestAnimationFrame(function () { render(); running = false; fetch('/' + out, { method: 'POST', body: canvas.toDataURL('image/jpeg', 0.72) }); });
    }, 1000);
  }
  if (freeze) {
    var ft = parseFloat(freeze[1]);
    tl.pause();
    setTimeout(function () { tl.pause(ft); requestAnimationFrame(function () { render(); running = false; }); }, 1000);
  }
  if (FORCE) window.__intro = { tl: tl, S: S, canvas: canvas, grab: function (q) { render(); return canvas.toDataURL('image/jpeg', q || 0.7); } };

  skipBtn.addEventListener('click', function () { tl.kill(); finish(); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') { tl.kill(); finish(); } });
  }
})();
