const wheel = document.getElementById("wheel");
const result = document.getElementById("result");
let rotation = 0;
let spinning = false;

const prizes = ["0.05 SOL","0.1 SOL","0.2 SOL","0.5 SOL","1 SOL","2 SOL","3 SOL","5 SOL","10 SOL","20 SOL","50 SOL","100 SOL"];

function spin(){
  if(spinning) return;
  spinning = true;
  result.textContent = "पहिया घूम रहा है…";
  const index = Math.floor(Math.random() * prizes.length);
  const segmentAngle = 360 / prizes.length;
  const target = 360 - (index * segmentAngle + segmentAngle/2);
  const current = rotation % 360;
  rotation += 360 * 6 + ((target - current + 360) % 360);
  wheel.style.transform = `rotate(${rotation}deg)`;
  setTimeout(() => {
    result.textContent = `🎉 बधाई! आपने ${prizes[index]} जीता।`;
    spinning = false;
  }, 4700);
}

function scrollToWheel(){
  document.getElementById("wheelArea").scrollIntoView({behavior:"smooth", block:"center"});
  setTimeout(spin, 500);
}
