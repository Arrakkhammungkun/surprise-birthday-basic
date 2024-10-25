import { useState } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';

import './StackCard.css';

const cards = [
    './img5.jpg',
    './img6.jpg',
    './img4.jpg',
    './img3.jpg',
    './img1.jpg',
    './img2.jpg'
];

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 30,
  delay: i * 100,
});

const trans = (r, s) => `rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

export default function StackCard() {
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
  }));

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);
      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone
          ? (200 + window.innerWidth) * dir
          : down
          ? mx
          : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 600);
    }
  );

  return (
    <>
        <div className="stack-wrapper">
        {props.map(({ x, y, rot, scale }, i) => (
            <animated.div className='stack' key={i} style={{ x, y }}>
            <animated.div
                {...bind(i)}
                style={{
                transform: interpolate([rot, scale], trans),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '300px',
                height: '300px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                }}
            >
                <img
                src={cards[i]}
                alt={`card-${i}`}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px',
                }}
                />
            </animated.div>
            </animated.div>
        ))}
        </div>
    </>
  );
}
