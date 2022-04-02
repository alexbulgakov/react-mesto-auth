import React from 'react';
const date = new Date();

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <p className="footer__author">&#169; {date.getFullYear()} Алексей Булгаков</p>
            </footer>
        );
    }
}

export default Footer;