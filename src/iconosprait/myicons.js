import Icons  from "./icons2.svg"


import PropTypes from 'prop-types';
/* eslint-disable */
const Icon = ({ name }) => (
    <use xlinkHref={`${Icons}#icon-${name}`} />
);

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number
};
/* eslint-enable */
export default Icon;
