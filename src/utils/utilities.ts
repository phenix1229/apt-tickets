const date = new Date;

export const minuteFormat = () => {
    if (date.getMinutes() < 10){
        return `0${date.getMinutes()}`;
    } else {
        return `${date.getMinutes()}`;
    }
}

export const timeFormat = () => {
    const hours = date.getHours();
    if (hours < 13){
        return `${hours}:${minuteFormat()}AM`;
    }
    return `${hours - 12}:${minuteFormat()}PM`
}

export const dateFormat = () => {
    return `${date.getMonth() +1}/${date.getDate()}/${date.getFullYear()}`
}