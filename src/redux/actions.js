export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export function changeVolume(volume) {
  return {
    type: CHANGE_VOLUME,
    volume
  };
}
