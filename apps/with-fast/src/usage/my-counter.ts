import {
    html,
    css,
    customElement,
    observable,
    FASTElement,
} from "@microsoft/fast-element";

const template = html<MyCounterr>`
    <button @click="${x => x.greetingChanged()}">-</button>
    <span>${x => x.getCount()}</span>
    <button @click="${x => { console.log(x.count);x.count++;}}">+</button>
    <button @click="${x => x.changeName()}">change</button>
    
`;

const styles = css`
  button, span {
    font-family: inherit;
    font-size: 32px;
  }
  span {
    width: 4rem;
    display: inline-block;
    text-align: center;
  }
  button {
    box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 4px;
    width: 42px;
    height: 42px;
    background-color: #c01754;
    color: white;
  }
  button:hover {
    cursor: pointer;
    background-color: #da1a5f;
  }
  button:focus-visible {
    border 1px solid #000;
    box-shadow: #707070 0px 0px 0px 1px inset, #FFFFFF 0px 0px 0px 3px inset;
    outline: none;
  }
`;

@customElement({
    name: "my-counterr",
    template,
    styles,
})
export class MyCounterr extends FASTElement {
    @observable count = 0;
    @observable name = '';

    nameChanged(oldValue: string, newValue: string) {
      console.log(oldValue, newValue)
    }


    greetingChanged() {
      console.log('this.count: ', this.count)
    }

    getCount() {
      console.log('get count')
      return this.count;
    }

    changeName() {
      console.log('change name', this.name)
      this.name = `${this.name}+`
    }

}