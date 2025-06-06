import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>@thapa technical 2025</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#646cff',
    color: '#fff',
    textAlign: 'center',
    padding: '3rem',
    position: 'bottom',
    bottom: 0,
    width: '100%',
  },
  text: {
    margin: 0,
    fontSize: '1.5rem',
  },
};

export default Footer;
