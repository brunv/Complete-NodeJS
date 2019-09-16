/**
 * This is just an example for learning tests with Jest.
 */

const calculateTip = (total, tipPercent) => {
    const tip = total * tipPercent;
    return total + tip;
};

module.exports = {
    calculateTip
};