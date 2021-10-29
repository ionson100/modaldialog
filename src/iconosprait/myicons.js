import Icons  from "./icons2.svg"


import PropTypes from 'prop-types';

const Icon = ({ name, color, size }) => (
    <svg  fill={color} width={size} height={size}>
        <use xlinkHref={`${Icons}#icon-${name}`} />
    </svg>
);

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number
};

export default Icon;
