import React from 'react';
import { Link } from 'react-router-dom';
import footer from '../../assets/images/footer.png';

const Footer = () => {
    return (
        <footer style={{
            background:`url(${footer})`,
            backgroundSize:"cover",
            backgroundPosition:"center"
        }} className="footer md:place-items-center lg:place-items-center p-10 text-base-content">
            <div>
                <span className="footer-title">Services</span>
               <Link to='/' className="link link-hover">Emergency Checkup</Link>
               <Link to='/' className="link link-hover">Monthly Checkup</Link>
               <Link to='/' className="link link-hover">Weekly Checkup</Link>
               <Link to='/' className="link link-hover">Deep Checkup</Link>
            </div>
            <div>
                <span className="footer-title">ORAL HEALTH</span>
               <Link to='/' className="link link-hover">Fluoride Treatment</Link>
               <Link to='/' className="link link-hover">Cavity Filling</Link>
               <Link to='/' className="link link-hover">Teath Whitening</Link>
            </div>
            <div>
                <span className="footer-title">OUR ADDRESS</span>
               <p>New York - 101010 Hudson</p>
            </div>
        </footer>
    );
};

export default Footer;