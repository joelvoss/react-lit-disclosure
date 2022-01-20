import * as React from 'react';
import {
	useStableCallback,
	createNamedContext,
	makeId,
	useComposeRefs,
	composeEventHandlers,
} from '@react-lit/helper';
import { useId } from '@react-lit/auto-id';

////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {Object} DisclosureStates
 * @prop {string} OPEN
 * @prop {string} COLLAPSED
 */
const DisclosureStates = {
	OPEN: 'open',
	COLLAPSED: 'collapsed',
};

////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {Object} DisclosureContextValue
 * @prop {string} disclosureId
 * @prop {void} onSelect
 * @prop {boolean} open
 * @prop {string} panelId
 */

const DisclosureContext = createNamedContext('DisclosureContext', {});

////////////////////////////////////////////////////////////////////////////////

/**
 * A hook that exposes data for a given `Disclosure` component to it's
 * descendants.
 * @returns {{id: string, panelId: string, open: boolean }}
 */
export function useDisclosureContext() {
	/** @type {DisclosureContextValue} */
	let { open, panelId, disclosureId } = React.useContext(DisclosureContext);
	return React.useMemo(
		() => ({
			id: disclosureId,
			panelId,
			open,
		}),
		[disclosureId, open, panelId],
	);
}

////////////////////////////////////////////////////////////////////////////////

/**
 * Disclosure renders wrapper component and context provider for a
 * disclosure's button and
 * panel components. A disclosure should only have one button and one panel
 * descendant.
 */
export const Disclosure = ({
	children,
	defaultOpen = false,
	onChange,
	open: openProp,
	...props
}) => {
	const { current: isControlled } = React.useRef(openProp != null);

	const id =
		useId(props.id != null ? String(props.id) : undefined) || 'disclosure';
	const panelId = makeId('panel', id);

	const [open, setOpen] = React.useState(isControlled ? openProp : defaultOpen);
	const stableOnChange = useStableCallback(onChange);

	const onSelect = React.useCallback(() => {
		stableOnChange();
		if (!isControlled) {
			setOpen(open => !open);
		}
	}, [stableOnChange, isControlled]);

	const context = React.useMemo(
		() => ({
			disclosureId: id,
			onSelect,
			open,
			panelId,
		}),
		[onSelect, id, open, panelId],
	);

	if (isControlled && openProp !== open) {
		//NOTE(joel): If the component is controlled, we'll sync internal state
		// with the controlled state.
		setOpen(openProp);
	}

	return (
		<DisclosureContext.Provider value={context}>
			{children}
		</DisclosureContext.Provider>
	);
};

////////////////////////////////////////////////////////////////////////////////

/**
 * DisclosureButton renders the trigger button a user clicks to interact with
 * a disclosure.
 */
export const DisclosureButton = React.forwardRef(
	(
		{
			as: Comp = 'button',
			children,
			onClick,
			onMouseDown,
			onPointerDown,
			...props
		},
		parentRef,
	) => {
		/** @type {DisclosureContextValue} */
		const { onSelect, open, panelId } = React.useContext(DisclosureContext);
		const ownRef = React.useRef(null);

		const ref = useComposeRefs(parentRef, ownRef);

		/**
		 * handleClick
		 * @param {React.MouseEvent} event
		 */
		function handleClick(event) {
			event.preventDefault();
			ownRef.current && ownRef.current.focus();
			onSelect();
		}

		return (
			<Comp
				aria-controls={panelId}
				aria-expanded={open}
				{...props}
				data-state={open ? DisclosureStates.OPEN : DisclosureStates.COLLAPSED}
				ref={ref}
				onClick={composeEventHandlers(onClick, handleClick)}
			>
				{children}
			</Comp>
		);
	},
);

////////////////////////////////////////////////////////////////////////////////

/**
 * DisclosurePanel renders the collapsible panel in which inner content for an
 * disclosure item is rendered.
 */
export const DisclosurePanel = React.forwardRef(
	({ as: Comp = 'div', children, ...props }, parentRef) => {
		/** @type {DisclosureContextValue} */
		const { panelId, open } = React.useContext(DisclosureContext);

		return (
			<Comp
				ref={parentRef}
				hidden={!open}
				{...props}
				data-state={open ? DisclosureStates.OPEN : DisclosureStates.COLLAPSED}
				id={panelId}
				tabIndex={-1}
			>
				{children}
			</Comp>
		);
	},
);
