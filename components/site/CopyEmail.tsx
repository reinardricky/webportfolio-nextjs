'use client';

import { useEffect, useState } from 'react';

type Status = 'idle' | 'copied' | 'failed';

const LABEL: Record<Status, string> = {
	idle: 'Copy',
	copied: 'Copied',
	failed: 'Could not copy. Please select it manually.',
};

/** Copies the address for visitors who don't have a mail client set up. */
export default function CopyEmail({ email }: { email: string }) {
	const [status, setStatus] = useState<Status>('idle');

	useEffect(() => {
		if (status === 'idle') return;
		const t = window.setTimeout(() => setStatus('idle'), 2200);
		return () => window.clearTimeout(t);
	}, [status]);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(email);
			setStatus('copied');
		} catch {
			setStatus('failed');
		}
	};

	return (
		<button
			type="button"
			onClick={copy}
			className={`btn label px-3 py-2 ${status === 'copied' ? 'border-cool text-cool' : ''}`}
		>
			<span aria-live="polite">{LABEL[status]}</span>
		</button>
	);
}
