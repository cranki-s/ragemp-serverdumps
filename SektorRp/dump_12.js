{
const { CircuitBreaker } = require("./CircuitBreaker/CircuitBreaker");

class CircuitBreakerManager {
  constructor() {
    this.game = null;
  }
  start(lives, difficulty, levels) {
    if (this.game !== null)
      return; // Cannot start twice
    this.game = new CircuitBreaker(lives, difficulty, levels, () => {
      this.game = null;
    });
      mp.players.local.buckle = true;
      mp.players.local.minigame = true;
  }
  handleRender() {
    if (this.game === null)
      return;
    this.game.tick();
  }
}
exports.clientCircuitBreakerManager = new CircuitBreakerManager();
}