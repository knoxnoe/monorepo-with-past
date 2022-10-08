import { FASTElement, customElement, attr } from '@microsoft/fast-element';

@customElement('name-tag')
export class NameTag extends FASTElement {
  @attr greeting: string = 'Hello';

  // optional method 
  greetingChanged() {
    console.log(this.shadowRoot)
  
    this.shadowRoot!.innerHTML = this.greeting;
  }

  connectedCallback() {
    super.connectedCallback();
    this.greetingChanged()
    console.log('name-tag is now connected to the DOM');
  }
}