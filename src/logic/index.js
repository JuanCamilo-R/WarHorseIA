class Node {
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
    this.heuristic = 0; // The correct value is given only when the greedy algorithm is used
    this.bonus = false;
    this.type = " "; //max or min
  }

  get getStateW() {
    return this.stateW;
  }

  get getFather() {
    return this.father;
  }

  get getOperator() {
    return this.operator;
  }

  get getDepth() {
    return this.depth;
  }

  get getHeuristic() {
    return this.heuristic;
  }

  get gethorsePosRed() {
    return this.horsePosRed;
  }

  get gethorsePosGreen() {
    return this.horsePosGreen;
  }

  get getState() {
    return this.state.copy();
  }

  get getAwaitingCharacter() {
    return this.awaitingCharacter;
  }

  get getOptionsMove() {
    return this.optionsMove;
  }

  get getBonus() {
    return this.bonus;
  }

  get getcountColorsRed() {
    return this.countColorsRed;
  }

  get getcountColorsGreen() {
    return this.countColorsGreen;
  }

  get getType() {
    return this.type;
  }

  get getSumCostHeuristic() {
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
    this.horsePosRed = newhorsePosRed;
  }

  sethorsePosGreen(newhorsePosGreen) {
    this.horsePosGreen = newhorsePosGreen;
  }

  isGoal() {
    stateW = this.stateW;
    for (i = 0; i < 10; i++)
      for (j = 0; j < 10; j++)
        if (state[i][j] == 0 || state[i][j] == 3) return false;
    return true;
  }

  calculateHeuristic(sum) {
    return sum;
  }

  searchForHorseRed() {
    horsePosRed = [-1, -1]; // Mario position [x,y]
    stateW = this.stateW;
    for (i = 0; i < 10; i++)
      for (j = 0; j < 10; j++)
        if (stateW[i][j] == this.REDHORSE) {
          horsePosRed[0] = i;
          horsePosRed[1] = j;
        }

    this.sethorsePosRed(horsePosRed);
    return horsePosRed;
  }

  searchForHorseGreen() {
    horsePosGreen = [-1, -1]; // Mario position [x,y]
    stateW = this.stateW;
    for (i = 0; i < 10; i++)
      for (j = 0; j < 10; j++)
        if (stateW[i][j] == this.GREENHORSE) {
          horsePosGreen[0] = i;
          horsePosGreen[1] = j;
        }

    this.sethorsePosGreen(horsePosGreen);
    return horsePosGreen;
  }

  oneMovement(marioPos) {
    return [marioPos[0] - 2, marioPos[1] - 1];
  }

  moveOne(posHorse) {
    /*
    # posicion sin moverse aún, es la de mi padre
    i = posMario[0]
    j = posMario[1]
    # cambio la casilla desde donde me voy a mover
    # (la posicion de mi padre), si mi padre no pudo coger una flor en el await quedo, entonces cuando me mueva queda ahí, pero si la pudo coger entonces queda vacio la posicion que voy a dejar
    self.__state[i, j] = self.getFather().getAwaitingCharacter()
    */
    return this;
  }
}

class DepthAlgorithm {
  constructor(world, nivel) {
    this.emptyNode = Node(None, None, "first father", -1);
    this.firstNode = Node(world, this.emptyNode, " ", 0);
    this.horsePosRed = this.firstNode.searchForHorseRed();
    this.horsePosGreen = this.firstNode.searchForHorseGreen();
    this.stack = [this.firstNode];
    this.computingTime = "";
    this.nivel = nivel;
  }

