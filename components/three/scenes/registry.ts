export const SCENE_IDS = ['monolith', 'scan', 'constellation', 'survey', 'sigil'] as const;
export type SceneId = (typeof SCENE_IDS)[number];

export const SCENE_META: Record<SceneId, { name: string; blurb: string }> = {
	monolith: {
		name: 'Runestone',
		blurb:
			'One standing stone with an arched head, weathered and lit from a low angle. Your name runs down the face in Elder Futhark, the grooves glowing ochre, while the stone sways slowly toward the cursor. Drag or swipe to turn it; tap to strike the runes alight.',
	},
	scan: {
		name: 'Artifact scan',
		blurb:
			'The stone as a photogrammetry point cloud rather than a solid. A scan plane sweeps up the specimen and the inscription resolves out of the cloud as it passes.',
	},
	constellation: {
		name: 'Star chart',
		blurb:
			'A rotating celestial sphere with the figures drawn in over it in ochre rule lines, plus one great circle for the horizon. Quiet, wide, and very flat-graphic.',
	},
	survey: {
		name: 'Contour survey',
		blurb:
			'A site survey sheet: terrain read as contour lines, every fourth one drawn heavier as an index contour, laid on a tilted table and turning slowly.',
	},
	sigil: {
		name: 'Bind-rune',
		blurb:
			'Seven runes sharing one stave, cut as real bars in 3D and lit from a low angle so the light travels across the form as it rocks back and forth.',
	},
};
