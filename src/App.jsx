import { useEffect, useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import mainEvent from './assets/images/mainEvent.webp';
import dishes from './assets/images/dishes.webp';
import cake from './assets/images/cake.webp';
import songs from './assets/images/songs.webp';
import photo from './assets/images/photo.webp';
import festivity from './assets/images/festivity.webp';
import backgroundLeafsLeft from './assets/images/back_lef-left.webp';
import backgroundLeafsRight from './assets/images/back_lef-right.webp';
import { Gift, Camera } from "lucide-react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const scheduleItems = [
  {
    time: '14:00',
    title: 'Cóctel',
    description: 'Bienvenida y aperitivos',
    image: festivity
  },
  {
    time: '14:30',
    title: 'Ceremonia',
    description: 'Ceremonia civil y simbólica',
    image: mainEvent
  },
  {
    time: '15:30',
    title: 'Recepción',
    description: 'Bienvenida, y encuentro con los novios',
    image: photo
  },
  {
    time: '16:30',
    title: 'Almuerzo',
    description: 'Menú especial de celebración',
    image: dishes
  },
  {
    time: '18:00',
    title: 'Fiesta',
    description: 'Música, baile y mucha fiesta',
    image: songs
  },
  {
    time: '22:00',
    title: 'Fin de fiesta',
    description: 'Despedida y agradecimientos',
    image: cake
  }
];

