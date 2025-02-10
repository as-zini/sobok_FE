
export const minToHour = (time) => {
    const hour = Math.floor(time/60);
    const min = time - (hour*60);
    return(
      hour === 0 ? `${min}M` : `${hour}H ${min}M`
    )
}
