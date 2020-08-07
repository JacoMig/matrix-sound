export const isTouchDevice = () => {
    return typeof window.ontouchstart !== 'undefined';
}