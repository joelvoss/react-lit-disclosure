import { Disclosure, DisclosureButton, DisclosurePanel } from '../../src/index';

export function Example() {
	return (
		<>
			<h2>Example: Basic</h2>
			<Disclosure>
				<DisclosureButton>Expand me!</DisclosureButton>
				<DisclosurePanel>
					Li Europan lingues es membres del sam familie. Lor separat existentie
					es un myth. Por scientie, musica, sport etc, litot Europa usa li sam
					vocabular.
				</DisclosurePanel>
			</Disclosure>
		</>
	);
}
