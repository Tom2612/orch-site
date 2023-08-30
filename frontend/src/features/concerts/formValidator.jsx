
const runValidation = (concert) => {
    let emptyFields = [];

    if (!concert.date) {
      emptyFields.push('date');
    }
    if (!concert.location) {
      emptyFields.push('location');
    }
    if (concert.pieces.length === 0) {
      emptyFields.push('pieces');
    }
    if (concert.instruments.length === 0) {
      emptyFields.push('instruments');
    }
    return emptyFields;
}

export default runValidation;