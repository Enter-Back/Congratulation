const intro     = document.getElementById('intro');
const hint      = document.getElementById('hint');
const line      = document.getElementById('line');       
const finalText = document.getElementById('finalText');
const mainCong  = document.querySelector('.mainCong');

const lineTexts = [
  "Со дня нашего знакомства прошло целых 7 дней рождений каждого из нас",
  "и это прям впечатляет...",
  "... и согревает...",
  "Ну ладно, мы сюда не грустить пришли, поэтому...",
  "С ДНЁМ РОЖДЕНИЯ, ЛЮБИМАЯ МОЯЯЯ!",
  "Оставайся такой же милой, очаровательной, смелой, иногда непредсказуемой.",
  "Красивой, женственной, бурной, загадочной, привлекающией",
  "и просто самой лучшей девушкой на свете.",
  "Пускай тебя будет преледовать удача, а счастье будет всегда рядом, где бы ты не находилась.",
  "Желаю, что бы каждый твой день был наполнен чем то хорошим, приятным и тем, что ты искренне любишь.",
  "Будь такой же страстной и одновременно скромной, сердитой и злой, доброй и нежной..",
  "будь и дальше моей любимой и родной...",
];

const finalScene = document.getElementById('finalScene');
const fTyped     = document.getElementById('fTyped');
const f1 = document.getElementById('f1');
const f2 = document.getElementById('f2');
const f3 = document.getElementById('f3');
const f4 = document.getElementById('f4');

const typedLine = "Сегодня ожидается:";
const smallLines = [
  "📸 много-много фоточек",
  "🌶️ вкусненький ужин",
  "💞 милый совместный вечер",
];
const tinyLine = "Люблю тебя и до встречи)";

function randomDelay(ch) {
  let d = 20 + Math.random() * 30;
  if (',.!?—'.includes(ch)) d += 150;
  return d;
}

function typeInto(el, text) {
  return new Promise(resolve => {
    let i = 0;
    function step() {
      if (i >= text.length) return resolve();
      const ch = text[i++];
      el.textContent += ch;
      setTimeout(step, randomDelay(ch));
    }
    step();
  });
}

function showHint() { hint.classList.add('visible'); }
function hideHint() { hint.classList.remove('visible'); }

function waitForKey() {
  return new Promise(resolve => {
    window.addEventListener('keydown', function handler() {
      window.removeEventListener('keydown', handler);
      resolve();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => intro.classList.add('visible'), 100);
  setTimeout(showHint, 3100);
});

let started = false;
window.addEventListener('keydown', async () => {
  if (started) return;
  started = true;

  hideHint();
  intro.classList.remove('visible');
  intro.classList.add('leaving');

  await new Promise(r => setTimeout(r, 1500));
  document.querySelector('.center').style.display = 'none';

  for (let i = 0; i < lineTexts.length; i++) {
    line.textContent = '';
    line.classList.remove('visible');

    await new Promise(r => setTimeout(r, 300));

    line.classList.add('visible');

    await typeInto(line, lineTexts[i]);

    const hintTimer = setTimeout(showHint, 5000);

    await waitForKey();
    hideHint();
    clearTimeout(hintTimer);

    line.classList.remove('visible');
  }

  mainCong.style.transition = 'opacity 1s ease';
  mainCong.style.opacity = '0';
  await new Promise(r => setTimeout(r, 1000));
  mainCong.style.display = 'none';

  setTimeout(() => finalText.classList.add('visible'), 100);

  await new Promise(r => setTimeout(r, 2600));
  const finalHintTimer = setTimeout(showHint, 5000);
  await waitForKey();
  hideHint();
  clearTimeout(finalHintTimer);

  finalText.classList.remove('visible');
  await new Promise(r => setTimeout(r, 1500));

  finalScene.classList.add('visible');
  await new Promise(r => setTimeout(r, 300));

  await typeInto(fTyped, typedLine);
  await new Promise(r => setTimeout(r, 500));

  f1.textContent = smallLines[0];
  f2.textContent = smallLines[1];
  f3.textContent = smallLines[2];

  f1.classList.add('visible');
  await new Promise(r => setTimeout(r, 300));
  f2.classList.add('visible');
  await new Promise(r => setTimeout(r, 300));
  f3.classList.add('visible');

  await new Promise(r => setTimeout(r, 600));
  f4.textContent = tinyLine;
  f4.classList.add('visible');

});