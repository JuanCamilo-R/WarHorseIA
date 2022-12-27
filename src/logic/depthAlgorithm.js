import { Node } from "./node.js";
export class DepthAlgorithm {
  constructor(world, nivel) {
    this.emptyNode = new Node(null, null, "first father", -1);
    this.firstNode = new Node(world, this.emptyNode, " ", 0);
    this.horsePosRed = this.firstNode.searchForHorseRed();
    this.horsePosGreen = this.firstNode.searchForHorseGreen();
    this.stack = [this.firstNode];
    this.computingTime = "";
    this.nivel = nivel;
    console.log("constructor");
    console.log(world);
  }

  recorrido(arr) {
    var num = 0;
    var state = [];
    do {
      state.push(arr[num].getStateW());
      num++;
    } while (arr.length - 1 != num - 1);
    return state;
  }

  start() {
    var stack = this.stack;
    var horsePosRed = this.horsePosRed;
    var horsePosGreen = this.horsePosGreen;
    var currentNode = stack[0];
    var expandedNodes = 0;
    var depth = 0;
    var nivelGame = 0;
    var arrayComplete = [];
    arrayComplete.push(currentNode);

    while (!(nivelGame == this.nivel)) {
      // //console.log("---");
      if (nivelGame % 2 == 0) {
        ////console.log(currentNode.getHorsePosRed());
      } else {
        ////console.log(currentNode.getHorsePosGreen());
      }

      stack.shift();
      expandedNodes += 1;

      //computador juega con el rojo
      //tablero de 8*8, el anterior era e 10*10

      if (nivelGame % 2 == 0) {
        console.log("aqui si");
        //le toca al computador

        console.log(horsePosRed[0]);
        console.log(horsePosRed[1]);
        //One

        if (
          !(horsePosRed[0] - 2 < 0) &&
          !(horsePosRed[1] - 1 < 0) &&
          (currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] - 1] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] - 1] ==
              3)
        ) {
          console.log("siOne");
          console.log(horsePosRed[0] - 2);
          console.log(horsePosRed[1] - 1);
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "one",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] - 1] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var one = son.oneMovement(horsePosRed);
          son.sethorsePosRed(one);
          son.moveRed(horsePosRed);

          console.log(currentNode.getStateW());
          console.log(son.getStateW());
          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosRed());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          if (son.getDepth() == this.nivel) {
          }
        }

        //Two
        if (
          !(horsePosRed[0] - 2 < 0) &&
          !(horsePosRed[1] + 1 > 7) &&
          (currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] + 1] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] + 1] ==
              3)
        ) {
          console.log("siTwo");
          console.log(horsePosRed[0] - 2);
          console.log(horsePosRed[1] + 1);
          console.log(currentNode.getStateW());
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "two",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] + 1] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var two = son.twoMovement(horsePosRed);
          son.sethorsePosRed(two);
          son.moveRed(horsePosRed);

          console.log(currentNode.getStateW());
          console.log(son.getStateW());

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosRed());
          }
        }

        //Three
        if (
          !(horsePosRed[0] - 1 < 0) &&
          !(horsePosRed[1] + 2 > 7) &&
          (currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] + 2] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] + 2] ==
              3)
        ) {
          console.log("siThree");
          console.log(horsePosRed[0] - 1);
          console.log(horsePosRed[1] + 2);
          console.log(currentNode.getStateW());
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "three",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] + 2] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var three = son.threeMovement(horsePosRed);
          son.sethorsePosRed(three);
          son.moveRed(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosRed());
          }
        }

        //Four
        if (
          !(horsePosRed[0] + 1 > 7) &&
          !(horsePosRed[1] + 2 > 7) &&
          (currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] + 2] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] + 2] ==
              3)
        ) {
          console.log("siFour");
          console.log(horsePosRed[0] + 1);
          console.log(horsePosRed[1] + 2);
          console.log(currentNode.getStateW());
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "four",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] + 2] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var four = son.fourMovement(horsePosRed);
          son.sethorsePosRed(four);
          son.moveRed(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosRed());
          }
        }
        //Five
        if (
          !(horsePosRed[0] + 2 > 7) &&
          !(horsePosRed[1] + 1 > 7) &&
          (currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] + 1] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] + 1] ==
              3)
        ) {
          console.log("siFive");
          console.log(horsePosRed[0] + 2);
          console.log(horsePosRed[1] + 1);
          console.log(currentNode.getStateW());
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "five",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] + 1] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var five = son.fiveMovement(horsePosRed);
          son.sethorsePosRed(five);
          son.moveRed(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosRed());
          }
        }

        //Six
        if (
          !(horsePosRed[0] + 2 > 7) &&
          !(horsePosRed[1] - 1 < 0) &&
          (currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] - 1] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] - 1] ==
              3)
        ) {
          console.log("siSix");
          console.log(horsePosRed[0] + 2);
          console.log(horsePosRed[1] - 1);
          console.log(currentNode.getStateW());
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "six",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] - 1] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var six = son.sixMovement(horsePosRed);
          son.sethorsePosRed(six);
          son.moveRed(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosRed());
          }
        }
        //Seven
        if (
          !(horsePosRed[0] + 1 > 7) &&
          !(horsePosRed[1] - 2 < 0) &&
          (currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] - 2] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] - 2] ==
              3)
        ) {
          console.log("siSeven");
          console.log(horsePosRed[0] + 1);
          console.log(horsePosRed[1] - 2);
          console.log(currentNode.getStateW());
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "seven",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] - 2] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var seven = son.sevenMovement(horsePosRed);
          son.sethorsePosRed(seven);
          son.moveRed(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosRed());
          }
        }

        //Eight
        if (
          !(horsePosRed[0] - 1 < 0) &&
          !(horsePosRed[1] - 2 < 0) &&
          (currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] - 2] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] - 2] ==
              3)
        ) {
          console.log("siEight");
          console.log(horsePosRed[0] - 1);
          console.log(horsePosRed[1] - 2);
          console.log(currentNode.getStateW());
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "eight",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] - 2] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var eight = son.eightMovement(horsePosRed);
          son.sethorsePosRed(eight);
          son.moveRed(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosRed());
          }
        }
      } else {
        //le toca al humano
        //One
        console.log("aqui no");
        if (
          !(horsePosGreen[0] - 2 < 0) &&
          !(horsePosGreen[1] - 1 < 0) &&
          (currentNode.getStateW()[horsePosGreen[0] - 2][
            horsePosGreen[1] - 1
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] - 2][
              horsePosGreen[1] - 1
            ] == 3)
        ) {
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "one",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosGreen[0] - 2][
              horsePosGreen[1] - 1
            ] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var one = son.oneMovement(horsePosGreen);
          son.sethorsePosGreen(one);
          son.moveGreen(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosGreen());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          if (son.getDepth() == this.nivel) {
          }
        }

        //Two
        if (
          !(horsePosGreen[0] - 2 < 0) &&
          !(horsePosGreen[1] + 1 > 7) &&
          (currentNode.getStateW()[horsePosGreen[0] - 2][
            horsePosGreen[1] + 1
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] - 2][
              horsePosGreen[1] + 1
            ] == 3)
        ) {
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "two",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosGreen[0] - 2][
              horsePosGreen[1] + 1
            ] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var two = son.twoMovement(horsePosGreen);
          son.sethorsePosGreen(two);
          son.moveGreen(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosGreen());
          }
        }

        //Three
        if (
          !(horsePosGreen[0] - 1 < 0) &&
          !(horsePosGreen[1] + 2 > 7) &&
          (currentNode.getStateW()[horsePosGreen[0] - 1][
            horsePosGreen[1] + 2
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] - 1][
              horsePosGreen[1] + 2
            ] == 3)
        ) {
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "three",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosGreen[0] - 1][
              horsePosGreen[1] + 2
            ] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var three = son.threeMovement(horsePosGreen);
          son.sethorsePosGreen(three);
          son.moveGreen(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosGreen());
          }
        }

        //Four
        if (
          !(horsePosGreen[0] + 1 > 7) &&
          !(horsePosGreen[1] + 2 > 7) &&
          (currentNode.getStateW()[horsePosGreen[0] + 1][
            horsePosGreen[1] + 2
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] + 1][
              horsePosGreen[1] + 2
            ] == 3)
        ) {
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "four",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosGreen[0] + 1][
              horsePosGreen[1] + 2
            ] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var four = son.fourMovement(horsePosGreen);
          son.sethorsePosGreen(four);
          son.moveGreen(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosGreen());
          }
        }
        //Five
        if (
          !(horsePosGreen[0] + 2 > 7) &&
          !(horsePosGreen[1] + 1 > 7) &&
          (currentNode.getStateW()[horsePosGreen[0] + 2][
            horsePosGreen[1] + 1
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] + 2][
              horsePosGreen[1] + 1
            ] == 3)
        ) {
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "five",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosGreen[0] + 2][
              horsePosGreen[1] + 1
            ] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var five = son.fiveMovement(horsePosGreen);
          son.sethorsePosGreen(five);
          son.moveGreen(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosGreen());
          }
        }

        //Six
        if (
          !(horsePosGreen[0] + 2 > 7) &&
          !(horsePosGreen[1] - 1 < 0) &&
          (currentNode.getStateW()[horsePosGreen[0] + 2][
            horsePosGreen[1] - 1
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] + 2][
              horsePosGreen[1] - 1
            ] == 3)
        ) {
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "six",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosGreen[0] + 2],
            [horsePosGreen[1] - 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var six = son.sixMovement(horsePosGreen);
          son.sethorsePosGreen(six);
          son.moveGreen(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosGreen());
          }
        }
        //Seven
        if (
          !(horsePosGreen[0] + 1 > 7) &&
          !(horsePosGreen[1] - 2 < 0) &&
          (currentNode.getStateW()[horsePosGreen[0] + 1][
            horsePosGreen[1] - 2
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] + 1][
              horsePosGreen[1] - 2
            ] == 3)
        ) {
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "seven",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosGreen[0] + 1][
              horsePosGreen[1] - 2
            ] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var seven = son.sevenMovement(horsePosGreen);
          son.sethorsePosGreen(seven);
          son.moveGreen(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosGreen());
          }
        }

        //Eight
        if (
          !(horsePosGreen[0] - 1 < 0) &&
          !(horsePosGreen[1] - 2 < 0) &&
          (currentNode.getStateW()[horsePosGreen[0] - 1][
            horsePosGreen[1] - 2
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] - 1][
              horsePosGreen[1] - 2
            ] == 3)
        ) {
          var son = new Node(
            currentNode.getStateW(),
            currentNode,
            "eight",
            currentNode.getDepth() + 1
          );
          if (
            currentNode.getStateW()[horsePosGreen[0] - 1][
              horsePosGreen[1] - 2
            ] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          var eight = son.eightMovement(horsePosGreen);
          son.sethorsePosGreen(eight);
          son.moveGreen(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //console.log(son.getHorsePosGreen());
          }
        }
      }
      nivelGame++;
    }
    //solution = currentNode.recreateSolutionWorld();
    //solutionWorld = solution.reverse();

    var completo = this.recorrido(arrayComplete);
    console.log(arrayComplete.length);
    console.log(completo);

    //console.log("exp&&ido", expandedNodes + 1); // Good
    //console.log("profundidad", depth);
    ////console.log(stack[0].recreateSolution());
    //return solutionWorld;
  }
}
