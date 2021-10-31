# @react-lit/disclosure

A disclosure is a button that controls visibility of a section of content.
When the controlled content is hidden, it is often styled as a typical push
button with a right-pointing arrow or triangle to hint that activating the
button will display additional content. When the content is visible, the
arrow or triangle typically points down.

## Installation

```bash
$ npm i @react-lit/disclosure
# or
$ yarn add @react-lit/disclosure
```

## Example

```js
import * as React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from "@react-lit/disclosure";

function Example() {
  return (
    <Disclosure>
      <DisclosureButton>Expand me!</DisclosureButton>
      <DisclosurePanel>
        Li Europan lingues es membres del sam familie.
        Lor separat existentie es un myth. Por scientie, musica, sport etc,
        litot Europa usa li sam vocabular.
      </DisclosurePanel>
    </Disclosure>
  );
}
```

## Development

(1) Install dependencies

```bash
$ npm i
# or
$ yarn
```

(2) Run initial validation

```bash
$ ./Taskfile.sh validate
```

(3) Run tests in watch-mode to validate functionality.

```bash
$ ./Taskfile test -w
```

---

_This project was set up by @jvdx/core_
