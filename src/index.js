import "./styles.css";
import Stepper from "../Stepper";
document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

const data = [
  {
    id: 1,
    label: "Step 1",
    element: "<div>HTML 1</div>"
  },
  {
    id: 2,
    label: "Step 2",
    element: "<div>HTML 2</div>"
  },
  {
    id: 3,
    label: "Step 3",
    element: "<div>HTML 3</div>"
  }
];

document.getElementById("app").innerHTML = '<div class="Stepper"><div>';
const myStepper = new Stepper();
myStepper.init(data);
