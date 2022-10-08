import {
    Button,
    buttonTemplate as template,
} from "@microsoft/fast-foundation";

import { fastButton, provideFASTDesignSystem } from "@microsoft/fast-components";

provideFASTDesignSystem()
    .withPrefix("faster")
    .register(fastButton())