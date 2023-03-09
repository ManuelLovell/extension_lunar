import OBR from "@owlbear-rodeo/sdk";

interface IMoon{
  Phase: Phases;
  Description: string;
  Check: Number;
}

interface IMoonCollection{
  Xibar: IMoon;
  Yavash: IMoon;
  Katamba: IMoon;
}

enum Phases {
  newmoon = 1,
  waxingcrescent,
  firstquarter,
  waxinggibbous,
  fullmoon,
  waninggibbous,
  thirdquarter,
  waningcrescent,
}

let profBonus = 0;
let moons: IMoonCollection = {
  Xibar: {
    Phase: Phases.fullmoon,
    Description: "",
    Check: 0,
  },
  Yavash: {
    Phase: Phases.fullmoon,
    Description: "",
    Check: 0,
  },
  Katamba: {
    Phase: Phases.fullmoon,
    Description: "",
    Check: 0,
  }
};

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  // Secrets comments
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

export function setProfBonus(num: number){
  profBonus = num;
}

export function setupMoonPhases(date: number, document: Document) {
  const dateBuffered = date + 23; //Don't want to deal with negatives
  const xibarCycle = 4;
  const katambaCycle = 8;
  const yavashCycle = 12;

  getMoonPhase(dateBuffered, katambaCycle, moons.Katamba);
  getMoonPhase(dateBuffered, xibarCycle, moons.Xibar);
  getMoonPhase(dateBuffered, yavashCycle, moons.Yavash);

  var xibarimage = document.getElementById("xibarImage")!;
  xibarimage.src = getImage(moons.Xibar.Phase);
  var xibarText = document.getElementById("xibarPhase")!;
  xibarText.innerHTML = moons.Xibar.Description;
  var xibarDCText = document.getElementById("xibarDC")!;
  xibarDCText.innerHTML = `Spell Difficulty: DC ${moons.Xibar.Check}`;

  var yavashimage = document.getElementById("yavashImage")!;
  yavashimage.src = getImage(moons.Yavash.Phase);
  var yavashText = document.getElementById("yavashPhase")!;
  yavashText.innerHTML = moons.Yavash.Description;
  var yavashDCText = document.getElementById("yavashDC")!;
  yavashDCText.innerHTML = `Spell Difficulty: DC ${moons.Yavash.Check}`;

  var katambaimage = document.getElementById("katambaImage")!;
  katambaimage.src = getImage(moons.Katamba.Phase);
  var katambaText = document.getElementById("katambaPhase")!;
  katambaText.innerHTML = moons.Katamba.Description;
  var katambaDCText = document.getElementById("katambaDC")!;
  katambaDCText.innerHTML = `Spell Difficulty: DC ${moons.Katamba.Check}`;
}

function getImage(phase: Phases): string
{
  switch(phase) 
  { 
   case Phases.fullmoon:
      return "/full_moon.png";
   case Phases.waninggibbous:
      return "/waning_gibbous.png";
   case Phases.thirdquarter:
      return "/third_quarter.png";
   case Phases.waningcrescent:
      return "/waning_crescent.png";
   case Phases.newmoon:
      return "/new_moon.png";
   case Phases.waxingcrescent:
      return "/waxing_crescent.png";
   case Phases.firstquarter:
      return "/first_quarter.png";
   default:
      return "/full_moon.png";
  }
}
const getDecimalPart = (value: number): number => {
  return value % 1.0;
};