  start() {
    stack = this.stack;
    horsePosRed = this.horsePosRed;
    horsePosGreen = this.horsePosGreen;
    currentNode = stack[0];
    expandedNodes = 0;
    depth = 0;
    nivelGame = 0;
    arrayComplete = [];
    arrayComplete.push(currentNode);
    while (!(nivelGame == this.nivel)) {
      console.log("---");
      if (nivelGame % 2 == 0) {
        console.log(currentNode.gethorsePosRed());
      } else {
        console.log(currentNode.gethorsePosGreen());
      }

      stack.shift();
      expandedNodes += 1;
      // Check if one side is free
      /*
         constructor(stateW, father, operator, depth) {
      this.stateW = stateW;
      this.father = father;
      this.operator = operator;
      this.depth = depth;
      this.optionsMove = 0;
      this.countColorsRed = 0;
      this.horsePosRed = [];
      this.heuristic = 0; // The correct value is given only when the greedy algorithm is used
      this.bonus = false;
      this.type = " ";//max or min
    }
  
        */
      //computador juega con el rojo
      //tablero de 8*8, el anterior era e 10*10
      /*
  
  
       */

      if (nivelGame % 2 == 0) {
        //le toca al computador
        //One
        if (
          not(horsePosRed[0] - 2 < 0) &&
          not(horsePosRed[1] - 1 < 0) &&
          (currentNode.getState()[horsePosRed[0] - 2],
          [horsePosRed[1] - 1] == 0 ||
            currentNode.getState()[horsePosRed[0] - 2],
          [horsePosRed[1] - 1] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "one",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosRed[0] - 2],
            [horsePosRed[1] - 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          one = son.oneMovement(horsePosRed);
          son.sethorsePosRed(one);
          son.moveRight(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosRed());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          if (son.getDepth() == this.nivel) {
          }
        }

        //Two
        if (
          not(horsePosRed[0] - 2 < 0) &&
          not(horsePosRed[1] + 1 > 7) &&
          (currentNode.getState()[horsePosRed[0] - 2],
          [horsePosRed[1] + 1] == 0 ||
            currentNode.getState()[horsePosRed[0] - 2],
          [horsePosRed[1] + 1] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "two",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosRed[0] - 2],
            [horsePosRed[1] + 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosRed);
          son.setNewCost(right);
          son.sethorsePosRed(right);
          son.moveRight(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosRed());
          }
        }

        //Three
        if (
          not(horsePosRed[0] - 1 < 0) &&
          not(horsePosRed[1] + 2 > 7) &&
          (currentNode.getState()[horsePosRed[0] - 1],
          [horsePosRed[1] + 2] == 0 ||
            currentNode.getState()[horsePosRed[0] - 1],
          [horsePosRed[1] + 2] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "three",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosRed[0] - 1],
            [horsePosRed[1] + 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosRed);
          son.setNewCost(right);
          son.sethorsePosRed(right);
          son.moveRight(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosRed());
          }
        }

        //Four
        if (
          not(horsePosRed[0] + 1 > 7) &&
          not(horsePosRed[1] + 2 > 7) &&
          (currentNode.getState()[horsePosRed[0] + 1],
          [horsePosRed[1] + 2] == 0 ||
            currentNode.getState()[horsePosRed[0] + 1],
          [horsePosRed[1] + 2] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "four",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosRed[0] + 1],
            [horsePosRed[1] + 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosRed);
          son.setNewCost(right);
          son.sethorsePosRed(right);
          son.moveRight(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosRed());
          }
        }
        //Five
        if (
          not(horsePosRed[0] + 2 > 7) &&
          not(horsePosRed[1] + 1 > 7) &&
          (currentNode.getState()[horsePosRed[0] + 2],
          [horsePosRed[1] + 1] == 0 ||
            currentNode.getState()[horsePosRed[0] + 2],
          [horsePosRed[1] + 1] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "five",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosRed[0] + 2],
            [horsePosRed[1] + 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosRed);
          son.setNewCost(right);
          son.sethorsePosRed(right);
          son.moveRight(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosRed());
          }
        }

