import { getProject } from './projects';
import type { PhotoId } from './images';
import type { Project } from './types';

/**
 * The hero photo and its crop. The wide outdoor-renovation shot is the only one that shows the whole cover,
 * the kitchen island and the house together. It is a portrait photo, so the crop differs by width: phones and
 * tablets keep it slightly left of center so the kitchen end stays in, and wide screens sit it high so the
 * rooflines and the full cover show instead of the empty lawn. The registry focal is left alone so the
 * project card that uses the same photo keeps its framing.
 */
export const HERO_PHOTO: { id: PhotoId; position: { base: string; lg: string } } = {
  id: 'reno-pergola-turf-wide',
  position: { base: '45% 20%', lg: '50% 24%' },
};

/** The project shown big lower on the home page. */
export const HOME_FEATURE = 'gable-home-extension-watauga';

/** Early proof right under the hero: three finished projects that are not the hero photo or the big feature. */
export const HOME_PROOF = ['gable-patio-cover-poolside', 'free-standing-patio-cover-pavers-walkway', 'classic-gable-patio-cover'];

export const homeProofProjects = (): Project[] => HOME_PROOF.map((slug) => getProject(slug)).filter((p): p is Project => Boolean(p));