function getMoonPhase(date: number, cycle: number, moon:IMoon)
{
  let remain = +getDecimalPart(+(date/cycle)).toFixed(4);

  if (remain == 0)
  {
    moon.Phase = Phases.fullmoon;
    moon.Description = "Currently: Full Moon";
    moon.Check = 5;
    return;
  }
  else if (remain <= .125)
  {
    moon.Phase = Phases.waninggibbous;
    moon.Description = "Currently: Waning Gibbous";
    moon.Check = 8;
    return;
  }
  else if (remain <= .25)
  {
    moon.Phase = Phases.thirdquarter;
    moon.Description = "Currently: Third Quarter";
    moon.Check = 10;
    return;
  }
  else if (remain <= .375)
  {
    moon.Phase = Phases.waningcrescent;
    moon.Description = "Currently: Waning Crescent";
    moon.Check = 15;
    return;
  }
  else if (remain <= .5)
  {
    moon.Phase = Phases.newmoon;
    moon.Description = "Currently: New Moon";
    moon.Check = 20;
    return;
  }
  else if (remain <= .625)
  {
    moon.Phase = Phases.waxingcrescent;
    moon.Description = "Currently: Waxing Crescent";
    moon.Check = 15;
    return;
  }
  else if (remain <= .75)
  {
    moon.Phase = Phases.firstquarter;
    moon.Description = "Currently: First Quarter";
    moon.Check = 10;
    return;
  }
  else
  {
    moon.Phase = Phases.waxinggibbous;
    moon.Description = "Currently: Waxing Gibbous";
    moon.Check = 8;
    return;
  }
}

export function setupXibarRoller(element: HTMLButtonElement, result: HTMLElement) {
  const setCounter = () => {
    let roll = randomIntFromInterval(1, 20);
    OBR.notification.show(`You rolled a ${ roll + profBonus}.`);
    let rollResults = `Rolled a ${roll}.</br>
    Bonus of ${profBonus}.</br>`;
    let dcResults = "";
    if (moons.Xibar.Check > 1)
    {
      if ((roll+profBonus) >= moons.Xibar.Check)
      {
        dcResults = `<span style='color: green;'>Which <b>PASSES</b> Xibar's DC of ${moons.Xibar.Check}</span>.`;
      }
      else
      {
        dcResults = `<span style='color: red;'>Which <b>FAILS</b> Xibar's DC of ${moons.Xibar.Check}</span>.`;
      }
    }
    result.innerHTML = rollResults + dcResults;
  };
  element.addEventListener("click", () => setCounter());
}

export function setupYavashRoller(element: HTMLButtonElement, result: HTMLElement) {
  const setCounter = () => {
    let roll = randomIntFromInterval(1, 20);
    OBR.notification.show(`You rolled a ${ roll + profBonus}.`);
    let rollResults = `Rolled a ${roll}.</br>
    Bonus of ${profBonus}.</br>`;
    let dcResults = "";
    if (moons.Yavash.Check > 1)
    {
      if ((roll+profBonus) >= moons.Yavash.Check)
      {
        dcResults = `<span style='color: green;'>Which <b>PASSES</b> Yavash's DC of ${moons.Yavash.Check}</span>.`;
      }
      else
      {
        dcResults = `<span style='color: red;'>Which <b>FAILS</b> Yavash's DC of ${moons.Yavash.Check}</span>.`;
      }
    }
    result.innerHTML = rollResults + dcResults;
  };
  element.addEventListener("click", () => setCounter());
}

export function setupKatambaRoller(element: HTMLButtonElement, result: HTMLElement) {
  const setCounter = () => {
    let roll = randomIntFromInterval(1, 20);
    OBR.notification.show(`You rolled a ${ roll + profBonus}.`);
    let rollResults = `Rolled a ${roll}.</br>
    Bonus of ${profBonus}.</br>`;
    let dcResults = "";
    if (moons.Xibar.Check > 1)
    {
      if ((roll+profBonus) >= moons.Katamba.Check)
      {
        dcResults = `<span style='color: green;'>Which <b>PASSES</b> Katamba's DC of ${moons.Katamba.Check}</span>.`;
      }
      else
      {
        dcResults = `<span style='color: red;'>Which <b>FAILS</b> Katamba's DC of ${moons.Katamba.Check}</span>.`;
      }
    }
    result.innerHTML = rollResults + dcResults;
  };
  element.addEventListener("click", () => setCounter());
}

function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