function App() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isTouchLayout, setIsTouchLayout] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsTouchLayout(width <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isTouchLayout) {
      setActiveIndex(-1);
    }

    return undefined;
  }, [isTouchLayout]);

  const leftAlignedTitles = useMemo(() => ['Cóctel', 'Recepción', 'Fiesta'], []);

  return (
    <main className="page-wrapper">
      <section className="schedule-container">
        <div className="schedule-background-left">
          <img src={backgroundLeafsLeft} alt="" className="leafs-left-image" />
        </div>
        <div className="schedule-background-right">
          <img src={backgroundLeafsRight} alt="" className="leafs-right-image" />
        </div>

        <div className="schedule-section">
          <div className='title-wedding-container'>
            <h1 className="title-wedding title-section">Programa del día</h1>
          </div>
          <div className="location-section">
            <a
              href="https://www.google.com/maps/place/Casona+de+Campo/@-26.7508433,-65.2168961,16.77z/data=!4m6!3m5!1s0x94226756b4c3061d:0xbd18ab7784f8cbb8!8m2!3d-26.7501106!4d-65.2077026!16s%2Fg%2F11sr27mkxs?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="location-link"
            >
              <svg className="location-pin" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#e74c3c" />
              </svg>
              <span className="location-text">Casona de Campo</span>
            </a>
          </div>

          <div className="schedule-list-wrapper">
            {scheduleItems.map((item, index) => {
              const isLeftText = leftAlignedTitles.includes(item.title);
              const isActive = activeIndex === index;

              return (
                <article
                  key={item.title}
                  className={`schedule-item ${index % 2 === 1 ? 'schedule-item-reverse' : ''} ${isActive ? 'schedule-item-active' : ''
                    }`}
                  onMouseEnter={() => {
                    if (!isTouchLayout) {
                      setActiveIndex(index);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isTouchLayout) {
                      setActiveIndex(-1);
                    }
                  }}
                  onClick={() => {
                    if (isTouchLayout) {
                      setActiveIndex((currentIndex) => (currentIndex === index ? -1 : index));
                    }
                  }}
                >
                  <div className="time-cell">
                    <span className={`item-time ${isActive ? 'time-visible' : ''}`}>{item.time}</span>
                  </div>

                  <div className="line-cell" aria-hidden="true">
                    <div className="line-dot" />
                    {index < scheduleItems.length - 1 && <div className="line-segment" />}
                  </div>

                  <div className={`content-cell ${isLeftText ? 'text-left' : 'text-right'}`}>
                    <div className="schedule-image">
                      <img src={item.image} alt={item.title} className="schedule-img" />
                    </div>
                    <div className="item-copy">
                      <h2 className="schedule-title">{item.title}</h2>
                      <p className="schedule-description">{item.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>


          <div className="section-divider">
            <span className="line"></span>
            <span className="heart">♡</span>
            <span className="line"></span>
          </div>
          <div className="wedding-section">
            <div className="cards-container">

              {/* REGALOS */}
              <div className="card">
                <div className="card-icon"><i className="fa-solid fa-gift" aria-hidden="true"></i></div>

                <div className="card-content">
                  <h3 className="card-title">Regalos</h3>
                  <p className="card-text">
                    Tu presencia ya es el mejor regalo 💛<br />
                    Pero si querés sumar algo más, te contamos cómo hacerlo.
                  </p>

                  <Dialog.Root open={showGiftModal} onOpenChange={setShowGiftModal}>
                    <Dialog.Trigger asChild>
                      <button className="card-button btn-gift">Más información</button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="gift-modal-overlay" />
                      <Dialog.Content className="gift-modal-content">
                        <Dialog.Close className="gift-modal-close" aria-label="Cerrar">×</Dialog.Close>
                        <div className="gift-modal-icon">
                          <i className="fas fa-gift" aria-hidden="true"></i>
                        </div>
                        <Dialog.Title className="gift-modal-title">¡Gracias por ayudarnos!</Dialog.Title>
                        <p className="gift-modal-description">
                          Tu presencia es nuestro mejor regalo. Si querés hacernos un obsequio,
                          aquí están nuestros datos:
                        </p>
                        <div className="gift-info">
                          <div className="gift-option">
                            <h4 className="gift-option-title">Transferencia Bancaria</h4>
                            <div className="gift-option-details">
                              <div className="copy-row">
                                <span><strong>CVU:</strong> 0000003100056920810313</span>
                                <button
                                  onClick={() => copyToClipboard('0000003100056920810313', 'cvu')}
                                  className={`copy-button${copiedField === 'cvu' ? ' copied' : ''}`}
                                  title={copiedField === 'cvu' ? '¡Copiado!' : 'Copiar CVU'}
                                >
                                  <i className={copiedField === 'cvu' ? 'fas fa-check' : 'fas fa-copy'} aria-hidden="true"></i>
                                </button>
                              </div>
                              <div className="copy-row">
                                <span><strong>Alias:</strong> ale.cande.2026</span>
                                <button
                                  onClick={() => copyToClipboard('ale.cande.2026', 'alias')}
                                  className={`copy-button${copiedField === 'alias' ? ' copied' : ''}`}
                                  title={copiedField === 'alias' ? '¡Copiado!' : 'Copiar Alias'}
                                >
                                  <i className={copiedField === 'alias' ? 'fas fa-check' : 'fas fa-copy'} aria-hidden="true"></i>
                                </button>
                              </div>
                              <div className="copy-row">
                                <span><strong>Titular:</strong> Alejandro Adrian Vexler</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="gift-modal-buttons">
                          <Dialog.Close className="gift-modal-button primary">
                            <i className="fas fa-heart" aria-hidden="true"></i>
                            ¡Perfecto!
                          </Dialog.Close>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
              </div>

              {/* FOTOS */}
              <div className="card card-photos">
                <div className="card-icon"><i class="fa-solid fa-camera" aria-hidden="true"></i></div>

                <div className="card-content">
                  <h3 className="card-title">Fotos de la boda</h3>
                  <p className="card-text">
                    Queremos ver este día desde tus ojos
                  </p>

                  <a
                    href="https://pupaeventos.com/a372705c-1e63-4166-8fdc-fba1037759da"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-button btn-photos"
                  >
                    Subir fotos
                  </a>
                </div>
              </div>

            </div>
          </div>
          <p className="closing-text">
            Gracias por ser parte de este día tan especial <br /> Alejandro & Candelaria
            <span className="heart">♡</span>
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;