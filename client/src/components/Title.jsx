import PropTypes from 'prop-types'

const Title = ({text1, text2}) => {
  return (
    <div className="flex items-center mb-4 group">
      <div className="mr-3">
        <h2 className="text-white font-light">
          {text1} <span className="text-sky-500 font-semibold transition-colors group-hover:text-sky-400">{text2}</span>
        </h2>
      </div>
      <div className="flex-grow h-px bg-gradient-to-r from-gray-300 to-transparent max-w-24 transition-all group-hover:max-w-32 group-hover:from-blue-400"></div>
    </div>
  )
}

Title.propTypes = {
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
}

export default Title