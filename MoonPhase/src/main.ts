import './style.css'
import { setProfBonus, setupMoonPhases, setupKatambaRoller, setupXibarRoller, setupYavashRoller } from './counter'

let currentDate = 1;
let profBonus = 0;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div style="background-image: url('/starbg.png');">>
    <h1>Elanthia Moon Tracker</h1>
    <div id="XibarSect" class="moon row">
      <div class="column flexed">
        <button id="xibarRoller" type="button">
          <img src="/full_moon.png" id="xibarImage" class="moonImage xibar" alt="Full Moon" />
        </button>
      </div>
      <div class="column">
        <div id="xibarPhase">Currently (Pending)</div>
        <div id="xibarDC">DC: (Pending)</div>
      </div>
    </div>

    <div id="YavashSect" class="moon row">
      <div class="column flexed">
        <button id="yavashRoller" type="button">
          <img src="/full_moon.png" id="yavashImage" class="moonImage yavash" alt="Full Moon" />
        </button>
      </div>
      <div class="column">
        <div id="yavashPhase">Currently (Pending)</div>
        <div id="yavashDC">DC: (Pending)</div>
      </div>
    </div>    
    
    <div id="KatambaSect" class="moon row">
      <div class="column flexed">
        <button id="katambaRoller" type="button">
          <img src="/full_moon.png"  id="katambaImage" class="moonImage katamba" alt="Full Moon" />
        </button>
      </div>
      <div class="column">
        <div id="katambaPhase">Currently (Pending)</div>
        <div id="katambaDC">DC: (Pending)</div>
      </div>
    </div>

    <div class="row">
      <div class="column card flexed">
          <div class="inputLabel">Current Date</div>
          <input type="number" id="currentdate" min="1" max="365">
          <div class="inputLabel">Prof-Bonus</div>
          <input type="number" id="profbonus" min="1" max="10">
      </div>
      <div class="column fat">
        <div id="rollResult" class="results"></div>
      </div>
    </div>


  </div>
`
let dateElement = <HTMLInputElement>document.getElementById('currentdate')!;
dateElement.addEventListener('input', function() {
  currentDate = parseFloat(dateElement.value)
  setupMoonPhases(currentDate, document);
});

let profElement = <HTMLInputElement>document.getElementById('profbonus')!;
profElement.addEventListener('input', function() {
  profBonus = parseFloat(profElement.value);
  setProfBonus(profBonus);
});

let resultCard = document.getElementById('rollResult')!;
setupXibarRoller(document.querySelector<HTMLButtonElement>('#xibarRoller')!, resultCard)
setupYavashRoller(document.querySelector<HTMLButtonElement>('#yavashRoller')!, resultCard)
setupKatambaRoller(document.querySelector<HTMLButtonElement>('#katambaRoller')!, resultCard)