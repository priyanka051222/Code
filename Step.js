class Step {
  constructor({ element, id, label }) {
    this.next = null;
    this.prev = null;
    this.element = element;
    this.id = id;
    this.label = label;
  }
}

export default Step;
