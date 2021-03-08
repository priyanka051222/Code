import Step from "./Step";

class Stepper {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  init(data) {
    if (data.length === 0) {
      alert("No steps found");
      return;
    }
    data.forEach((item) => {
      this.addStep(item);
    });
    const myApp = document.getElementById("app");

    myApp.innerHTML = `<div class="Stepper">
<div id="stepperList"></div>
<div id="currentView"></div>
<div class="button-section ">
<Button id="Previous">Previous</Button>
<Button id="Next">Next</Button>
</div>
<div>`;

    this.bindEvents();
  }

  bindEvents() {
    const stepperList = document.getElementById("stepperList");
    stepperList.innerHTML = this.printStepper();
    const currentView = document.getElementById("currentView");
    currentView.innerHTML = this.currentNode().element;
    const nextButton = document.getElementById("Next");

    nextButton.addEventListener("click", () => {
      currentView.innerHTML = this.nextStep({
        nextButton,
        prevButton
      }).element;
    });
    //nextButton.setAttribute("disabled", this.checkDisabled("Next"));
    const prevButton = document.getElementById("Previous");
    prevButton.addEventListener("click", () => {
      currentView.innerHTML = this.prevStep({
        nextButton,
        prevButton
      }).element;
    });
    //nextButton.setAttribute("disabled", this.checkDisabled("Previous"));
    nextButton.style.display = this.checkDisabled("Next");
    prevButton.style.display = this.checkDisabled("Previous");
    document.getElementById(this.current.id).className = "highlight";
  }
  printStepper() {
    let current = this.head;
    let createHtml = "";
    while (current) {
      createHtml += `<div class="Label" id="${current.id}">${current.label}</div>`;
      current = current.next;
    }

    return createHtml;
  }
  addStep({ label, id, element }) {
    if (!label || !id || !element) {
      alert("Invalid step:" + id);
      return;
    }
    const newNode = new Step({ label, id, element });
    this.length++;
    if (!this.head && !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      this.current = this.head;
    } else {
      let currentNode = this.head;
      let prev = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
        prev = currentNode;
      }
      currentNode.next = newNode;
      newNode.prev = prev;
      newNode.next = null;
      this.tail = newNode;
    }
  }

  nextStep({ nextButton, prevButton }) {
    document.getElementById(this.current.id).className = "Label";
    const nextNode = this.current.next;
    this.current = nextNode;
    this.checkButtonStates({ nextButton, prevButton });
    document.getElementById(this.current.id).className = "highlight";
    return nextNode;
  }

  checkButtonStates({ nextButton, prevButton }) {
    nextButton.style.display = this.checkDisabled("Next");
    prevButton.style.display = this.checkDisabled("Previous");
  }

  prevStep({ nextButton, prevButton }) {
    document.getElementById(this.current.id).className = "Label";
    const prevNode = this.current.prev;
    this.current = prevNode;
    document.getElementById(this.current.id).className = "highlight";
    this.checkButtonStates({ nextButton, prevButton });
    document.getElementById("Previous").style.display = this.checkDisabled(
      "Previous"
    );
    return prevNode;
  }

  currentNode() {
    return this.current;
  }

  checkDisabled(type) {
    if (this.current.label === this.head.label && type === "Previous") {
      return "none";
    }

    if (this.current.label === this.tail.label && type === "Next") {
      return "none";
    }

    return "inline-block";
  }
}

export default Stepper;
