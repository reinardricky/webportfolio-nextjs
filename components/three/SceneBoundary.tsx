'use client';

import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode; fallback: ReactNode };
type State = { failed: boolean };

/**
 * WebGL fails in ways feature detection cannot predict — a driver that
 * refuses to link the shader, a lost context, a blocked GPU. When that
 * happens the hero falls back to the static shell rather than going blank.
 */
export default class SceneBoundary extends Component<Props, State> {
	state: State = { failed: false };

	static getDerivedStateFromError(): State {
		return { failed: true };
	}

	componentDidCatch(error: Error) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn('[hero] 3D scene failed, using static fallback:', error);
		}
	}

	render() {
		return this.state.failed ? this.props.fallback : this.props.children;
	}
}
