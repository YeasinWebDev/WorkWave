const FormatNumber = ({ num }) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(num % 1000 === 0 ? 0 : 1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'k'; 
    }
    return num
}


export default FormatNumber