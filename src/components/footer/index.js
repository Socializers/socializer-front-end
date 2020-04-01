/* eslint-disable no-unused-vars */
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

import './footer.scss';

export default function Footer() {
  return(
    <footer>
      <section>
        <div>
          <h6>Socializers inc.</h6>
          <p>Email us at: <br /> socializers@socializers.com</p>
        </div>
        <div>
          <a href='#' target='_blank'><FaFacebook className='icon' /></a>
          <a href='#' target='_blank'><FaTwitter className='icon' /></a>
          <a href='#' target='_blank'><FaInstagram className='icon'/></a>
        </div>
        <div>
          <h6>Newsletter</h6>
          <p>Join our newsletter by adding your email address below</p>
          <form>
            <input /> <button>Subscribe</button>
          </form>
        </div>
      </section>
    </footer>
  );
}