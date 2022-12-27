export class Node {
  EMPTY = 0;
  REDHORSE = 1;
  GREENHORSE = 2;
  BONUS = 3;
  RED = 4;
  GREEN = 5;

  constructor(stateW, father, operator, depth) {
    this.stateW = stateW;
    this.father = father;
    this.operator = operator;
    this.depth = depth;
    this.optionsMove = 0;
    this.countColorsRed = 0;
    this.countColorsGreen = 0;
    this.horsePosRed = [];
    this.horsePosGreen = [];
    this.heuristic = 0; // para el nodo final
    this.bonus = false;
    this.type = " "; //max or min
    this.weight; //valor inicial: infinity o -inifinity
  }

  getStateW() {
    var copy = Array.from(this.stateW);
    return copy;
  }

  getFather() {
    return this.father;
  }

  getOperator() {
    return this.operator;
  }

  getDepth() {
    return this.depth;
  }

  getHeuristic() {
    return this.heuristic;
  }

  getHorsePosRed() {
    return this.horsePosRed;
  }

  getHorsePosGreen() {
    return this.horsePosGreen;
  }

  getOptionsMove() {
    return this.optionsMove;
  }

  getBonus() {
    return this.bonus;
  }

  getcountColorsRed() {
    return this.countColorsRed;
  }

  getcountColorsGreen() {
    return this.countColorsGreen;
  }

  getType() {
    return this.type;
  }

  getSumCostHeuristic() {
    return this.sumCostHeuristic;
  }

  setState(newState) {
    this.stateW = newState;
  }

  setType(newType) {
    this.type = newType;
  }

  setBonus(newBonus) {
    this.bonus = newBonus;
  }

  setFather(newFather) {
    this.father = newFather;
  }

  setOperator(newOperator) {
    this.operator = newOperator;
  }

  setDepth(newDepth) {
    this.depth = newDepth;
  }

  setOptionsMove(newOptionsMove) {
    this.optionsMove = newOptionsMove;
  }

  setCountColorsRed(newCountColorsRed) {
    this.countColorsRed = newCountColorsRed;
  }

  setCountColorsGreen(newCountColorsGreen) {
    this.countColorsGreen = newCountColorsGreen;
  }

  setHeuristic(newHeuristic) {
    this.heuristic = newHeuristic;
  }

  sethorsePosRed(newhorsePosRed) {
    console.log(newhorsePosRed);
    this.horsePosRed = newhorsePosRed;
    console.log(this.horsePosRed);
  }

  sethorsePosGreen(newhorsePosGreen) {
    this.horsePosGreen = newhorsePosGreen;
  }

  isGoal() {
    stateW = this.stateW;
    for (var i = 0; i < 10; i++)
      for (var j = 0; j < 10; j++)
        if (stateW[i][j] == 0 || stateW[i][j] == 3) return false;
    return true;
  }

  calculateHeuristic(sum) {
    return sum;
  }

  searchForHorseRed() {
    var horsePosRed = [-1, -1]; // Mario position [x,y]
    var stateW = this.stateW;

    for (var i = 0; i < 8; i++)
      for (var j = 0; j < 8; j++)
        if (stateW[i][j] == 1) {
          horsePosRed[0] = i;
          horsePosRed[1] = j;
        }

    this.sethorsePosRed(horsePosRed);
    console.log(horsePosRed);
    return horsePosRed;
  }

  searchForHorseGreen() {
    var horsePosGreen = [-1, -1]; // Mario position [x,y]
    var stateW = this.stateW;
    for (var i = 0; i < 8; i++)
      for (var j = 0; j < 8; j++)
        if (stateW[i][j] == 2) {
          horsePosGreen[0] = i;
          horsePosGreen[1] = j;
        }

    this.sethorsePosGreen(horsePosGreen);
    console.log(horsePosGreen);
    return horsePosGreen;
  }

  recreateSolutionWorld() {
    directions = [];
    currentNode = this;
    while (currentNode.getOperator() != "first father") {
      directions.append(currentNode.getStateW());
      currentNode = currentNode.getFather();
    }
    return directions;
  }

  oneMovement(posHorse) {
    return [posHorse[0] - 2, posHorse[1] - 1];
  }

  twoMovement(posHorse) {
    return [posHorse[0] - 2, posHorse[1] + 1];
  }

  threeMovement(posHorse) {
    return [posHorse[0] - 1, posHorse[1] + 2];
  }

  fourMovement(posHorse) {
    return [posHorse[0] + 1, posHorse[1] + 2];
  }

  fiveMovement(posHorse) {
    return [posHorse[0] + 2, posHorse[1] + 1];
  }

  sixMovement(posHorse) {
    return [posHorse[0] + 2, posHorse[1] - 1];
  }

  sevenMovement(posHorse) {
    return [posHorse[0] + 1, posHorse[1] - 2];
  }

  eightMovement(posHorse) {
    return [posHorse[0] - 1, posHorse[1] - 2];
  }

  moveRed(posHorse) {
    var iOld = posHorse[0];
    var jOld = posHorse[1];
    var iNew = this.getHorsePosRed()[0];
    var jNew = this.getHorsePosRed()[1];
    this.stateW[iOld][jOld] = 4; //casilla roja
    this.stateW[iNew][jNew] = 1; //caballo rojo
    console.log(iOld);
    console.log(jOld);
    console.log(iNew);
    console.log(jNew);
    console.log(this.stateW);
    return this;
  }

  moveGreen(posHorse) {
    var iOld = posHorse[0];
    var jOld = posHorse[1];
    var iNew = this.getHorsePosGreen()[0];
    var jNew = this.getHorsePosGreen()[1];
    this.stateW[iOld][jOld] = 5; //casilla roja
    this.stateW[iNew][jNew] = 2; //caballo rojo
    console.log(iOld);
    console.log(jOld);
    console.log(iNew);
    console.log(jNew);
    console.log(this.stateW);
    return this;
  }
}
