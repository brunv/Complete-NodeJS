/**
 * This is just an example for learning tests with Jest.
 */

const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent);

module.exports = {
    calculateTip
};