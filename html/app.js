// Assuming you have a function to get the player's health (e.g., getPlayerHealth())

function updatePlayerData(data) {
    const healthBar = document.querySelector('#health');
    const oxygenBar = document.querySelector('#oxygen');
    // ... other elements
  
    // Update health bar
    updateBar(data.health, 100, healthBar);
  
    // Update oxygen bar (assuming max oxygen is 100)
    updateBar(data.oxygen, 100, oxygenBar);
  
    // Update armed status
    const armedStatusElement = document.getElementById('armed-status');
    armedStatusElement.style.display = data.isArmed ? 'flex' : 'none';
  
    // Update parachute status
    const parachuteStatusElement = document.getElementById('parachute-status');
    parachuteStatusElement.style.display = data.isParachuting ? 'flex' : 'none';
  
    // Update money display
    const cashElement = document.getElementById('cash').querySelector('.money-amount');
    const bankElement = document.getElementById('bank').querySelector('.money-amount');
    cashElement.textContent = '$' + data.money.cash.toLocaleString();
    bankElement.textContent = '$' + data.money.bank.toLocaleString();
  
    // Update weapon info
    const weaponNameElement = document.getElementById('weapon-name');
    const ammoCountElement = document.getElementById('ammo-count');
    weaponNameElement.textContent = data.weapon.name;
    ammoCountElement.textContent = data.weapon.ammo;
  }

  const cashElement = document.getElementById('cash').querySelector('.money-amount');
if (data.money && data.money.cash !== undefined) {
    cashElement.textContent = '$' + data.money.cash.toLocaleString();
    document.getElementById('cash').style.display = 'block';
} else {
    document.getElementById('cash').style.display = 'none';
}
window.addEventListener('message', function(event) {
  if (event.data.action === 'updatePlayerData' && event.data.data) {
      updatePlayerData(event.data.data);
      document.getElementById('hud-container').style.display = 'block'; // Ensure the HUD is visible after data is loaded
  }
});
  
  // Assuming the server triggers this event when player data changes
  window.addEventListener('message', function(event) {
    if (event.data.action === 'updatePlayerData') {
      updatePlayerData(event.data.data);
    }
  });
  
  // Update functions with appropriate intervals
  setInterval(updateBar.bind(null, 'health', 100, '.health-bar-fill'), 1000);
  setInterval(updateBar.bind(null, 'hunger', 100, '.hunger-bar-fill'), 1000);
  setInterval(updateBar.bind(null, 'thirst', 100, '.thirst-bar-fill'), 1000);
  setInterval(updateBar.bind(null, 'oxygen', 100, '.oxygen-bar-fill'), 1000);
  setInterval(updateArmedStatus, 500); // Adjust interval as needed
  setInterval(updateParachuteStatus, 500); // Adjust interval as needed
  setInterval(updateMoneyDisplay, 1000);
  setInterval(updateWeaponInfo, 500);

  // Assuming you have a div with id "minimap" in your HTML

const minimap = document.getElementById('minimap');
const minimapCanvas = document.createElement('canvas');
minimapCanvas.width = 200;
minimapCanvas.height = 200;
minimap.appendChild(minimapCanvas);

const minimapContext = minimapCanvas.getContext('2d');

const minimapRadius = minimapCanvas.width / 2;
const minimapCenter = { x: minimapRadius, y: minimapRadius };

function drawMinimap() {
    // Clear the canvas
    minimapContext.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);

    // ... rest of your drawMinimap logic
}

// Update minimap regularly
setInterval(drawMinimap, 100);

function drawMinimap() {
    // Clear the canvas
    minimapContext.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);

    // Draw the minimap background (optional)
    minimapContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
    minimapContext.beginPath();
    minimapContext.arc(minimapCenter.x, minimapCenter.y, minimapRadius, 0, Math.PI * 2);
    minimapContext.fill();

    // Get player position and other data
    const playerPosition = getPlayerPosition();
    const otherPlayers = getOtherPlayers();
    const waypoints = getWaypoints();

    // Calculate player position on the minimap
    const playerMapX = (playerPosition.x / worldSize) * minimapRadius + minimapCenter.x;
    const playerMapY = (playerPosition.y / worldSize) * minimapRadius + minimapCenter.y;

    // Draw player marker
    minimapContext.fillStyle = 'red';
    minimapContext.beginPath();
    minimapContext.arc(playerMapX, playerMapY, 3, 0, Math.PI * 2);
    minimapContext.fill();

    // Draw other players
    minimapContext.fillStyle = 'blue';
    minimapContext.beginPath();
    for (const otherPlayer of otherPlayers) {
        const otherPlayerMapX = (otherPlayer.x / worldSize) * minimapRadius + minimapCenter.x;
        const otherPlayerMapY = (otherPlayer.y / worldSize) * minimapRadius + minimapCenter.y;
        minimapContext.arc(otherPlayerMapX, otherPlayerMapY, 2, 0, Math.PI * 2);
    }
    minimapContext.fill();
}