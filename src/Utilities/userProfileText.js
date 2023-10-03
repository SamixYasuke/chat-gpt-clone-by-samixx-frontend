const userProfileText = (text) =>{
    const word = text;
    const firstTwoLettersUpperCase = word.slice(0, 2).toUpperCase();
    return firstTwoLettersUpperCase;
}

export default userProfileText;