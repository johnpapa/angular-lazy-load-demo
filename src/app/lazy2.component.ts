import {
  Component,
  ViewContainerRef,
  ComponentFactoryResolver
  // ViewChild
} from "@angular/core";
import { Lazy2aComponent } from "./lazy2a.component";
import { Lazy2bComponent } from "./lazy2b.component";

@Component({
  template: `
    <div>
      <p>
        lazy2 component
      </p>
      <button (click)="getChild('a')">Child A</button>
      <button (click)="getChild('b')">Child B</button>
      <!-- template #childContainer></template -->
    </div>
  `
})
export class Lazy2Component {
  // @ViewChild("childContainer", { read: ViewContainerRef }) container;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) {}

  getChild(whichChild: "a" | "b") {
    const child = whichChild === "a" ? Lazy2aComponent : Lazy2bComponent;
    const componentFactory = this.cfr.resolveComponentFactory(child);
    this.viewContainerRef.clear();
    // this.container.clear();
    // const componentRef = this.container.createComponent(
    const componentRef = this.viewContainerRef.createComponent(
      componentFactory
    );
  }
}
