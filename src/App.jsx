import { useEffect, useMemo, useState } from 'react';
import mainEvent from './assets/images/mainEvent.webp';
import dishes from './assets/images/dishes.webp';
import cake from './assets/images/cake.webp';
import songs from './assets/images/songs.webp';
import photo from './assets/images/photo.webp';
import festivity from './assets/images/festivity.webp';
import backgroundLeafsLeft from './assets/images/back_lef-left.webp';
import backgroundLeafsRight from './assets/images/back_lef-right.webp';

const scheduleItems = [
  {
    time: '14:00',
    title: 'Cóctel',
    description: 'Bienvenida y aperitivos',
    image: dishes
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
    image: cake
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
    image: festivity
  }
];

function App() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isTouchLayout, setIsTouchLayout] = useState(false);

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
                <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#e74c3c"/>
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
                  className={`schedule-item ${index % 2 === 1 ? 'schedule-item-reverse' : ''} ${
                    isActive ? 'schedule-item-active' : ''
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

          <div className="location-section">
            <a 
              href="https://pupaeventos.com/77538113-55af-474a-a8c2-ec0bc3b82610"
              target="_blank"
              rel="noopener noreferrer"
              className="location-link"
            >
              <img src={photo} alt="Photo ico" className="photo-ico"/>
              <span className="location-text">Comparti tus fotos aqui</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;