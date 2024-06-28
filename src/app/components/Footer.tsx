import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>Sobre Nós</h2>
          <p>
            Somos uma loja de e-commerce dedicada a fornecer os melhores produtos e serviços aos nossos clientes.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Links Úteis</h2>
          <ul>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/contato">Contato</a></li>
            <li><a href="/politica-de-privacidade">Política de Privacidade</a></li>
            <li><a href="/termos-de-uso">Termos de Uso</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Redes Sociais</h2>
          <ul className="social-links">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} E-commerce. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
