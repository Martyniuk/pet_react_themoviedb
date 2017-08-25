// Core
import moment from 'moment';

export const getCurrentTime = () => moment().format('MMMM D h:mm:ss a');

export function getRandomColor () {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}
