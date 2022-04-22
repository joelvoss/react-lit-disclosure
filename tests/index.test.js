import * as React from 'react';
import { render, userEvent } from './test-utils';

import { Disclosure, DisclosureButton, DisclosurePanel } from '../src/index';

describe('<Disclosure />', () => {
	const Comp = props => {
		return (
			<Disclosure {...props}>
				<DisclosureButton>Button</DisclosureButton>
				<DisclosurePanel>Panel</DisclosurePanel>
			</Disclosure>
		);
	};

	it('should not have ARIA violations', async () => {
		let { container, getByRole } = render(<Comp />);

		await expect(container).toHaveNoAxeViolations();

		await userEvent.click(getByRole('button'));

		await expect(container).toHaveNoAxeViolations();
	});

	it('should render proper HTML', async () => {
		const { container } = render(<Comp />);
		expect(container.innerHTML).toMatchSnapshot();
	});

	it('should hide the panel content by default', async () => {
		const { getByText } = render(<Comp />);
		expect(getByText(/panel/i)).not.toBeVisible();
	});

	it(`should show the panel when defaultOpen is 'true'`, async () => {
		const { getByText } = render(<Comp defaultOpen />);
		expect(getByText(/panel/i)).toBeVisible();
	});

	it(`should hide the panel when defaultOpen is 'false'`, async () => {
		const { getByText } = render(<Comp defaultOpen={false} />);
		expect(getByText(/panel/i)).not.toBeVisible();
	});

	it(`should show the panel when open is 'true'`, async () => {
		const { getByText } = render(<Comp open />);
		expect(getByText(/panel/i)).toBeVisible();
	});

	it(`should hide the panel when open is 'false'`, async () => {
		const { getByText } = render(<Comp open={false} />);
		expect(getByText(/panel/i)).not.toBeVisible();
	});

	it(`should accept a custom id`, async () => {
		const { getByText } = render(<Comp id="custom-id" />);
		expect(getByText(/panel/i)).toHaveAttribute('id', 'panel--custom-id');
	});

	it(`should remove the panel from the navigation flow`, async () => {
		const { getByText } = render(<Comp />);
		expect(getByText(/panel/i)).toHaveAttribute('tabindex', '-1');
	});

	it('should set the correct aria attributes when collapsed', async () => {
		const { getByText } = render(<Comp />);
		let button = getByText(/button/i);
		let panel = getByText(/panel/i);

		expect(button).toHaveAttribute('aria-expanded', 'false');
		expect(button).toHaveAttribute('data-state', 'collapsed');

		expect(panel).toHaveAttribute('data-state', 'collapsed');
		expect(panel).toHaveAttribute('hidden');
	});

	it('should set the correct aria attributes when open', async () => {
		const { getByText } = render(<Comp open />);
		let button = getByText(/button/i);
		let panel = getByText(/panel/i);

		expect(button).toHaveAttribute('aria-expanded', 'true');
		expect(button).toHaveAttribute('data-state', 'open');

		expect(panel).toHaveAttribute('data-state', 'open');
		expect(panel).not.toHaveAttribute('hidden');
	});

	it(`should toggle on click`, async () => {
		const { getByText } = render(<Comp />);
		expect(getByText(/panel/i)).not.toBeVisible();

		await userEvent.click(getByText(/button/i));

		expect(getByText(/panel/i)).toBeVisible();
	});

	it(`should call 'onChange' on click`, async () => {
		let callback = jest.fn();
		const { getByText } = render(<Comp onChange={callback} />);

		await userEvent.click(getByText(/button/i));
		expect(callback).toHaveBeenCalledTimes(1);
		await userEvent.click(getByText(/button/i));
		expect(callback).toHaveBeenCalledTimes(2);
	});

	it(`should toggle on spacebar`, async () => {
		const { getByText } = render(<Comp />);

		getByText(/button/i).focus();

		await userEvent.keyboard(' ');
		expect(getByText(/panel/i)).toBeVisible();
		await userEvent.keyboard(' ');
		expect(getByText(/panel/i)).not.toBeVisible();
	});
});
