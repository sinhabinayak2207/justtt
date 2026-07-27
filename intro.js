/* RAKESH — cinematic Earth -> Canada -> Ontario intro.
 *
 * A photoreal three.js globe (day/normal/specular + cloud layer) with a glowing sun and a
 * lit moon in the star field behind it. The camera pushes in on one smooth move and rotates
 * to frame North America; at peak zoom a white-out flash masks a cut to a 2D Ontario map,
 * whose border draws in and whose major cities plant flag markers. Then the overlay lifts to
 * reveal the homepage.
 *
 * Plays once per browser session (survives the language-switch reloads, which share the
 * session). Honors prefers-reduced-motion and skips cleanly with no WebGL. ?intro=1 replays.
 *
 * Texture URLs come from window.INTRO_TEX when present (the standalone inlines them as data
 * URIs); otherwise they load from assets/. Geometry is embedded below. */
(function () {
  'use strict';
  var GEO = {"viewBox":"0 0 1000 1115","ontario":"M719.4 457.9 719.8 490.1 713.8 485.3 710.7 476.5 713.7 468.9 713.0 461.9 719.4 457.9ZM719.8 491.7 720.9 711.5 718.1 719.2 723.9 730.3 723.7 739.9 735.9 758.3 744.6 776.8 755.0 787.5 803.5 798.9 813.4 806.5 818.3 815.6 826.9 820.8 830.3 819.9 830.8 814.8 835.2 816.3 841.1 832.9 855.0 841.0 861.4 837.1 866.0 837.5 875.7 846.1 892.3 837.0 916.7 829.8 926.4 830.2 937.0 834.5 933.5 849.4 940.0 856.3 932.3 864.1 897.6 879.7 870.2 905.0 848.0 914.2 840.1 914.9 827.6 923.4 824.0 922.2 831.8 917.2 825.0 920.0 826.5 915.2 803.4 920.5 802.7 923.0 813.7 918.7 813.6 922.3 823.7 917.1 821.6 925.6 833.5 920.7 825.2 930.7 833.4 930.9 821.3 936.1 817.1 934.7 819.8 930.3 815.3 932.9 813.1 930.3 816.2 929.4 806.5 931.0 802.4 927.5 804.2 926.5 797.3 925.2 795.8 926.2 798.3 927.6 793.0 926.6 738.6 937.8 727.2 948.5 722.7 948.3 717.6 953.1 709.7 967.3 712.8 971.7 727.9 975.0 739.4 970.4 739.2 981.1 745.7 991.1 738.3 995.1 723.3 992.9 691.6 998.0 681.2 1008.2 695.4 1012.3 678.2 1010.4 661.2 1005.1 643.9 1005.9 624.8 1020.5 621.8 1028.6 620.2 1028.5 621.8 1024.9 619.1 1028.3 612.7 1028.8 599.3 1036.1 595.5 1041.3 594.4 1048.1 589.2 1041.2 578.1 1044.2 568.3 1039.2 572.2 1025.3 594.9 1025.3 597.7 1023.0 598.0 1014.7 590.6 1014.1 588.8 1011.9 593.8 1007.0 595.8 991.7 598.0 987.4 608.3 981.7 626.5 965.8 628.5 957.6 626.5 922.7 632.0 914.7 633.5 907.2 640.9 901.8 646.7 891.2 643.2 870.0 639.7 869.4 633.0 859.3 633.6 856.8 627.6 855.5 628.6 852.5 646.0 853.5 644.2 859.0 646.8 862.2 647.3 868.3 653.3 870.8 651.6 873.7 660.2 870.6 652.4 882.8 658.1 879.8 662.5 880.8 660.4 892.5 666.2 886.1 672.8 884.7 675.5 891.5 696.4 900.0 700.3 894.8 700.8 887.3 695.4 883.1 695.8 879.1 702.5 876.4 705.4 882.2 714.6 883.2 712.0 881.1 713.6 875.6 711.3 876.4 711.3 880.1 709.4 879.3 707.5 872.2 703.9 871.7 703.0 867.6 696.0 861.0 700.7 859.5 694.8 854.2 698.6 849.6 697.7 845.4 694.8 843.7 692.1 845.9 693.3 848.0 690.4 847.9 686.0 842.3 685.4 845.4 683.3 831.9 679.1 834.2 668.6 812.9 656.2 810.8 651.4 812.6 650.9 807.0 647.4 810.7 637.0 809.6 637.0 806.9 629.7 811.4 633.6 808.3 630.7 807.2 636.7 805.6 628.2 807.0 635.0 804.5 631.7 800.6 626.6 804.0 625.8 807.3 625.2 804.3 627.8 801.8 610.0 801.0 600.1 798.0 602.1 796.5 587.3 798.1 589.1 794.8 574.0 797.6 536.9 790.1 536.2 787.7 529.1 788.2 526.2 785.2 528.1 777.3 523.9 774.3 509.4 778.7 506.3 773.5 513.4 765.5 511.6 761.7 508.1 765.3 508.3 757.6 514.6 757.1 516.4 754.0 512.4 750.5 506.9 750.2 505.7 752.8 498.4 747.9 506.8 728.8 504.9 724.3 487.8 708.6 490.4 704.3 489.4 702.0 493.5 697.4 491.9 693.3 495.6 687.4 465.4 688.9 452.7 685.1 441.2 668.9 435.6 647.1 428.4 634.7 423.4 637.6 417.0 632.6 410.6 636.4 405.7 632.7 404.4 634.9 392.3 635.4 385.8 630.5 381.4 631.1 380.2 627.8 377.0 629.2 364.1 623.6 360.8 619.0 354.5 622.6 351.2 620.9 351.5 628.6 357.8 634.1 357.9 638.9 353.6 645.7 351.6 646.4 352.6 643.7 350.3 645.8 348.2 642.4 349.1 647.3 345.7 649.9 344.1 647.8 341.9 654.3 338.6 656.9 338.7 649.5 347.5 641.1 349.0 635.8 347.0 631.0 342.0 629.8 339.1 635.5 340.7 638.6 339.4 643.2 335.9 644.5 335.5 651.0 333.0 652.0 331.0 660.8 322.6 664.3 330.2 647.3 314.1 653.5 309.7 659.6 311.6 663.6 305.7 676.9 297.6 684.1 288.4 682.5 282.0 684.7 276.6 678.7 271.6 677.1 254.2 678.3 253.8 676.5 246.4 678.6 241.2 668.1 225.4 679.0 211.4 681.4 211.5 677.6 205.8 676.9 205.4 671.7 194.1 668.3 191.8 661.7 181.6 661.9 181.6 668.7 177.6 670.2 172.2 656.3 163.4 655.0 163.7 652.8 166.8 652.3 166.2 649.9 162.5 649.9 153.3 644.3 138.2 643.7 131.7 646.5 129.3 650.3 118.0 651.7 115.4 644.5 99.0 642.8 96.4 639.2 84.7 638.8 79.4 634.7 80.0 628.3 73.6 599.1 60.1 596.4 60.2 363.8 123.5 300.6 242.1 158.3 307.1 85.5 312.4 66.9 318.4 69.4 325.1 67.7 334.6 80.2 347.3 91.2 363.3 100.1 379.8 127.5 378.5 133.1 381.3 129.5 389.6 133.8 389.2 137.3 405.4 138.5 406.2 140.4 426.6 147.7 435.0 153.7 449.1 156.0 464.6 166.1 472.4 177.6 483.6 182.3 483.8 185.5 479.9 187.7 472.2 200.5 471.1 208.6 480.8 189.9 488.9 186.0 505.9 190.0 517.6 186.5 527.3 187.8 534.6 184.3 542.6 188.7 542.4 192.0 544.5 189.9 548.1 191.3 549.7 198.2 548.8 191.0 544.0 187.0 565.9 193.3 575.0 190.6 577.9 195.2 575.7 200.0 578.4 196.6 588.3 195.4 592.3 197.6 593.1 195.8 602.2 203.2 601.4 195.7 605.4 200.3 604.3 212.9 607.5 219.3 597.1 254.5 597.4 265.6 599.6 272.1 602.1 271.7 605.4 275.8 610.2 295.1 606.6 309.0 610.9 332.4 605.2 336.8 603.0 354.4 611.4 360.1 619.1 373.9 634.4 389.6 634.6 396.8 637.8 400.3 634.3 399.3 623.2 403.6 620.7 408.2 625.9 404.6 636.8 405.0 643.1 414.1 658.5 420.5 662.2 428.3 665.8 429.3 674.9 440.7 678.5 453.5 681.8 457.6 682.3 464.4 672.7 470.2 668.5 477.0 657.4 487.1 660.8 485.6 660.4 488.5 663.8 481.2 670.9 478.5 683.7 466.1 700.4 471.8 711.2 480.6 719.8 491.7ZM578.6 810.0 581.5 808.6 580.2 813.0 583.7 817.6 590.7 817.2 593.0 821.1 594.2 817.3 590.9 814.0 603.1 808.6 608.7 818.0 613.7 810.3 618.8 809.4 619.6 814.7 623.3 815.4 622.2 821.1 624.2 824.4 629.1 813.9 630.3 816.5 628.1 820.3 633.2 820.2 627.6 832.0 621.5 837.1 616.0 834.8 620.0 833.7 625.8 826.2 613.0 834.8 586.6 820.7 564.5 815.8 565.6 810.3 569.6 813.0 571.2 810.5 574.2 812.3 578.6 810.0Z","neighbors":"M746.7 109.1 733.6 144.2 743.2 103.7 730.5 143.5 736.1 115.6 721.7 143.9 709.3 149.2 720.8 123.1 699.2 140.7 723.2 91.2 716.7 123.3 724.4 117.9 731.1 85.7 746.7 109.1ZM1397.6 565.8 1465.9 598.1 1473.3 614.6 1414.6 605.7 1354.5 564.3 1397.6 565.8ZM1667.5 461.1 1603.1 470.4 1586.8 505.8 1583.3 497.0 1539.5 541.9 1273.0 537.6 1233.1 599.6 1190.0 616.9 1188.5 608.1 1136.1 675.5 1077.5 656.3 1134.1 677.3 1067.8 762.7 1099.8 746.6 1172.4 661.1 1264.7 612.6 1336.4 606.6 1369.5 636.1 1352.6 628.1 1368.2 651.1 1322.5 683.4 1296.2 670.3 1234.1 694.2 1191.5 688.9 1191.1 711.9 1163.3 728.3 1155.2 718.5 1123.3 765.8 1095.9 844.9 1061.6 854.3 1059.1 867.6 922.6 868.8 940.0 856.3 937.0 834.5 855.0 841.0 803.5 798.9 755.0 787.5 718.1 719.2 719.8 491.7 728.5 505.1 719.2 451.6 732.4 446.0 749.0 478.0 755.6 456.3 741.1 436.4 767.6 404.7 743.2 350.0 736.1 301.8 746.6 293.9 730.4 274.7 740.4 267.4 726.4 266.7 710.3 233.0 794.9 186.6 841.4 128.7 847.3 102.5 835.2 4.4 808.2 -36.9 760.7 -71.3 760.6 -99.6 770.4 -95.6 798.0 -135.2 788.4 -137.0 794.3 -161.6 813.7 -149.5 808.9 -178.8 837.2 -199.5 800.3 -191.5 809.8 -197.0 795.7 -222.0 809.5 -232.4 791.7 -240.6 805.4 -257.6 776.7 -253.5 797.6 -289.5 793.5 -311.6 806.9 -319.4 784.5 -336.4 783.7 -396.0 809.3 -413.9 884.2 -386.7 873.7 -374.7 897.9 -388.5 930.2 -369.8 923.1 -382.5 967.3 -403.9 1011.7 -370.8 1004.7 -345.5 1029.5 -348.1 1038.6 -331.4 1025.4 -321.7 1040.0 -334.1 1056.3 -325.1 1043.0 -309.6 1055.7 -307.5 1045.7 -304.5 1056.0 -285.4 1116.5 -279.2 1125.8 -255.1 1143.2 -277.9 1149.4 -255.4 1130.1 -230.8 1138.6 -191.7 1079.2 -191.2 1141.2 -174.9 1132.9 -129.1 1155.0 -122.5 1142.1 -116.4 1141.8 -87.0 1128.2 -107.1 1131.3 -88.7 1112.1 -83.9 1126.1 -84.3 1130.6 -69.2 1159.5 -94.7 1192.2 -84.3 1192.7 -32.1 1149.4 -3.2 1190.1 -25.1 1207.1 -68.2 1213.3 -47.1 1201.8 -27.8 1218.5 -59.0 1219.5 -15.8 1229.1 -43.8 1265.6 -61.0 1276.9 -89.9 1294.4 -70.5 1288.9 -47.5 1296.7 -103.6 1320.5 -106.1 1303.7 -114.9 1309.8 -133.9 1318.9 -125.6 1311.0 -143.2 1334.7 -133.8 1311.0 -163.8 1334.6 -166.0 1324.1 -176.4 1335.8 -207.7 1353.6 -211.7 1340.1 -208.2 1350.9 -195.4 1337.9 -190.1 1348.6 -180.1 1341.3 -146.7 1361.8 -143.8 1353.6 -119.0 1363.9 -104.1 1345.8 -108.5 1339.1 -96.8 1398.1 -82.2 1374.0 -76.3 1383.8 -59.7 1357.9 -28.8 1373.8 -3.6 1393.3 -0.8 1370.7 79.1 1381.6 99.9 1370.4 110.3 1375.3 127.5 1399.6 131.6 1388.2 143.9 1414.4 182.0 1396.5 194.3 1390.2 236.3 1304.8 228.9 1258.8 182.8 1262.2 226.8 1231.4 202.7 1247.9 235.6 1224.0 239.7 1229.0 263.8 1216.4 276.1 1228.7 309.0 1253.3 327.7 1245.5 370.6 1257.3 375.2 1277.1 353.5 1273.2 407.3 1280.1 399.6 1300.1 418.1 1329.4 409.3 1351.6 451.3 1371.3 410.7 1368.9 362.1 1389.2 343.7 1402.5 376.1 1372.7 388.6 1386.7 421.1 1667.7 421.1 1667.5 461.1ZM-229.3 -186.0 74.9 -186.0 80.9 -131.6 66.7 -107.2 91.0 -79.6 100.2 -86.7 93.4 -39.4 101.3 -84.1 144.6 -81.3 175.6 30.5 156.2 63.9 235.4 36.4 312.4 66.9 60.2 363.8 59.9 620.4 -202.5 620.4 -229.3 146.1 -229.3 -186.0Z","pins":[{"n":"Toronto","x":726.3,"y":947.9,"p":1},{"n":"Ottawa","x":882.0,"y":843.1,"p":0},{"n":"Hamilton","x":705.7,"y":971.1,"p":0},{"n":"London","x":647.6,"y":986.7,"p":0},{"n":"Windsor","x":572.0,"y":1025.2,"p":0},{"n":"Sudbury","x":658.3,"y":778.1,"p":0},{"n":"Thunder Bay","x":309.5,"y":660.1,"p":0},{"n":"Kingston","x":848.7,"y":914.0,"p":0}]};
  var TEX = window.INTRO_TEX || {
    day: 'assets/earth_day.jpg', clouds: 'assets/earth_clouds.png',
    normal: 'assets/earth_normal.jpg', spec: 'assets/earth_spec.jpg', moon: 'assets/moon.jpg'
  };
  var FORCE = /[?&]intro=1/.test(location.search);
  var SEEN = 'rakesh-intro-seen';
  var CITIES = { Toronto: 1, Ottawa: 1, London: 1, Sudbury: 1 };  // the 4 shown

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  try { if (!FORCE && sessionStorage.getItem(SEEN)) return; } catch (e) {}
  if (typeof gsap === 'undefined') return;

  // Load three.js on demand only when the intro will run.
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
    '<div class="intro__flash"></div>' +
    '<div class="intro__vignette"></div>' +
    '<svg class="intro__map" viewBox="' + GEO.viewBox + '" preserveAspectRatio="xMidYMid meet">' +
      '<path class="intro__neighbors" d="' + GEO.neighbors + '"/>' +
      '<path class="intro__ontario" d="' + GEO.ontario + '"/>' +
      '<g class="intro__pins"></g>' +
    '</svg>' +
    '<div class="intro__caption"><span class="intro__cap-item">' +
      '<span class="cap-line"></span><span class="cap-text" id="intro-cap"></span><span class="cap-line"></span>' +
    '</span></div>' +
    '<button class="intro__skip" type="button">Skip intro &rarr;</button>';
  document.body.insertBefore(ov, document.body.firstChild);
  root.classList.add('intro-lock');

  var canvas = ov.querySelector('.intro__canvas');
  var flash = ov.querySelector('.intro__flash');
  var mapEl = ov.querySelector('.intro__map');
  var ontarioPath = ov.querySelector('.intro__ontario');
  var neighborsPath = ov.querySelector('.intro__neighbors');
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

  // background sun — a warm additive glow sprite
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

  // background moon — a real lit sphere
  var moon = new THREE.Mesh(new THREE.SphereGeometry(0.85, 48, 48),
    new THREE.MeshPhongMaterial({ map: loader.load(TEX.moon), shininess: 2 }));
  moon.position.set(-13, -4.5, -18); scene.add(moon);

  // starfield
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

  // start rotated most of the way around so the approach shows the globe clearly turning
  var S = { camZ: 7.9, rotY: -6 * DEG - 3.0, rotX: 6 * DEG, cloudRotY: 0, stars: 0 };
  var running = true;
  var clock = (window.performance && performance.now) ? performance.now.bind(performance) : Date.now;
  var t0 = clock();
  function render() {
    var t = (clock() - t0) / 1000;
    earth.rotation.set(S.rotX, S.rotY, 0);
    clouds.rotation.set(S.rotX, S.rotY + S.cloudRotY, 0);
    camera.position.z = S.camZ;
    // moon drifts on a slow arc (orbit-like) and spins on its own axis
    moon.position.set(-13 + Math.cos(t * 0.16) * 1.7, -4.5 + Math.sin(t * 0.16) * 1.1, -18);
    moon.rotation.y += 0.0011;
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
  GEO.pins.filter(function (p) { return CITIES[p.n]; }).forEach(function (p) {
    var primary = p.n === 'Toronto';
    var pole = primary ? 46 : 38, fs = primary ? 17 : 14;
    var g = ns('g'); g.setAttribute('transform', 'translate(' + p.x + ' ' + p.y + ')');
    var ring = ns('circle'); ring.setAttribute('class', 'pin-ring'); ring.setAttribute('r', 6);
    var inner = ns('g'); inner.setAttribute('class', 'pin-inner');
    var stem = ns('line'); stem.setAttribute('class', 'pin-pole');
    stem.setAttribute('x1', 0); stem.setAttribute('y1', 0); stem.setAttribute('x2', 0); stem.setAttribute('y2', -pole);
    var rect = ns('rect'); rect.setAttribute('class', 'pin-banner' + (primary ? ' is-primary' : ''));
    var text = ns('text');
    text.setAttribute('class', 'pin-flag-label' + (primary ? ' is-primary' : ''));
    text.setAttribute('text-anchor', 'middle'); text.setAttribute('font-size', fs);
    text.textContent = p.n;
    var dot = ns('circle'); dot.setAttribute('class', 'pin-dot' + (primary ? ' is-primary' : '')); dot.setAttribute('r', primary ? 6 : 5);
    inner.appendChild(stem); inner.appendChild(rect); inner.appendChild(text); inner.appendChild(dot);
    g.appendChild(ring); g.appendChild(inner); pinsG.appendChild(g);
    // size the banner to the label (measured now that it is in the DOM)
    var tw = 60; try { tw = text.getComputedTextLength(); } catch (e) {}
    var bw = tw + 26, bh = fs + 13, top = -pole - bh;
    rect.setAttribute('x', -bw / 2); rect.setAttribute('y', top); rect.setAttribute('width', bw); rect.setAttribute('height', bh); rect.setAttribute('rx', 5);
    text.setAttribute('x', 0); text.setAttribute('y', top + bh / 2 + fs * 0.35);
    pinNodes.push({ inner: inner, ring: ring, primary: primary });
  });

  // --------------------------------------------------------------- captions
  function cap(text, at, out) {
    tl.call(function () { capText.textContent = text; }, null, at);
    tl.fromTo(capItem, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, at);
    tl.to(capItem, { opacity: 0, y: -12, duration: 0.55, ease: 'power2.in' }, out);
  }

  // ------------------------------------------------------------- timeline
  var ontarioLen = ontarioPath.getTotalLength();
  gsap.set(ontarioPath, { strokeDasharray: ontarioLen, strokeDashoffset: ontarioLen });
  gsap.set(mapEl, { autoAlpha: 0 });

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
  var watchdog = setTimeout(finish, 13500);

  var tl = gsap.timeline({ onComplete: finish });

  // one continuous, gently-eased push-in from orbit to peak zoom (smooth)
  tl.to(S, { stars: 1, duration: 1.5, ease: 'power1.out' }, 0);
  tl.to(S, { camZ: 1.55, duration: 6.6, ease: 'power2.inOut' }, 0);
  tl.to(S, { rotY: -6 * DEG, rotX: 30 * DEG, duration: 6.6, ease: 'power1.inOut' }, 0);
  tl.to(S, { cloudRotY: 0.06, duration: 7, ease: 'none' }, 0);
  cap('Canada', 2.5, 5.3);

  // white-out cut to the map
  tl.to(flash, { opacity: 1, duration: 0.85, ease: 'power2.in' }, 5.85);
  tl.set(canvas, { autoAlpha: 0 }, 6.55);
  tl.set(mapEl, { autoAlpha: 1 }, 6.45);
  tl.to(flash, { opacity: 0, duration: 1.0, ease: 'power2.out' }, 6.6);
  cap('Ontario', 6.5, 8.6);

  // border draws, context fades
  tl.fromTo(mapEl, { scale: 1.08, transformOrigin: '50% 44%' }, { scale: 1, duration: 1.9, ease: 'power2.out' }, 6.55);
  tl.to(neighborsPath, { opacity: 1, duration: 1.2, ease: 'power1.out' }, 6.7);
  tl.to(ontarioPath, { strokeDashoffset: 0, duration: 1.9, ease: 'power2.inOut' }, 6.75);

  // flags plant (Toronto leads)
  var primary = pinNodes.filter(function (p) { return p.primary; });
  var rest = pinNodes.filter(function (p) { return !p.primary; });
  primary.concat(rest).forEach(function (p, idx) {
    var at = 8.4 + idx * 0.2;
    tl.fromTo(p.inner, { opacity: 0, y: -22, scale: 0.55, transformOrigin: '50% 100%' },
      { opacity: 1, y: 0, scale: 1, duration: 0.66, ease: 'back.out(2)' }, at);
    tl.fromTo(p.ring, { attr: { r: 6 }, opacity: 0.85 },
      { attr: { r: 24 }, opacity: 0, duration: 1.15, ease: 'power2.out' }, at + 0.16);
  });

  // lift away to reveal the site
  tl.to({}, { duration: 0.7 }, 9.9);
  tl.to(ov, { opacity: 0, duration: 0.95, ease: 'power2.inOut' }, 10.5);
  tl.to(mapEl, { scale: 1.05, duration: 0.95, ease: 'power2.in' }, 10.5);

  // self-driving frame capture for testing (?shot=<s> uploads the globe; ?freeze=<s> pauses)
  var shot = /[?&]shot=([\d.]+)/.exec(location.search);
  var freeze = /[?&]freeze=([\d.]+)/.exec(location.search);
  if (shot) {
    var st = parseFloat(shot[1]);
    var out = (/[?&]out=([\w.]+)/.exec(location.search) || [])[1] || 'shot.jpg';
    tl.pause();
    setTimeout(function () {
      tl.pause(st);
      requestAnimationFrame(function () { render(); running = false; fetch('/' + out, { method: 'POST', body: canvas.toDataURL('image/jpeg', 0.72) }); });
    }, 900);
  }
  if (freeze) {
    var ft = parseFloat(freeze[1]);
    tl.pause();
    setTimeout(function () { tl.pause(ft); requestAnimationFrame(function () { render(); running = false; }); }, 900);
  }
  if (FORCE) window.__intro = { tl: tl, S: S, canvas: canvas, grab: function (q) { render(); return canvas.toDataURL('image/jpeg', q || 0.7); } };

  skipBtn.addEventListener('click', function () { tl.kill(); finish(); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') { tl.kill(); finish(); } });
  }
})();
