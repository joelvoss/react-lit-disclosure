import { useEffect, useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '../../src/index';

export function Example() {
	const [value, setValue] = useState('');
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (value.toLowerCase().trim() === 'open') {
			setOpen(true);
		} else if (value.toLowerCase().trim() === 'close') {
			setOpen(false);
		}
	}, [value]);

	return (
		<>
			<h2>Example: Controlled</h2>
			<div>
				<label style={{ display: 'block' }}>
					<span>Type "{open ? 'close' : 'open'}"</span>
					<input
						style={{ display: 'block', margin: '10px 0' }}
						type="text"
						value={value}
						onChange={event => setValue(event.target.value)}
					/>
				</label>
				<Disclosure open={open} onChange={() => setOpen(!open)}>
					<DisclosureButton>Expand me!</DisclosureButton>
					<DisclosurePanel>
						Li Europan lingues es membres del sam familie. Lor separat
						existentie es un myth. Por scientie, musica, sport etc, litot Europa
						usa li sam vocabular.
					</DisclosurePanel>
				</Disclosure>
			</div>
		</>
	);
}
