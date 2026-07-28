/* English / Hindi / Gujarati switcher.
 *
 * Google's hosted Website Translator was tried first and does not work: element.js loads
 * and stamps html.translated-ltr, but it never calls its translation endpoint, so the copy
 * stays English. These translations are therefore built in.
 *
 * This file is loaded at the end of <body> and runs SYNCHRONOUSLY, on purpose. The
 * template's GSAP SplitText shatters every heading into per-line and per-character nodes
 * once its animations start, so translating afterwards would have to reassemble text that
 * no longer exists as whole strings. Running during parse means the copy is already in the
 * right language before anything splits it. Switching therefore reloads the page. */

(function () {
  var STORE = 'doorly-lang';

  // Keyed by the exact English string as it appears in the markup.
  var T = {
    'Most realtors only know how to say buy. I will tell you to wait when waiting is right — and negotiate like hell when it isn\'t.': {
      hi: 'ज़्यादातर रियलटर सिर्फ़ "खरीदो" कहना जानते हैं। मैं आपको तब रुकने के लिए कहूँगा जब रुकना सही हो — और जब सही न हो, तब जी-जान से मोलभाव करूँगा।',
      gu: 'મોટાભાગના રિયલ્ટર્સ ફક્ત "ખરીદો" કહેવાનું જ જાણે છે. જ્યારે રાહ જોવી યોગ્ય હોય ત્યારે હું તમને રાહ જોવાનું કહીશ — અને જ્યારે ન હોય, ત્યારે સખત મોલભાવ કરીશ.' },
    'Book a Call': { hi: 'कॉल बुक करें', gu: 'કૉલ બુક કરો' },
    'A Friend who go further for you.': {
      hi: 'एक दोस्त जो आपके लिए एक कदम आगे बढ़ता है।',
      gu: 'એક મિત્ર જે તમારા માટે એક ડગલું આગળ વધે છે.' },
    'For most families, a home is the biggest decision they will ever make, and I treat it like it is my own family deciding.': {
      hi: 'ज़्यादातर परिवारों के लिए, घर खरीदना उनके जीवन का सबसे बड़ा फ़ैसला होता है, और मैं इसे ऐसे लेता हूँ जैसे यह फ़ैसला मेरे अपने परिवार का हो।',
      gu: 'મોટાભાગના પરિવારો માટે, ઘર ખરીદવું એ તેમના જીવનનો સૌથી મોટો નિર્ણય હોય છે, અને હું તેને એ રીતે લઉં છું જાણે તે મારા પોતાના પરિવારનો નિર્ણય હોય.' },
    'When the numbers are ready, no one fights harder for your price. When they are not, I will tell you to wait, even though it earns me nothing.': {
      hi: 'जब आँकड़े सही हों, तो आपकी कीमत के लिए मुझसे ज़्यादा सख़्ती से कोई नहीं लड़ेगा। और जब वे सही न हों, तो मैं आपको रुकने के लिए कहूँगा, भले ही इससे मुझे कुछ न मिले।',
      gu: 'જ્યારે આંકડા યોગ્ય હોય, ત્યારે તમારી કિંમત માટે મારા કરતાં વધુ સખત કોઈ નહીં લડે. અને જ્યારે તે યોગ્ય ન હોય, ત્યારે હું તમને રાહ જોવાનું કહીશ, ભલે તેમાં મને કંઈ ન મળે.' },
    'That honesty is the whole reason my clients send me their family and friends.': {
      hi: 'यही ईमानदारी वह वजह है कि मेरे ग्राहक अपने परिवार और दोस्तों को मेरे पास भेजते हैं।',
      gu: 'આ પ્રામાણિકતા જ કારણ છે કે મારા ગ્રાહકો પોતાના પરિવાર અને મિત્રોને મારી પાસે મોકલે છે.' },
    'Project value': { hi: 'परियोजना मूल्य', gu: 'પ્રોજેક્ટ મૂલ્ય' },
    'Project complete': { hi: 'पूर्ण परियोजनाएँ', gu: 'પૂર્ણ પ્રોજેક્ટ' },
    'We simplify the selling process to help you achieve the best price within your ideal timeframe.': {
      hi: 'हम बिक्री की प्रक्रिया को सरल बनाते हैं ताकि आपको आपकी पसंदीदा समय-सीमा में सर्वोत्तम कीमत मिल सके।',
      gu: 'અમે વેચાણ પ્રક્રિયાને સરળ બનાવીએ છીએ જેથી તમને તમારી ઇચ્છિત સમયમર્યાદામાં શ્રેષ્ઠ કિંમત મળે.' },
    'Our perfected approach includes industry-leading marketing, clear communication, and expert guidance.': {
      hi: 'हमारे परखे हुए तरीके में उद्योग-अग्रणी मार्केटिंग, स्पष्ट संवाद और विशेषज्ञ मार्गदर्शन शामिल है।',
      gu: 'અમારી પરિપક્વ પદ્ધતિમાં ઉદ્યોગ-અગ્રણી માર્કેટિંગ, સ્પષ્ટ સંવાદ અને નિષ્ણાત માર્ગદર્શનનો સમાવેશ થાય છે.' },
    'You can rely on us for a smooth experience and results you can trust.': {
      hi: 'सहज अनुभव और भरोसेमंद परिणामों के लिए आप हम पर भरोसा कर सकते हैं।',
      gu: 'સરળ અનુભવ અને વિશ્વસનીય પરિણામો માટે તમે અમારા પર ભરોસો રાખી શકો છો.' },
    'How I Actually Help': { hi: 'मैं असल में कैसे मदद करता हूँ', gu: 'હું ખરેખર કેવી રીતે મદદ કરું છું' },
    'First Home, Start to Finish': { hi: 'पहला घर, शुरू से आख़िर तक', gu: 'પહેલું ઘર, શરૂઆતથી અંત સુધી' },
    'If you have never bought before, I walk you through every step in plain language, from what you can afford to the day you get the keys. No jargon, no rushing, no dumb questions.': {
      hi: 'अगर आपने पहले कभी घर नहीं खरीदा, तो मैं आपको हर कदम आसान भाषा में समझाता हूँ, यह जानने से कि आप कितना खर्च कर सकते हैं, उस दिन तक जब आपको चाबियाँ मिलती हैं। कोई मुश्किल शब्दजाल नहीं, कोई जल्दबाज़ी नहीं, कोई भी सवाल पूछने में झिझक नहीं।',
      gu: 'જો તમે પહેલાં ક્યારેય ઘર ખરીદ્યું ન હોય, તો હું તમને દરેક પગલું સાદી ભાષામાં સમજાવું છું, તમે કેટલું ખર્ચી શકો છો તે જાણવાથી લઈને ચાવીઓ મળવાના દિવસ સુધી. કોઈ અઘરી ભાષા નહીં, ઉતાવળ નહીં, કોઈ પણ સવાલ પૂછવામાં સંકોચ નહીં.' },
    'Newcomer Buyer Support': { hi: 'नए आप्रवासियों के लिए सहायता', gu: 'નવા સ્થળાંતરિતો માટે સહાય' },
    'New to Canada? I help you understand what is actually possible on a work permit or as a new PR, and connect you to lenders who read your situation properly instead of turning you away.': {
      hi: 'कनाडा में नए हैं? मैं आपको यह समझने में मदद करता हूँ कि वर्क परमिट पर या नए PR के रूप में असल में क्या संभव है, और आपको ऐसे ऋणदाताओं से जोड़ता हूँ जो आपकी स्थिति को ठीक से समझें, न कि आपको मना कर दें।',
      gu: 'કેનેડામાં નવા છો? હું તમને સમજવામાં મદદ કરું છું કે વર્ક પરમિટ પર અથવા નવા PR તરીકે ખરેખર શું શક્ય છે, અને તમને એવા ધિરાણકર્તાઓ સાથે જોડું છું જે તમારી પરિસ્થિતિ યોગ્ય રીતે સમજે, નકારી ન કાઢે.' },
    'Hard Negotiation': { hi: 'सख़्त मोलभाव', gu: 'સખત મોલભાવ' },
    'This is where families save real money. I pull the comparable sales, find the leverage, and negotiate like the money is my own. Many of my clients have closed well below asking.': {
      hi: 'यहीं परिवार असली पैसे बचाते हैं। मैं तुलनीय बिक्री के आंकड़े निकालता हूँ, बढ़त ढूँढता हूँ, और ऐसे मोलभाव करता हूँ जैसे पैसा मेरा अपना हो। मेरे कई ग्राहकों ने पूछी गई कीमत से काफ़ी कम में सौदा पूरा किया है।',
      gu: 'અહીં જ પરિવારો ખરેખરા પૈસા બચાવે છે. હું તુલનાત્મક વેચાણના આંકડા કાઢું છું, લાભની જગ્યા શોધું છું, અને એવો મોલભાવ કરું છું જાણે પૈસા મારા પોતાના હોય. મારા ઘણા ગ્રાહકોએ માંગેલી કિંમત કરતાં ઘણી ઓછી કિંમતે સોદો પૂર્ણ કર્યો છે.' },
    'The Honest Read': { hi: 'ईमानदार राय', gu: 'પ્રામાણિક અભિપ્રાય' },
    'A free, no-pressure call where I look at your real numbers and tell you the truth, including whether you should wait. Sometimes the smartest move is not to buy yet, and I will tell you so.': {
      hi: 'एक मुफ़्त, बिना किसी दबाव वाली कॉल जिसमें मैं आपके असली आंकड़े देखता हूँ और आपको सच बताता हूँ, यह भी कि क्या आपको रुकना चाहिए। कभी-कभी सबसे समझदारी भरा कदम अभी न खरीदना होता है, और मैं आपको यह बता दूँगा।',
      gu: 'એક મફત, દબાણ વગરની કૉલ જેમાં હું તમારા વાસ્તવિક આંકડા જોઉં છું અને તમને સાચું કહું છું, જેમાં એ પણ સામેલ છે કે તમારે રાહ જોવી જોઈએ કે નહીં. ક્યારેક સૌથી સમજદારીભર્યું પગલું હમણાં ન ખરીદવાનું હોય છે, અને હું તમને એ કહી દઈશ.' },
    '[ FOR buyers ]': { hi: '[ खरीदारों के लिए ]', gu: '[ ખરીદદારો માટે ]' },
    "Finding the right home should be an exciting and informed experience. Whether you're a first-time buyer or searching for your next investment property, we guide you through every step with clarity and confidence.": {
      hi: 'सही घर ढूँढना एक रोमांचक और जानकारीपूर्ण अनुभव होना चाहिए। चाहे आप पहली बार खरीद रहे हों या अपनी अगली निवेश संपत्ति खोज रहे हों, हम हर कदम पर स्पष्टता और आत्मविश्वास के साथ आपका मार्गदर्शन करते हैं।',
      gu: 'યોગ્ય ઘર શોધવું એ રોમાંચક અને માહિતીસભર અનુભવ હોવો જોઈએ. તમે પ્રથમ વખતના ખરીદદાર હો કે તમારી આગામી રોકાણ મિલકત શોધી રહ્યા હો, અમે દરેક પગલે સ્પષ્ટતા અને આત્મવિશ્વાસ સાથે માર્ગદર્શન આપીએ છીએ.' },
    '“We have had two great experiences working with Realty Group, as they sold two of our homes. They were professional, attentive, and patient.”': {
      hi: '“रियल्टी ग्रुप के साथ हमारे दो शानदार अनुभव रहे, उन्होंने हमारे दो घर बेचे। वे पेशेवर, चौकस और धैर्यवान थे।”',
      gu: '“રિયલ્ટી ગ્રુપ સાથે અમારા બે ઉત્તમ અનુભવ રહ્યા, તેમણે અમારાં બે ઘર વેચ્યાં. તેઓ વ્યાવસાયિક, ધ્યાનપૂર્વક અને ધીરજવાન હતા.”' },
    'CEO': { hi: 'सीईओ', gu: 'સીઈઓ' },
    'Designer': { hi: 'डिज़ाइनर', gu: 'ડિઝાઇનર' },
    'CEFO': { hi: 'सीएफओ', gu: 'સીએફઓ' },
    'Architect': { hi: 'वास्तुकार', gu: 'આર્કિટેક્ટ' },
    '[ Get started free ]': { hi: '[ नि:शुल्क शुरुआत करें ]', gu: '[ મફત શરૂઆત કરો ]' },
    'Schedule a Free Consultation': { hi: 'नि:शुल्क परामर्श बुक करें', gu: 'મફત પરામર્શ બુક કરો' },
    'We craft inspiring spaces that blend cutting-edge design with enduring functionality, turning your vision into reality.': {
      hi: 'हम प्रेरणादायक स्थान बनाते हैं जो अत्याधुनिक डिज़ाइन और टिकाऊ उपयोगिता को जोड़ते हैं, और आपकी कल्पना को हकीकत में बदलते हैं।',
      gu: 'અમે પ્રેરણાદાયી જગ્યાઓ બનાવીએ છીએ જે અત્યાધુનિક ડિઝાઇન અને ટકાઉ ઉપયોગિતાને જોડે છે, અને તમારી કલ્પનાને વાસ્તવિકતામાં ફેરવે છે.' },
    'Useful links': { hi: 'उपयोगी लिंक', gu: 'ઉપયોગી લિંક' },
    'Home': { hi: 'होम', gu: 'હોમ' },
    'About': { hi: 'हमारे बारे में', gu: 'અમારા વિશે' },
    'Social media': { hi: 'सोशल मीडिया', gu: 'સોશિયલ મીડિયા' }
  };

  function stored() {
    try {
      var v = localStorage.getItem(STORE);
      return v === 'hi' || v === 'gu' ? v : 'en';
    } catch (e) { return 'en'; }
  }

  function translate(lang) {
    if (lang === 'en') return;
    // Leaf elements only: their whole text is one string, which is what the table keys on.
    var nodes = document.body.querySelectorAll('div,p,h1,h2,h3,h4,h5,h6,a,span,li,td');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.children.length) continue;
      if (el.closest('.notranslate')) continue;
      var key = el.textContent.trim().replace(/\s+/g, ' ');
      var hit = T[key];
      if (hit && hit[lang]) el.textContent = hit[lang];
    }
    document.documentElement.lang = lang;
  }

  var current = stored();
  translate(current);

  // The switcher sits above this script in the document, so it already exists.
  var buttons = document.querySelectorAll('.lang_btn');
  for (var b = 0; b < buttons.length; b++) {
    (function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === current);
      btn.addEventListener('click', function () {
        var next = btn.getAttribute('data-lang');
        if (next === current) return;
        try { localStorage.setItem(STORE, next); } catch (e) {}
        location.reload();
      });
    })(buttons[b]);
  }
})();
