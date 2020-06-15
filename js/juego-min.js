(() => {
  let e = [];
  const t = ['C', 'H', 'D', 'S'],
    a = ['A', 'J', 'Q', 'K'];
  let n = 0,
    r = 0;
  const s = document.querySelector('#btnPedir'),
    o = document.querySelector('#btnDetener'),
    c = document.querySelector('#btnNuevo'),
    d = document.querySelector('#jugador-cartas'),
    l = document.querySelector('#computadora-cartas'),
    i = document.querySelectorAll('small'),
    u = () => {
      for (let a = 2; a <= 10; a++) for (let n of t) e.push(a + n);
      for (let n of t) for (let t of a) e.push(t + n);
      return _.shuffle(e);
    };
  u();
  const m = () => {
      if (0 === e.length) throw 'No hay cartas en el deck';
      return e.pop();
    },
    p = (e) => {
      const t = e.substring(0, e.length - 1);
      return isNaN(t) ? ('A' === t ? 11 : 10) : 1 * t;
    },
    b = (e) => {
      do {
        const t = m();
        (r += p(t)), (i[1].innerText = r);
        const a = document.createElement('img');
        if (
          ((a.src = `assets/cartas/${t}.png`),
          a.classList.add('carta'),
          l.append(a),
          e > 21)
        )
          break;
      } while (r < e && e <= 21);
      setTimeout(() => {
        r === e
          ? alert('Nadie gana, EMPATE! :(')
          : e > 22
          ? alert('La computadora gana, te pasaste de 21')
          : r > 21
          ? alert('Tú ganas :)')
          : alert('La computadora gana');
      }, 10);
    };
  s.addEventListener('click', () => {
    const e = m();
    (n += p(e)), (i[0].innerText = n);
    const t = document.createElement('img');
    (t.src = `assets/cartas/${e}.png`),
      t.classList.add('carta'),
      d.append(t),
      n > 21
        ? (console.warn('Lo siento mucho, perdiste'),
          (s.disabled = !0),
          (o.disabled = !0),
          b(n))
        : 21 === n &&
          (console.warn('21, genial!'),
          (s.disabled = !0),
          (o.disabled = !0),
          b(n));
  }),
    o.addEventListener('click', () => {
      (s.disabled = !0), (o.disabled = !0), b(n);
    }),
    c.addEventListener('click', () => {
      console.clear(),
        (e = []),
        (e = u()),
        (n = 0),
        (r = 0),
        (i[0].innerText = 0),
        (i[1].innerText = 0),
        (l.innerHTML = ''),
        (d.innerHTML = ''),
        (s.disabled = !1),
        (o.disabled = !1);
    });
})();