        //Six
        if (
          not(horsePosRed[0] + 2 > 7) &&
          not(horsePosRed[1] - 1 < 0) &&
          (currentNode.getState()[horsePosRed[0] + 2],
          [horsePosRed[1] - 1] == 0 ||
            currentNode.getState()[horsePosRed[0] + 2],
          [horsePosRed[1] - 1] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "six",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosRed[0] + 2],
            [horsePosRed[1] - 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosRed);
          son.setNewCost(right);
          son.sethorsePosRed(right);
          son.moveRight(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosRed());
          }
        }
        //Seven
        if (
          not(horsePosRed[0] + 1 > 7) &&
          not(horsePosRed[1] - 2 < 0) &&
          (currentNode.getState()[horsePosRed[0] + 1],
          [horsePosRed[1] - 2] == 0 ||
            currentNode.getState()[horsePosRed[0] + 1],
          [horsePosRed[1] - 2] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "seven",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosRed[0] + 1],
            [horsePosRed[1] - 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosRed);
          son.setNewCost(right);
          son.sethorsePosRed(right);
          son.moveRight(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosRed());
          }
        }

        //Eight
        if (
          not(horsePosRed[0] - 1 < 0) &&
          not(horsePosRed[1] - 2 < 0) &&
          (currentNode.getState()[horsePosRed[0] - 1],
          [horsePosRed[1] - 2] == 0 ||
            currentNode.getState()[horsePosRed[0] - 1],
          [horsePosRed[1] - 2] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "eight",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosRed[0] - 1],
            [horsePosRed[1] - 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosRed);
          son.setNewCost(right);
          son.sethorsePosRed(right);
          son.moveRight(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosRed());
          }
        }
      } else {
        //le toca al humano
        //One
        if (
          not(horsePosGreen[0] - 2 < 0) &&
          not(horsePosGreen[1] - 1 < 0) &&
          (currentNode.getState()[horsePosGreen[0] - 2],
          [horsePosGreen[1] - 1] == 0 ||
            currentNode.getState()[horsePosGreen[0] - 2],
          [horsePosGreen[1] - 1] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "one",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosGreen[0] - 2],
            [horsePosGreen[1] - 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosGreen);
          son.setNewCost(right);
          son.sethorsePosGreen(right);
          son.moveRight(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosGreen());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          if (son.getDepth() == this.nivel) {
          }
        }

        //Two
        if (
          not(horsePosGreen[0] - 2 < 0) &&
          not(horsePosGreen[1] + 1 > 7) &&
          (currentNode.getState()[horsePosGreen[0] - 2],
          [horsePosGreen[1] + 1] == 0 ||
            currentNode.getState()[horsePosGreen[0] - 2],
          [horsePosGreen[1] + 1] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "two",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosGreen[0] - 2],
            [horsePosGreen[1] + 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosGreen);
          son.setNewCost(right);
          son.sethorsePosGreen(right);
          son.moveRight(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosGreen());
          }
        }

        //Three
        if (
          not(horsePosGreen[0] - 1 < 0) &&
          not(horsePosGreen[1] + 2 > 7) &&
          (currentNode.getState()[horsePosGreen[0] - 1],
          [horsePosGreen[1] + 2] == 0 ||
            currentNode.getState()[horsePosGreen[0] - 1],
          [horsePosGreen[1] + 2] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "three",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosGreen[0] - 1],
            [horsePosGreen[1] + 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosGreen);
          son.setNewCost(right);
          son.sethorsePosGreen(right);
          son.moveRight(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosGreen());
          }
        }

        //Four
        if (
          not(horsePosGreen[0] + 1 > 7) &&
          not(horsePosGreen[1] + 2 > 7) &&
          (currentNode.getState()[horsePosGreen[0] + 1],
          [horsePosGreen[1] + 2] == 0 ||
            currentNode.getState()[horsePosGreen[0] + 1],
          [horsePosGreen[1] + 2] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "four",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosGreen[0] + 1],
            [horsePosGreen[1] + 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosGreen);
          son.setNewCost(right);
          son.sethorsePosGreen(right);
          son.moveRight(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosGreen());
          }
        }
        //Five
        if (
          not(horsePosGreen[0] + 2 > 7) &&
          not(horsePosGreen[1] + 1 > 7) &&
          (currentNode.getState()[horsePosGreen[0] + 2],
          [horsePosGreen[1] + 1] == 0 ||
            currentNode.getState()[horsePosGreen[0] + 2],
          [horsePosGreen[1] + 1] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "five",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosGreen[0] + 2],
            [horsePosGreen[1] + 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosGreen);
          son.setNewCost(right);
          son.sethorsePosGreen(right);
          son.moveRight(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosGreen());
          }
        }

        //Six
        if (
          not(horsePosGreen[0] + 2 > 7) &&
          not(horsePosGreen[1] - 1 < 0) &&
          (currentNode.getState()[horsePosGreen[0] + 2],
          [horsePosGreen[1] - 1] == 0 ||
            currentNode.getState()[horsePosGreen[0] + 2],
          [horsePosGreen[1] - 1] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "six",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosGreen[0] + 2],
            [horsePosGreen[1] - 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosGreen);
          son.setNewCost(right);
          son.sethorsePosGreen(right);
          son.moveRight(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosGreen());
          }
        }
        //Seven
        if (
          not(horsePosGreen[0] + 1 > 7) &&
          not(horsePosGreen[1] - 2 < 0) &&
          (currentNode.getState()[horsePosGreen[0] + 1],
          [horsePosGreen[1] - 2] == 0 ||
            currentNode.getState()[horsePosGreen[0] + 1],
          [horsePosGreen[1] - 2] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "seven",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosGreen[0] + 1],
            [horsePosGreen[1] - 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosGreen);
          son.setNewCost(right);
          son.sethorsePosGreen(right);
          son.moveRight(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosGreen());
          }
        }

        //Eight
        if (
          not(horsePosGreen[0] - 1 < 0) &&
          not(horsePosGreen[1] - 2 < 0) &&
          (currentNode.getState()[horsePosGreen[0] - 1],
          [horsePosGreen[1] - 2] == 0 ||
            currentNode.getState()[horsePosGreen[0] - 1],
          [horsePosGreen[1] - 2] == 3)
        ) {
          son = Node(
            currentNode.getState(),
            currentNode,
            "eight",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getState()[horsePosGreen[0] - 1],
            [horsePosGreen[1] - 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          right = son.rightMovement(horsePosGreen);
          son.setNewCost(right);
          son.sethorsePosGreen(right);
          son.moveRight(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.gethorsePosGreen());
          }
        }
      }
    }
    solution = currentNode.recreateSolutionWorld();
    solutionWorld = solution.reverse();
    console.log("exp&&ido", expandedNodes + 1); // Good
    console.log("profundidad", depth);
    console.log(stack[0].recreateSolution());
    return solutionWorld;
  }
}
