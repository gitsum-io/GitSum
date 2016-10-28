import React from 'react'
import styles from './styles.css'

const CoverImage = React.createClass({
  propTypes: {
    src: React.PropTypes.string,
    alt: React.PropTypes.string,
    className: React.PropTypes.string
  },
  render() {
    const backgroundStyle = {
      backgroundImage: `url(${this.props.src})`
    }
    const className = `${this.props.className} ${styles.coverImage}`
    return (
      <div className={className} style={backgroundStyle}>
        <img className={styles.image} src={this.props.src} alt={this.props.alt} />
      </div>
    )
  }
})

export default CoverImage
