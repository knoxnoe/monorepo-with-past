import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { 
    allComponents,
    fastButton,
    fastCard,
    provideFASTDesignSystem,
    
} from "@microsoft/fast-components";
import { FoundationElementTemplate } from "@microsoft/fast-foundation"

import { FASTElement, customElement, ViewTemplate,  attr, html } from '@microsoft/fast-element';

// const template = html`<p>A completely new template</p>`;

// const template = html<NameTag>`
//   <div class="header">
//     <h3>${x => x.greeting.toUpperCase()}</h3>
//     <h4>my name is</h4>
//   </div>

//   <div class="body">TODO: Name Here</div>

//   <div class="footer"></div>
// `;

// @customElement({
//   name: 'name-tag',
//   template
// })
// class NameTag extends FASTElement {
//   @attr greeting: string = 'Hello';
// }



// provideFASTDesignSystem().register(
//     fastButton({
//       baseClass: 'ggg'
//     }),
//     fastCard()
// );

createApp(App).mount('#app')
